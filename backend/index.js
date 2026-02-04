import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connect-db.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
            console.log(`Backend server running at ${process.env.BASE_URL}`);
        });
    })
    .catch((error) => {
        console.log("Could not start server", error);
    });
