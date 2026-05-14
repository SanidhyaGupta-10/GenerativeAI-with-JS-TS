import app from "./app";
import { ConnectDB } from "./db/connection";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    await ConnectDB();
});