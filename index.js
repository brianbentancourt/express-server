const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const { logErrors, clientErrorHandler, errornHandler } = require('./utils/middlewares/errorsHndlers')

// app
const app = express()

// middlewares
app.use(bodyParser.json())

// port
const puerto = process.env.PORT || 8000


// static files
app.use("/static", express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
app.use('/products', productsRouter)
app.use("/api/products", productsApiRouter)

// redirect
app.get('/',(req, res, next)=>{
    res.redirect('/products')
})

// error handlers
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errornHandler)

// server 
const server = app.listen(puerto, ()=>{
    console.log(`Puerto ejecutando en puerto: ${server.address().port}`)
})