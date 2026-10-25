import { interaction } from "../index.js";

const getAnswer = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Error occured : ",
        error,
      });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-2.5-flash",
      input: prompt,
    });

    return res.status(200).json({
      success: true,
      answer: interaction.output_text,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured : ",
      error,
    });
  }
};
