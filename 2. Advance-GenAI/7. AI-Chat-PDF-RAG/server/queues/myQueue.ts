import { Queue } from "bullmq";

export const queue = new Queue("PDF-PROCESSING", {
    connection: {
        host: "localhost",
        port: 6379,
    }
});

export async function addJob(name: string, data: any) {
    await queue.add(name, data);
}