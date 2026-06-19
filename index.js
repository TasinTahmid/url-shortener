import express from "express";
import userRouter from "./routes/user.routes"

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running..");

});

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log("Listening on port 8000.")
});