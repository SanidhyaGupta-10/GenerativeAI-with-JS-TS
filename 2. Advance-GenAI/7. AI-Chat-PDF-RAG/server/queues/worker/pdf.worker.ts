import { Worker } from 'bullmq';

const connection = {
    host: "localhost",
    port: 6379,
};

const worker = new Worker('PDF-PROCESSING', async (job) => {
    // job.data is already parsed as an object if you passed an object to queue.add
    const data = job.data;
    console.log(`Job: ${JSON.stringify(data)}`);
}, { 
    concurrency: 10, 
    connection,
    // removeOnComplete: { count: 100 },
    // removeOnFail: { count: 1000 }
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} has failed with error: ${err.message}`);
});

console.log("PDF Worker is running and waiting for jobs...");


