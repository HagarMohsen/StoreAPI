import express, {Request,Response} from 'express'
import { User, UsersStore } from '../models/user'
import verificationToken  from "../utilities/Authentication"
import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN
const store = new UsersStore()

const create = async (req: Request, res: Response) => {
    const myUser: User = {
        firstname: req.body.firstname,
        lastname:  req.body.lastname,
        password:  req.body.password,
    }
    //validate inputs existance
    if (myUser.firstname === undefined || myUser.lastname === undefined || myUser.password === undefined){
        res.status(404)
        return res.send("Missing Data, You need to insert your first and last name and your password correctly")
    } 
    try {
        const newUser = await store.create(myUser)
        var token = jwt.sign({myUser:newUser},String(tokenSecret))
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (req: Request, res: Response) => {
    try{
        const users = await store.index()
        res.json(users)
    } catch (err){
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
        const user = await store.show(id)
        //validate the existance of the user that we want to fined
        if (user === undefined){
            res.status(404)
            return res.send("The required user is missing") 
        }
        res.json(user)
    } catch (err){
        res.json(err)
    }

}

const update = async (req: Request, res: Response) => {
    const myUser: User = {
        id:        req.body.id,
        firstname: req.body.firstname,
        lastname:  req.body.lastname,
        password:  req.body.password,
    }
    try{
     const updatedUser = await store.update(myUser)
     //validate the existance of the user that we want to update
     if (updatedUser === undefined) {
        res.status(404)
        return res.json("There is no user with that id in the database to Update")
    }
     res.json(updatedUser)
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
        const deleteduser = await store.deleting(id)
        //validate the existance of the user that we want to delete
        if (deleteduser === undefined) {
            res.status(404)
            return res.json("There is no user with that id in the database")
        }
        res.json("Success in deleting the required product")
    } catch (err){
        res.json(err)
    }
}

const usersRoutes = (app: express.Application) => {
    app.post('/users', create)
    app.get('/users',verificationToken ,index)
    app.get('/users/:id', verificationToken, show)
    app.put('/users', verificationToken, update)
    app.delete('/users/:id', verificationToken, deleting)
  }

  export default usersRoutes


 