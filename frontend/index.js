import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: ".env" });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Frontend server running on ${process.env.FRONTEND_BASE_URL}`);
});
