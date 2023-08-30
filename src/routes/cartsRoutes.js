import { Router } from "express";

import CartManager from '../CartManager.js'
const cartManager = new CartManager('./src/carts.json')

const cartRouter = Router()

cartRouter.post('/',async (req,res) => {
    const result = await cartManager.addCart()
    res.status(result.status).send(result.payload)
})

cartRouter.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid,10)
    const cartById = await cartManager.getCartById(cid)
    res.status(cartById.status).send(cartById.payload)
})

cartRouter.post('/:cid/product/:pid',async (req,res) => {
    const cart = parseInt(req.params.cid,10)
    const product = parseInt(req.params.pid,10)
    const result = await cartManager.addProducts(cart,product,1)
    res.status(result.status).send(result.payload)
})

export default cartRouter