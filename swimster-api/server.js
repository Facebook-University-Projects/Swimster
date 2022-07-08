const app = require("./app")
const { PORT } =  require('./config')

require('dotenv').config()

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`)
})
