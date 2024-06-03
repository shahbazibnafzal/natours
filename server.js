const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')

const PORT = process.env.PORT || 8000
// Start the server
app.listen(PORT, (req, res) => {
  console.log('Listening on ' + PORT)
})
