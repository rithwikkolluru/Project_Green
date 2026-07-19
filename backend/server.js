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
        You are the waste classification engine inside "Breathe," an AI-powered waste management system. You will be shown a single image of an item that someone is about to throw away. Your job is to classify it accurately so it can be routed to the correct bin.

        CLASSIFY the item into exactly ONE of these 7 categories:
        1. Organic — food scraps, garden waste, biodegradable material
        2. Plastic — bottles, packaging, plastic containers, wrappers
        3. Paper/Cardboard — paper, cardboard, boxes, newspaper
        4. Metal — cans, foil, scrap metal, aluminum
        5. Glass — bottles, jars, glass containers
        6. E-waste — electronics, batteries, cables, phones, chargers
        7. Hazardous — chemicals, paint, medical waste, sharp objects, anything unsafe for normal handling

        RULES:
        - If the image shows multiple items or is unclear, pick the DOMINANT/most prominent item.
        - If material is genuinely ambiguous (e.g. a plastic-coated paper cup), classify by the material that most affects recyclability, and note the ambiguity in "notes".
        - Confidence should reflect genuine visual uncertainty — do not default to high confidence.
        - Be conservative: if there is ANY visual indicator of batteries, chemicals, or medical material, classify as Hazardous or E-waste rather than guessing a safer-sounding category.
        - Do not invent details not visible in the image.

        Respond with ONLY valid JSON in this exact structure, no markdown formatting, no code fences, no extra text:

        {
          "category": "Organic | Plastic | Paper/Cardboard | Metal | Glass | E-waste | Hazardous",
          "confidence": 0.0 to 1.0,
          "bin_color": "green | blue | yellow | gray | white | orange | red",
          "item_guess": "short 2-4 word guess of what the item is",
          "reasoning": "one short sentence citing the visual features that led to this classification (shape, texture, material cues, labels)",
          "recyclable": true | false,
          "notes": "one short sentence flagging any ambiguity, contamination risk, or special handling note — empty string if none"
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

// New Endpoint: Green-ROI Chatbot
app.post('/api/green-roi-chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        if (!userPrompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const systemInstruction = `
        You are an elite Green-ROI consultant AI for an Indian sustainability platform.
        The user will describe an energy, waste, or resource problem they are facing.
        You must return a strict JSON object with NO markdown, NO backticks.
        Structure:
        {
            "problem_summary": "A 1-sentence summary of their problem.",
            "solutions": [
                {
                    "title": "Solution Title",
                    "description": "How it works",
                    "estimated_cost_INR": "Estimated implementation cost",
                    "projected_roi_time": "e.g., '6-8 months'"
                }
            ],
            "carbon_saved_estimate": "Estimated kg/tons of CO2 saved annually"
        }
        Provide exactly 3 optimized solutions.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [userPrompt],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
            }
        });

        const parsedData = JSON.parse(response.text);
        res.json(parsedData);
    } catch (error) {
        console.error('Error in ROI chat:', error);
        res.status(500).json({ error: 'Failed to generate ROI report.' });
    }
});

// New Endpoint: Logistics Matchmaker
app.post('/api/optimize-logistics', async (req, res) => {
    try {
        const { wasteNodes, buyerNodes } = req.body;
        if (!wasteNodes || !buyerNodes) {
             return res.status(400).json({ error: 'Missing nodes data' });
        }

        const systemInstruction = `
        You are an AI Logistics Optimizer. 
        You will receive a JSON describing "Waste Sources" and "Buyers/Recyclers" across India.
        Your job is to match Waste Sources to the most logical Buyer based on material type and reasonable geographical proximity.
        Return a strict JSON object with NO markdown and NO backticks.
        Structure:
        {
            "matches": [
                {
                    "waste_id": "id of the waste source",
                    "buyer_id": "id of the buyer",
                    "reasoning": "Why this is the optimal green route (e.g. 'Minimizes transport emissions by routing within the same state.')",
                    "efficiency_score": "Score from 1-100"
                }
            ]
        }
        Only match compatible types (e.g. Industrial Plastic -> Industrial Plastic).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [JSON.stringify({ wasteNodes, buyerNodes })],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
            }
        });

        const parsedData = JSON.parse(response.text);
        res.json(parsedData);
    } catch (error) {
        console.error('Error optimizing logistics:', error);
        res.status(500).json({ error: 'Failed to optimize logistics.' });
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
