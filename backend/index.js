import express from "express";
import path from "node:path";
import bodyParser from "body-parser";
import userRouter from "./src/routers/user.router.js";
import orderRouter from "./src/routers/order.router.js";
import cors from "cors";

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors("*"));

//serve static assets
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

try {
  app.listen(PORT, () => {
    console.log(`Ipex Dashboard server is running on port: ${PORT}`);
  });
} catch (error) {
  console.log("Error connecting to server.", error);
}

app.get("/test", (req, res) => {
  res.send("test route.");
});

//user routes
app.use("/api/user", userRouter);

//order routes
app.use("/api/order", orderRouter);
