import rateLimit from "express-rate-limit";

export const generateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 45, // 20 URL creations per 15 mins per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many URL generation requests. Please try again later.",
    },
});

export const analyticsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 180,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many analytics requests. Please try again later.",
    },
});
