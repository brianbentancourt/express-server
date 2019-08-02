const express = require('express')
const router = express.Router()
const ProductService = require('../../services/products')
const validation = require('../../utils/middlewares/validationHandler')
const { productIdSchema, 
        productTagSchema, 
        createProductSchema, 
        updateProductSchema
    } = require('../../utils/schemas/products')

const productService = new ProductService()

router.get('/' , async (req, res, next) => {
    const { tags } = req.query
    try {
        //throw new Error(' this is an error from API')
        const products = await productService.getProducts({ tags })

        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch (err) {
        next(err)
    }

})

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params
    try {
        const products = await productService.getProduct({ productId })
        res.status(200).json({
            data: products,
            message: 'product retrived'
        })
    } catch (err) {
        next(err)
    }
})

router.post('/', validation(createProductSchema), async (req, res, next) => {
    const { body: product } = req
    try {
        const prod = await productService.createProduct({ product })

        res.status(201).json({
            data: prod,
            message: 'products listed'
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:productId', validation({ productId: productIdSchema }, "params"), validation(updateProductSchema), async (req, res, next) => {
    const { productId } = req.params
    const { body: product } = req
    try {
        const prod = await productService.updateProduct({ productId, product })
        res.status(200).json({
            data: prod,
            message: 'product updated'
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const prod = await productService.deleteProduct({ productId })
        res.status(200).json({
            data: prod,
            message: 'products deleted'
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router