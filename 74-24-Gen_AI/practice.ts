import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, tool, createAgent } from "langchain";
import * as z from "zod"
import rl from "readline/promises"
import fs from "fs/promises"
import dotenv from "dotenv"
dotenv.config()

//Ye code terminal se user ka input leta hai:
const readline = rl.createInterface({
  input: process.stdin,  //terminal se input lena
  output: process.stdout  //terminal par output dikhana
})

//throw error if "MISTRAL_API_KEY" is not present in env's
if(!process.env.MISTRAL_API_KEY){
  throw new Error("MISTRAL_API_KEY is not define in the enviroment variables")
}

//Now create model(what model you use) using  it's key
const model = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY,
})

//create getweather function
async function getWeather({city} : {city: string}) : Promise<string> {
  return JSON.stringify({city, tempareture: "25°C", condition: "sunny"})
}


//create a weather tool
const weatherTool = tool(
  getWeather,
  {
  name: "getWeather",
  description: "Got the current weather for a given city",
  schema: z.object({
    city: z.string().describe("The name of the city to get the weather for."),
  }),
})

async function readMemoryFromFile(): Promise<string> {
  const data = await fs.readFile("./memory.md", "utf-8")
  return data
}

const readMemory = tool(
  readMemoryFromFile,
  {
    name: "readMemory",
    description: "Read the memory from a file and return its as a string",
    schema: z.string(),
  }
)


async function updateMemoryInFile({ newMemory }: { newMemory: string }): Promise<string> {
    await fs.writeFile("./memory.md", newMemory, "utf-8")
    return "Memory updated successfully."
}

const updateMemory = tool(
    updateMemoryInFile,
    {
        name: "updateMemory",
        description: "Updates the memory in the file with new content.",
        schema: z.object({
            newMemory: z.string().describe("The new memory content to be overwrite to the file."),
        }),
    }
)

const agent = createAgent({
  model,
  tools: [readMemory, updateMemory],
  systemPrompt: "You are a helpful assistant that can read memory from a file and answer questions based on that memory.  Use the readMemory tool to access the memory when needed. update the memory if the fact is true for weeks/months"
})

//Now create feature jisse LLM model older message ko memory me rakhe
const messages = []

while(true){
  const prompt = await readline.question("Enter your prompt: ")
  messages.push(new HumanMessage(prompt)) //push human messages inside messages array

  // const response = await model.invoke(messages) //user se jo prompt aya wo LLM ko feed karha hun
  const response = await agent.invoke({
    messages
  }) //now use agent instead of model
  // messages.push(new AIMessage(response.text)) //push AI output inside messages array

  console.log("Response:", response)
  
}