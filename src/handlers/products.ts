import express, {Request,Response} from 'express'
import { Product, ProductsStore } from '../models/product'
import verificationToken  from "../utilities/Authentication"

const store = new ProductsStore()

const create = async (req: Request, res: Response) => {
    const myProduct: Product = {
        name: req.body.name,
        price:req.body.price,
    }
    //validate inputs existance
    if (myProduct.name === undefined || myProduct.price === undefined){
        res.status(404)
        return res.send("Missing Data, You need to insert the product's name and price correctly")
    } 
    try {
        const newProduct = await store.create(myProduct)
        res.json(newProduct)
    } catch(err){
        res.json(err)
    }
}

const index = async (req: Request, res: Response) => {
    try{
        const products = await store.index()
        res.json(products)
    } catch(err){
        res.json(err)
    }  
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
     //validate inputs existance
     if (id === undefined){
        res.status(404)
        return res.send("Missing Parameters, Insert the id value as a parameter")
    } 
    try{
     const product = await store.show(id)
     //validate the existance of the product that we want to fined
     if (product === undefined) {
        res.status(404)
        return res.json("There is no product with that id in the database")
    }
     res.json(product)
    } catch(err){
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    const myProduct: Product = {
        id:Number(req.body.id),
        name: req.body.name,
        price:req.body.price,
    }
    //validate inputs existance
    if (myProduct.id === undefined || myProduct.name === undefined || myProduct.price === undefined){
        res.status(404)
        return res.send("Missing Data, You need to insert the product's id, name and price correctly")
    } 
    try{
     const updatedProduct = await store.update(myProduct)
     //validate the existance of the product that we want to update
     if (updatedProduct === undefined) {
        res.status(404)
        return res.json("There is no product with that id in the database to Update")
    }
     res.json(updatedProduct)
    } catch(err){
        res.json(err)
    }
} 

const deleting = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
     //validate inputs existance
     if (id === undefined){
        res.status(404)
        return res.send("Missing Parameters, Insert the id value as a parameter")
    } 
    try{
        const deletedProduct = await store.deleting(id)
        //validate the existance of the product that we want to delete
        if (deletedProduct === undefined) {
            res.status(404)
            return res.json("There is no product with that id in the database to delete")
        }
        res.json("Success in deleting the required product")
    } catch (err){
        res.json(err)
    }
}
const productsRoutes = (app: express.Application) => {
    app.post('/products', verificationToken, create)
    app.get('/products',index)
    app.get('/products/:id', show)
    app.put('/products', verificationToken, update)
    app.delete('/products/:id', verificationToken, deleting)
  }

  export default productsRoutes


 