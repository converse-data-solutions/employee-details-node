const express = require('express')
const cors = require('cors')
const router = require('./Routes/empRouters.js')
const app = express()
const port = process.env.port || 8087

const corOption = {
  origin: 'http://localhost:8080/'
}
app.use(cors(corOption))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.listen(port, () => {
  console.log(`server is running on port is :  ${port}`)
})
