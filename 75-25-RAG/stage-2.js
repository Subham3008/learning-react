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