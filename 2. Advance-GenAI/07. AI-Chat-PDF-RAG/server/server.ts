import app from "./app";
import { ConnectDB } from "./db/connection";
import { config } from "dotenv";

// Load environment variables
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    await ConnectDB();
});