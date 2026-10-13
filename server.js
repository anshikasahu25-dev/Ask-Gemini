import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({
                error: "Please enter a question"
            });
        }

        const response = await ai.models.generateContent({
           model: "gemini-3.6-flash",
            contents: question
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to get response from Gemini"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});