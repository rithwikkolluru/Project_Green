# 🌬️ BREATHE - AI for a Greener Planet

> **Technology that helps the planet breathe.** 
> BREATHE is the AI operating system for waste — sensing, sorting, and circulating resources so cities and industries can grow greener, not smaller.

![BREATHE Dashboard Preview](https://via.placeholder.com/1200x600/06120F/34F5A8?text=BREATHE+City+Command+Center)

## 📖 Overview

We can't manage what we can't see. BREATHE solves the global waste crisis by attacking three core problems: invisibility, manual sorting inefficiencies, and logistical waste. 

Instead of fragmented solutions, BREATHE introduces a cohesive **3-Layer AI Stack**:
1. **SENSE (Edge IoT)**: Smart sensors and on-device computer vision classify waste at the point of disposal.
2. **SORT (Robotics AI)**: Facility-level pipelines use AI to boost material purity from ~75% to 92-96%, identifying hazards before they cause damage.
3. **CIRCULATE (Logistics & Marketplace)**: VRP route optimization saves collection fuel, while an AI-powered marketplace matches recovered materials (like PET flakes) with industrial buyers, turning a landfill expense into an ESG-compliant revenue stream.

---

## ✨ Key Features

- 📸 **Live AI Vision Demo**: Upload an image of waste to instantly classify its material, recyclability, and destination bin using advanced generative AI.
- 📊 **City Command Dashboard**: Real-time analytics tracking Landfill Diversion Rates, CO₂e Avoided, and Estimated Economic Value Recovered (in INR).
- 🔄 **Circular Marketplace Feed**: A live ticker matching industrial scrap suppliers with verified buyers.
- 🚦 **Contamination Early-Warning**: Data-driven flagging of high-risk waste batches to prevent facility fires and batch rejection.

---

## 🛠️ Architecture & Tech Stack

BREATHE is built on a modern, decoupled architecture designed for scale and rapid deployment.

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS with a custom "Climate-tech Control Room" design system (CSS Variables, Glassmorphism)
- **Data Visualization**: Recharts
- **Icons**: Lucide React

### Backend (`/backend`)
- **Runtime**: Node.js + Express
- **AI Integration**: Google Gemini 2.5 Flash Multimodal API (`@google/genai`)
- **File Handling**: Multer (Memory Storage)
- **Security**: CORS, dotenv

---

## 🚀 Setup & Local Development

This project uses a monorepo structure. You will need two terminal windows to run the frontend and backend simultaneously.

### 1. Clone the Repository
```bash
git clone https://github.com/rithwikkolluru/Project_Green.git
cd Project_Green
```

### 2. Setup the Backend (AI Engine)
```bash
cd backend
npm install
```
Create a `.env` file in the `/backend` directory and add your Gemini API Key:
```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
```
Start the backend server:
```bash
npm start
```
*The backend will run on `http://localhost:5000`*

### 3. Setup the Frontend (Web App)
In a new terminal window:
```bash
cd frontend
npm install
```
*(Optional)* Create a `.env` file in the `/frontend` directory to point to your backend (it defaults to localhost:5000 if omitted):
```env
VITE_API_URL=http://localhost:5000
```
Start the Vite development server:
```bash
npm run dev
```
*The frontend will run on `http://localhost:5173`*

---

## ☁️ Deployment

### Frontend (Vercel)
1. Import the repository into Vercel.
2. Under **Root Directory**, click "Edit" and select `frontend`.
3. Vercel will automatically detect the Vite framework.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.
5. Click **Deploy**.
*(Note: A `vercel.json` is already included to support React Router SPA behavior).*

### Backend (Render / Railway)
1. Connect the repository to your hosting provider.
2. Set the **Root Directory** to `backend`.
3. Set the build command to `npm install` and the start command to `node server.js`.
4. Add your `GEMINI_API_KEY` to the environment variables.

---

## 🤝 Hackathon Context

This project was built for a 2026 AI Hackathon focusing on sustainable technology and economic growth. All data displayed in the dashboard is illustrative for demonstration purposes to represent the economic and environmental spread of the Circular Marketplace. 

*"Every ton diverted from landfill is a ton of value recovered — not a cost absorbed. Breathe turns sustainability from a budget line into a revenue line."*
