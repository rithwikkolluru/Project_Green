require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Allow CORS for Vercel deployment (we can restrict this to the specific vercel URL later)
app.use(cors({ origin: '*' }));
app.use(express.json());

// Configure Multer for memory storage (we don't need to save files to disk for this proxy)
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini Client
// Requires GEMINI_API_KEY in environment variables
const ai = new GoogleGenAI({});

// Helper function to convert multer file to Gemini format
function fileToGenerativePart(file) {
  return {
    inlineData: {
      data: file.buffer.toString("base64"),
      mimeType: file.mimetype
    },
  };
}

// Health check endpoint (good for Render deployment)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Main AI endpoint
app.post('/api/analyze-resource', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const imagePart = fileToGenerativePart(req.file);
        const userPrompt = req.body.prompt || "Analyze this waste/scrap material.";

        const systemInstruction = `
        You are an expert AI Resource Appraiser and Environmental Economist for a green-tech platform in India.
        Your task is to analyze images of waste, scrap, or industrial byproducts.
        You must return ONLY a strict JSON object with no markdown formatting, no backticks, and no extra text.
        
        The JSON object must have EXACTLY the following structure:
        {
          "material_type": "Brief description of the material identified",
          "estimated_market_value_INR": "Estimated scrap/recycling value in INR (e.g., '₹15 - ₹20 per kg'). Provide a realistic estimate.",
          "environmental_impact_score": "A score from 1 to 10 (10 being most positive impact if recycled).",
          "buyer_industry_match": "The specific industry or sector that would buy this as raw material (e.g., 'Paper Mills', 'Construction', 'Plastic Manufacturing')",
          "roi_summary": "A 1-2 sentence summary of why recycling this makes economic sense."
        }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                imagePart,
                userPrompt
            ],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
            }
        });

        // The response text should be the JSON string due to our prompt and responseMimeType
        let responseData = response.text;
        
        // Safety check to parse the JSON and ensure it's valid before sending to frontend
        try {
            const parsedData = JSON.parse(responseData);
            res.json(parsedData);
        } catch (parseError) {
             console.error("Failed to parse Gemini response:", responseData);
             res.status(500).json({ error: 'AI returned invalid JSON format.' });
        }

    } catch (error) {
        console.error('Error analyzing resource:', error);
        res.status(500).json({ error: 'Failed to analyze the resource. Please try again.' });
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
