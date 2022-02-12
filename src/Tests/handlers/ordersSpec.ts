import supertest from 'supertest';
import app from '../../server'
import jwt from 'jsonwebtoken'
import { Order } from '../../models/order';

const request= supertest(app);
describe("testing Endpoint: /orders", ()=> {
    const order: Order = {
        user_id: "",
        status: "open"
    };
    let token: string;
    let userId: string; 
    beforeAll( async () => {
        const tokenSecret = String(process.env.TOKEN);   
       
        await request.post("/users").send({firstname: "hagar", lastname:"mohsen", password:"someWords"})
        .expect(200)
        .then((res) => {
            token = String(res.body);
            const verification = jwt.verify(token,tokenSecret)
            userId = String(verification.myUser.id)
            order.user_id = userId
        });
    }) 

    it("Testing the order create endpoint", async()=> {
        await request.post("/orders").send(order).set("Authorization", `Bearer ${token}`).expect(200)
    })

    it("Testing the order create endpoint with wrong token", async()=> {
        await request.post("/orders").send(order).set("Authorization", `Bearer WrongToken`).expect(401)
    })
   

    it("Testing the order delete endpoint ", async()=> {
        await request.delete(`/orders/${order.id}`).set("Authorization", `Bearer ${token}`).expect(200)
    })

    it("Testing the Order Made By User endpoint ", async()=> {
        await request.get(`/orders/users/${userId}`).set("Authorization", `Bearer ${token}`).expect(200)
    })

})