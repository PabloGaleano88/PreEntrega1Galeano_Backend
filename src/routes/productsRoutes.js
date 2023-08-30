import { Router } from "express";
import ProductManager from '../ProductManager.js'
const productManager = new ProductManager('./src/products.json')

const router = Router()

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await productManager.getProducts()
    if (limit) {
        return res.status(products.status).send(products.payload.slice(0, limit)) 
    }
    res.status(products.status).send(products.payload)
})

router.get('/:pid', async (req, res) => {
    const product = parseInt(req.params.pid,10)
    const productById = await productManager.getProductById(product)
    res.status(productById.status).send(productById.payload)
})

router.post('/',async (req,res) => {
    const addProduct = req.body
    const result = await productManager.addProduct(addProduct)
    res.status(result.status).send(result.payload)
})

router.put('/:pid',async (req,res) => {
    let totalPayload = ""
    let result
    const id = parseInt(req.params.pid,10)
    const addProduct = req.body
    const updateFields = Object.keys(addProduct);
    const updateValues = Object.values(addProduct);
    const updatesq = updateFields.length
    for (let i = 0; i < updatesq; i++) {
        result = await productManager.updateProduct(id,updateFields[i],updateValues[i])
        totalPayload += result.payload
    }
    res.status(result.status).send(totalPayload)
})

router.delete('/:pid', async (req,res)=>{
    const id = parseInt(req.params.pid,10)
    const result = await productManager.deleteProduct(id)
    res.status(result.status).send(result.payload)
})


export default router