import express from "express";
import {
    generateShortUrl,
    getShortUrl,
    getUrlAnalytics,
} from "../controllers/url.controller.js";
import { generateLimiter, analyticsLimiter } from "../middlewares/rate-limit.middleware.js";

const router = express.Router();

// POST
router.post("/generate", generateLimiter, generateShortUrl);

// GET
router.get("/:slug", getShortUrl);
router.get("/:slug/analytics", analyticsLimiter, getUrlAnalytics);
export default router;
