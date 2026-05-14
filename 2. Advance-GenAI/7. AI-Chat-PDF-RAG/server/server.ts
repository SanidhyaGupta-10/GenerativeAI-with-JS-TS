import app from "./src/app";
import { prisma } from "./db/connection";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is not defined");
        return;
    }
    await prisma.$connect();
    console.log('Connected to database');
});