import { Worker } from 'bullmq';

const connection = {
    host: "localhost",
    port: 6379,
};

const worker = new Worker('PDF-PROCESSING', async job => {
    console.log("Working", job);
}, { concurrency: 10, connection });


export default worker;