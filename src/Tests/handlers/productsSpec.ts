import supertest from 'supertest';
import app from '../../server'
import jwt from 'jsonwebtoken'
import { Product } from '../../models/product';

const request= supertest(app);
describe("testing Endpoint: /products", ()=> {
    const product: Product = {
        name: "PlayStation 5",
        price: 15000
    };
    let token: string;
    beforeAll( async () => {
        const tokenSecret = String(process.env.TOKEN);   
       
        await request.post("/users").send({firstname: "hagar", lastname:"mohsen", password:"someWords"})
        .expect(200)
        .then((res) => {
            token = String(res.body);
            jwt.verify(token,tokenSecret)
        });
    }) 

    it("Testing the product Create endpoint", async()=> {
        await request.post("/products").send(product).set("Authorization", `Bearer ${token}`).expect(200)
    })

    it("Testing the product Create endpoint with Wrong Token", async()=> {
        await request.post("/products").send(product).set("Authorization", `Bearer WrongToken`).expect(401)
    })
   
    it("Testing the product Delete endpoint ", async()=> {
        await request.delete(`/products/${product.id}`).set("Authorization", `Bearer ${token}`).expect(200)
    })

    it("Testing the products Index endpoint", async()=> {
        await request.get("/products").send(product).expect(200)
    })

    it("Testing the product Show endpoint", async()=> {
        await request.get(`/products/${product.id}`).expect(200)
    })

})