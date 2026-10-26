import { GoogleGenAI } from "@google/genai";

const getAnswer = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Error : Prompt is Undefined",
        error,
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt,
    });

    return res.status(200).json({
      success: true,
      answer: interaction.output_text,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error occured : ${error.message}`,
    });
  }
};

export { getAnswer };
