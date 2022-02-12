import express, {Request,Response} from 'express'
import { Order, OrdersStore } from '../models/order'
import verificationToken  from "../utilities/Authentication"

const store = new OrdersStore()

const create = async (req: Request, res: Response) => {
    const myOrder: Order = {
        status:req.body.status,
        user_id: req.body.user_id,
    }
    //validate inputs existance
    if (myOrder.user_id === undefined || myOrder.status === undefined){
        res.status(404)
        return res.send("Missing Data, You need to insert the product's name and price correctly")
    } 
    try{
     const newOrder = await store.create(myOrder)
     res.json(newOrder)
    } catch(err){
        res.send(`Attention: ${err}`)
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
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
        const order = await store.show(id)
        res.json(order)
    } catch (err){
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
    const myOrder: Order = {
        id:Number(req.body.id),
        status:String(req.body.status),
        user_id: req.body.user_id,
    }
    //validate inputs existance
    if (myOrder.id === undefined || myOrder.user_id === undefined || myOrder.status === undefined){
        res.status(404)
        return res.send("Missing Data, You need to insert the product's name and price correctly")
    } 
    try{
     const updatedOrder = await store.update(myOrder)
     //validate the existance of the order that we want to update
     if (updatedOrder === undefined) {
        res.status(404)
        return res.json("There is no orders with that id in the database")
    }
     res.json(updatedOrder)
    } catch(err){
        res.json(err)
    }
}
const addProduct = async (req: Request, res: Response) => {
    const order_id = req.params.id
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    try{
        const addProduct = await store.addProduct(quantity,order_id,product_id)
        res.json(addProduct)
    } catch (err){
        res.send(`Attention${err}`)
        res.json(err)
    }
}

export const currentOrdersByUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
     //validate inputs existance
     if (id === undefined){
        res.status(404)
        return res.send("Missing Data, You need to insert the id of the wanted user")
    } 
    try{
        const userOrders = await store.currentOrdersByUser(id)
        res.json(userOrders)
    } catch (err){
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
        const deletedOreder = await store.deleting(id)
        //validate the existance of the order that we want to delete
        if (deletedOreder === undefined) {
            res.status(404)
            return res.json("There is no orders with that id in the database")
        }
        res.json("Success in deleting the required order")
    } catch (err){
        res.json(err)
    }
}

const ordersRoutes = (app: express.Application) => {
    app.post('/orders', verificationToken, create)
    app.get('/orders',verificationToken ,index)
    app.get('/orders/:id', verificationToken, show)
    app.put('/orders', verificationToken, update)
    app.post('/orders/:id/products', verificationToken, addProduct)
    app.get('/orders/users/:id', verificationToken, currentOrdersByUser)
    app.delete('/orders/:id', verificationToken, deleting)
  }

  export default ordersRoutes


 