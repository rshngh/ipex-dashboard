import express from "express";

import { confirmOrderControllerasync } from "../controllers/order.controller.js";

const app = express();
const router = app.router;

router.post("/confirm-order", confirmOrderControllerasync);

export default router;
