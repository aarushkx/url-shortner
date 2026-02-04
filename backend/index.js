import connectDB from "./db/connect-db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
            console.log(`Backend server running on ${process.env.BASE_URL}`);
        });
    })
    .catch((error) => {
        console.log("Could not start server", error);
    });
