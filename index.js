const express = require('express')
const path = require('path')
const app = express()
const productsRouter = require('./routes/products')

const puerto = process.env.PORT || 8000

const dev = { 
    name: "Brian",
    lastName: "Bentancourt",
    gitHub: "https://github.com/brianbentancourt"
}

app.use("/static", express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/products', productsRouter)

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