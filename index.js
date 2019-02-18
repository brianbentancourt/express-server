const express = require('express')
const app = express()
const expressJSX = require('./src/express-jsx')

const puerto = process.env.PORT || 8000

const dev = { 
    name: "Brian",
    lastName: "Bentancourt",
    gitHub: "https://github.com/brianbentancourt"
}

app.engine("jsx",expressJSX)
app.set('views', './src/views')
app.set('view engine', 'jsx')

app.get('/dev',(req, res, next)=>{
    res.send(dev)
})

app.get('/',(req, res, next)=>{
    res.render('index', 
        {
            hello: 'hola',
            world: 'mundo'
        })
})

const server = app.listen(puerto, ()=>{
    console.log(`Puerto ejecutando en puerto: ${server.address().port}`)
})