const Redis = require("ioredis")

const cacheInstance = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
})

module.exports = cacheInstance