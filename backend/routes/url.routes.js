import express from "express";
import {
    generateShortUrl,
    getShortUrl,
    getUrlAnalytics,
} from "../controllers/url.controller.js";

const router = express.Router();

// POST
router.post("/generate", generateShortUrl);

// GET
router.get("/:slug", getShortUrl);
router.get("/:slug/analytics", getUrlAnalytics);

export default router;
