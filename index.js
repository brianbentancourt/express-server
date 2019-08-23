const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const debug = require("debug")("app:server")
const helmet = require("helmet")

const productsRouter = require("./routes/views/products")
const productsApiRouter = require("./routes/api/products")
const authApiRouter = require("./routes/api/auth")

const boom = require("boom")
const { logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler } = require("./utils/middlewares/errorsHandlers")
const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi")
//const slash = require("express-slash")

// app
const app = express()

// middlewares
app.use(helmet())
app.use(bodyParser.json())

// port
const puerto = process.env.PORT || 8000


// static files
app.use("/static", express.static(path.join(__dirname, "public")))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// routes
app.use("/products", productsRouter)
//app.use("/api/products", productsApiRouter)
productsApiRouter(app)
app.use("/api/auth", authApiRouter)

//express-slash
//app.use(slash())

// redirect
app.get("/", (req, res, next) => {
    res.redirect("/products")
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
    debug(`Puerto ejecutando en puerto: ${server.address().port}`)
})