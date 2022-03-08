const os = require('os')
const express = require('express')
const app = express()
const root = express() 

const consign = require('consign')
const database = require('./config/db')
const port = 3000

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./config/token.js')
    .then('./config/configEmail.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.database = database
 
const contextPath = '/smart-church/api'
app.use(express.json())
root.use(contextPath, app)
root.listen(port, () => {
    console.log(`Smart Church API is listening at PORT:${port}${contextPath}`)
})


