// ai.controller.js
import generateContent from "../services/ai.services.js";

export const getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await generateContent(code);
        res.send(response); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating content");
    }
};
