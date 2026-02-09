const app = require('./src/app')
const connectTODb = require('./src/config/database')

connectTODb()

app.listen(3000, () => {
  console.log('server is running on 3000 port');
})