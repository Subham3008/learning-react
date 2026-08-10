import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai"
import { Pinecone } from "@pinecone-database/pinecone"
import { HumanMessage, SystemMessage } from "langchain"
import { config } from "dotenv"
config()

const userPrompt = "Tell me about react"


//-------------Initialize MistralAIEmbeddings----------
const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY
});

const vector = await embeddings.embedQuery(userPrompt)

//----------------Pincone vector store--------------

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.Index("kodex-subham")

const response = await index.query({
  vector: vector,
  includeMetadata: true,
  topK: 4
})

// console.log(response.matches);

//---------------LLM--------------------
const mistralaSmall = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
})

const aiResponse = await mistralaSmall.invoke([
  new SystemMessage(`
    Context : ${response.matches.map(match => match.metadata.text).join("\n\n")}
    `),
  new HumanMessage(userPrompt)
])

console.log(aiResponse)

//---------------------------------------------------------------------------------

// import dotenv from "dotenv";
// dotenv.config();

// import readline from "readline/promises";

// import {
//   ChatMistralAI,
//   MistralAIEmbeddings,
// } from "@langchain/mistralai";

// import {
//   SystemMessage,
//   HumanMessage,
// } from "@langchain/core/messages";

// import { Pinecone } from "@pinecone-database/pinecone";


// // --------------------------------------------------
// // 1. Terminal Input Setup
// // --------------------------------------------------

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });


// // --------------------------------------------------
// // 2. Check Environment Variables
// // --------------------------------------------------

// if (!process.env.MISTRAL_API_KEY) {
//   throw new Error("MISTRAL_API_KEY is required");
// }

// if (!process.env.PINECONE_API_KEY) {
//   throw new Error("PINECONE_API_KEY is required");
// }


// // --------------------------------------------------
// // 3. Configure LLM
// // --------------------------------------------------

// const llm = new ChatMistralAI({
//   apiKey: process.env.MISTRAL_API_KEY,
//   model: "mistral-medium-latest",
//   temperature: 0,
// });


// // --------------------------------------------------
// // 4. Configure Embedding Model
// // --------------------------------------------------

// const embedding = new MistralAIEmbeddings({
//   model: "mistral-embed",
//   apiKey: process.env.MISTRAL_API_KEY,
// });


// // --------------------------------------------------
// // 5. Connect Pinecone
// // --------------------------------------------------

// const pc = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY,
// });


// // Select existing index
// const index = pc.index("kodexrag");


// // --------------------------------------------------
// // 6. Similarity Threshold
// // --------------------------------------------------

// // Temporary starting value.
// // Later test relevant + irrelevant questions
// // and tune this value.
// const THRESHOLD = 0.75;


// // --------------------------------------------------
// // 7. Infinite Question Loop
// // --------------------------------------------------

// while (true) {

//   const question = await rl.question("\nAsk question: ");

//   // -------------------------------
//   // Exit
//   // -------------------------------

//   if (question.toLowerCase().trim() === "exit") {
//     console.log("Bye 👋");
//     break;
//   }


//   // Optional: Ignore empty question

//   if (!question.trim()) {
//     console.log("Please enter a question.");
//     continue;
//   }


//   // --------------------------------------------------
//   // STEP 1: Convert User Question → Vector
//   // --------------------------------------------------

//   const vectorOFUserPrompt =
//     await embedding.embedQuery(question);


//   // --------------------------------------------------
//   // STEP 2: Search Vector Database
//   // --------------------------------------------------

//   const matchedResult = await index.query({
//     vector: vectorOFUserPrompt,
//     includeMetadata: true,
//     topK: 5,
//   });

//   console.log(
//   matchedResult.matches.map((item) => ({
//     score: item.score,
//     text: item.metadata.text,
//   }))
// );


//   // --------------------------------------------------
//   // STEP 3: Filter Relevant Results
//   // --------------------------------------------------

//   const filteredVectors = matchedResult.matches.filter(
//     (vector) => vector.score >= THRESHOLD
//   );

// console.log("RELEVANT CHUNKS:");

//  filteredVectors.forEach((item, index) => {
//   console.log(`\n--- CHUNK ${index + 1} ---`);
//   console.log("Score:", item.score);
//   console.log(item.metadata.text);
// });


//   // --------------------------------------------------
//   // STEP 4: No Relevant Information Found
//   // --------------------------------------------------

//   if (filteredVectors.length === 0) {

//     console.log(
//       "\nAI: I don't have relevant information about this in the provided documents."
//     );

//     continue;
//   }


//   // --------------------------------------------------
//   // STEP 5: Extract Text From Relevant Chunks
//   // --------------------------------------------------

//   const context = filteredVectors
//     .map((vector) => vector.metadata?.text)
//     .filter(Boolean)
//     .join("\n\n");


//   // --------------------------------------------------
//   // STEP 6: Create Grounded System Prompt
//   // --------------------------------------------------

//   const systemPrompt = `
// You are a helpful document question-answering assistant.

// Your job is to answer the user's question using the provided context.

// Rules:

// 1. Answer using only the provided context.

// 2. Do not use outside knowledge to invent missing facts.

// 3. If the context does not contain enough information to answer
//    the question, clearly say:
//    "I don't have enough information in the provided documents."

// 4. Keep the answer clear and concise.

// 5. Do not mention vector databases, embeddings, retrieval,
//    similarity scores, or internal RAG implementation details.

// Context:

// ${context}
// `;


//   // --------------------------------------------------
//   // STEP 7: Send Context + Question → LLM
//   // --------------------------------------------------

//   const response = await llm.invoke([
//     new SystemMessage(systemPrompt),
//     new HumanMessage(question),
//   ]);


//   // --------------------------------------------------
//   // STEP 8: Final Answer
//   // --------------------------------------------------

//   console.log("\nAI:", response.content);
// }


// // --------------------------------------------------
// // Close Terminal Interface
// // --------------------------------------------------

// rl.close();