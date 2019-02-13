const express = require('express')
const app = express()

const puerto = process.env.PORT || 8000

const dev = { 
    name: "Brian",
    lastName: "Bentancourt",
    gitHub: "https://github.com/brianbentancourt"
}

app.get('/',(req, res, next)=>{
    res.send(dev)
})

const server = app.listen(puerto, ()=>{
    console.log(`Puerto ejecutando en puerto: ${server.address().port}`)
})