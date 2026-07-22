import {ChatMistralAI} from "@langchain/mistralai"
import { HumanMessage, AIMessage, createAgent } from "langchain"
import rl from "readline/promises"
import dotenv from "dotenv"
dotenv.config()

/*-----Get input from User------------*/
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout  
})

// const question = await readline.question("Enter your question: ")

// console.log(`You asked: ${question}`)

// readline.close()

if(!process.env.MISTRAL_API_KEY){
  throw new Error("MISTRAL_API_KEY is not define in the enviroment variables.")
}

const model = new ChatMistralAI({
  apiKey:process.env.MISTRAL_API_KEY,
  model:"mistral-medium-latest"
})

const agent = createAgent({
  model
})

// const response = await model.invoke("Hello, how are you")
// console.log(response.text)

// const stream = await model.stream("write prime number code in JS")

// for await (const chunk of stream){
//   process.stdout.write(chunk.text)
// }

const chatHistory: (HumanMessage | AIMessage)[] = []
let responseText = ""

while(true){
  const prompt = await readline.question("Enter your question: ")

  chatHistory.push(new HumanMessage(prompt))

  const stream = await agent.stream({
    messages: chatHistory
  },
  {
    streamMode: "messages"
  }
)

  for await (const [token, metadata] of stream){
    process.stdout.write(token.text)
    responseText += token.text
  }

   chatHistory.push(new AIMessage(responseText))
   responseText = ""

  process.stdout.write("\n")
}



