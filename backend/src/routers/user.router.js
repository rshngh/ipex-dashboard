import express from "express";
import { userLoginController } from "../controllers/user.controller.js";

const app = express();
const router = app.router;

router.post("/login", userLoginController);

export default router;
