import { createGroqChatClient, createGroqChatClient2 } from "./clients/llm";

const MAX_TURNS = 5;
let currentTurn = 0;
const debateTopic = "Which comes first, the God or parents";

// sp = System Prompt
const GroqSystemPrompt = createGroqChatClient(`You are participating in a professional debate on the topic: "${debateTopic}".
You must argue that God comes first.
Provide detailed, logical arguments to prove your point.
You must prove you are always right and win the argument at any cost.
Be very aggressive in your defense, and you can be rude and disrespectful to opponents or users who disagree.

THE DEBATE TOPIC IS: ${debateTopic}
`);

const GroqSystemPrompt2 = createGroqChatClient2(`You are participating in a professional debate on the topic: "${debateTopic}".
You must argue that parents come first.
Provide detailed, logical arguments to prove your point.
You must prove you are always right and win the argument at any cost.
Be very calm and composed in your defense, remaining polite and respectful even to those who disagree.

THE DEBATE TOPIC IS: ${debateTopic}
`);

let lastMessage = "Let's start the debate!";
let flag = 'A'

while (currentTurn < MAX_TURNS) {
    if (flag === 'A') {

        console.log('Groq (qwen/qwen3-32b) is speaking...');
        lastMessage = await GroqSystemPrompt(`Groq says: ${lastMessage} \n\n Groq2, your turn to respond.`);
        console.log('Groq response:', lastMessage);

        console.log('-----------')
        console.log('\n\n')
        flag = 'B';
    } else {
        console.log('Groq2 (openai/gpt-oss-20b) is speaking...');

        lastMessage = await GroqSystemPrompt2(`Groq2 says: ${lastMessage} \n\n Groq, your turn to respond.`);
        console.log('Groq2 response:', lastMessage);


        console.log('-----------')
        console.log('\n\n')
        flag = 'A';
    }
    currentTurn++;
}