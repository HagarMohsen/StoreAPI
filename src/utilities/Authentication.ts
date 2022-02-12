import express from 'express'
import jwt from 'jsonwebtoken'

const verificationToken = (req: express.Request, res: express.Response, next: Function) : void => {
        try{
         const authorizationHeader = String(req.headers.authorization)
         const token = authorizationHeader.split(' ')[1]
         const tokenSecret = String(process.env.TOKEN)
         jwt.verify(token, tokenSecret)
         next()
        } catch (err) {
                res.status(401)
                res.json('Access denied, invalid token')
        }
}

export default verificationToken 
        
