import Url from "../models/url.model.js";
import { nanoid } from "nanoid";

export const generateShortUrl = async (req, res) => {
    try {
        const { url, slug } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required",
            });
        }

        const existingUrl = await Url.findOne({ url });
        if (existingUrl) {
            return res.status(409).json({
                message: "URL already exists",
            });
        }

        const MAX_SLUG_LENGTH = 16;
        let generatedSlug;

        if (!slug) {
            generatedSlug = nanoid(7);
        } else {
            if (slug.length > MAX_SLUG_LENGTH) {
                return res.status(400).json({
                    message: `Slug cannot have more than ${MAX_SLUG_LENGTH} characters`,
                });
            }
            generatedSlug = slug;
        }

        const existingSlug = await Url.findOne({ slug: generatedSlug });
        if (existingSlug) {
            return res.status(409).json({
                message: "Slug already in use",
            });
        }

        const newUrl = await Url.create({ url, slug: generatedSlug });
        if (newUrl) {
            return res.status(201).json({
                message: "Short URL generated successfully",
                data: newUrl,
            });
        }

        return res.status(500).json({
            message: "Failed to generate short URL",
        });
    } catch (error) {
        console.log("ERROR: POST generateShortUrl", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getShortUrl = async (req, res) => {
    try {
        const { slug } = req.params;

        const urlInDb = await Url.findOneAndUpdate(
            { slug },
            { $push: { history: new Date() } },
            { new: true },
        );
        if (urlInDb) {
            // return res.status(200).redirect(urlInDb.url, 301).json({
            //     message: "Short URL fetched successfully",
            //     data: urlInDb,
            // });
            return res.redirect(urlInDb.url);
        }
        return res.status(404).json({
            message: "Short URL does not exist",
        });
    } catch (error) {
        console.log("ERROR: GET getShortUrl", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getUrlAnalytics = async (req, res) => {
    try {
        const { slug } = req.params;
        const urlInDb = await Url.findOne({ slug });

        if (urlInDb) {
            const history = urlInDb.history || [];
            const count = history.length;

            return res.status(200).json({
                message: "URL analytics fetched successfully",
                data: { count, history },
            });
        }

        return res.status(400).json({
            message: "Invalid URL",
        });
    } catch (error) {
        console.log("ERROR: GET generateShortUrl", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
