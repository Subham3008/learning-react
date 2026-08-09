import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs/promises"
import { config } from "dotenv";

config()

/**
 * config pincone using PINECONE_API_KEY
 */
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

/**
 *(fileBuffer) is ka kam ha PDF file ko disk/folder se read karke uska raw binary data memory me lana.
 */
const fileBuffer = await fs.readFile("./Interview-questions.pdf")
// console.log(fileBuffer);


const Uint8ArrayData = new Uint8Array(fileBuffer)
// console.log(Uint8ArrayData);

const parse = new PDFParse(Uint8ArrayData)

const data = await parse.getText()

//orr small small chunks ma text ko split karo
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,
  chunkOverlap: 100
})

const parts = await splitter.splitText(`${data.text}`)
// console.log(parts);


//create embadding model
const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY
});

//convert in vector
/**
 * parts ke andar jitne text chunks hain, un sabko embedding model ke paas bhejo, aur har chunk ko numbers ke vector me convert karke vectors me store karo.
 */
const vectors = await embeddings.embedDocuments(parts)
// console.log(vectors);

const vectorsData = vectors.map((vector, index) => (
  {
    text: parts[index],
    vector: vector
  }
))

// console.log(vectorsData)

const index = pc.Index("kodex-subham")

/**
 * upsert simple meaning: Vector records ko Pinecone me store karo.
 * 
 * vectorsData = [
  {
    text: "React is a library",
    vector: [0.12, 0.52, 0.76]
  },
  {
    text: "MongoDB is database",
    vector: [0.81, 0.14, 0.23]
  }
];
 */

/**
 * Pinecone does not store only the vector. A record should also have an id, and you can attach metadata such as the original chunk text. Pinecone supports storing a vector plus optional metadata in each record.
 */

const vectorsStored = await index.upsert({
  records: vectorsData.map(vex => {
    return {
      id: `${Math.random() * 10000000}`,
      metadata: {
        text: vex.text
      },
      values: vex.vector
    }
  })
})
// console.log(vectorsStored)