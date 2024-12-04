import express from "express";
import todoRoute from "./routes/todoRoute.js";

const app = express();

app.use(express.json());
app.use("/todo", todoRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000", "http://localhost:3000");
});
