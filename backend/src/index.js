import {app} from "./app.js";
import "dotenv/config";
import { userRouter } from "./routes/user.routes.js";

app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening at PORT ${process.env.PORT}`);
});