const express = require('express')
const router = express.Router()
const ProductService = require('../../services/products')

const productService = new ProductService()

router.get('/', async (req, res, next) => {
    try {
        const { tags } = req.query
        const products = await productService.getProducts({ tags })
        res.render("products", { products })
    } catch (err) {
        next(err)
    }
})

module.exports = router