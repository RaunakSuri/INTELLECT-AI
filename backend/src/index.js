import {app} from "./app.js";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { userRouter } from "./routes/user.routes.js";

app.use("/", userRouter);

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

app.listen(process.env.PORT, () => {
  console.log(`Listening at PORT ${process.env.PORT}`);
});



export {interaction}