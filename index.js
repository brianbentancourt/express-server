const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const boom = require("boom")
const { logErrors,
        wrapErrors,
        clientErrorHandler,
        errorHandler } = require('./utils/middlewares/errorsHandlers')
const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi")

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
app.get('/', (req, res, next) => {
    res.redirect('/products')
})

app.use((req, res, next) => {
    if (isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound();

        res.status(statusCode).json(payload);
    }

    res.status(404).render("404");
})

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// server 
const server = app.listen(puerto, () => {
    console.log(`Puerto ejecutando en puerto: ${server.address().port}`)
})