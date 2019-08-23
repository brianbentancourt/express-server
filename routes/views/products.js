const express = require("express")
const router = express.Router()
const ProductService = require("../../services/products")
const { config } = require("../../config")

const cacheResponse = require("../../utils/cacheResponse")
const { FIVE_MINUTES_IN_SECONDS } = require("../../utils/time")

const productService = new ProductService()

router.get("/", async (req, res, next) => {
    try {
        //throw new Error("this is an error")
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { tags } = req.query
        const products = await productService.getProducts({ tags })
        res.render("products", { products, dev: config.dev })
    } catch (err) {
        next(err)
    }
})

module.exports = router