const express = require('express')
const router = express.Router()
const productMock = require('../../utils/mocks/products')

router.get('/', (req, res) => {
    const { query } = req.query

    res.status(200).json({
        data: productMock,
        message: 'products listed'
    })
})

router.get('/:productId', (req, res) => {
    const { productId } = req.params

    res.status(200).json({
        data: productMock[0],
        message: 'product retrived'
    })
})

router.post('/', (req, res) => {
    res.status(201).json({
        data: productMock[0],
        message: 'products listed'
    })
})

router.put('/:productId', (req, res) => {
    const { productId } = req.params

    res.status(200).json({
        data: productMock[0],
        message: 'product updated'
    })
})

router.delete('/:productId', (req, res) => {
    const { productId } = req.params
    
    res.status(200).json({
        data: productMock[0],
        message: 'product deleted'
    })
})

module.exports = router