import { httpServer } from "./src/app.js"


httpServer.listen(3000, () => {
  console.log(`Server is starting on port 3000`);
})