import supertest from 'supertest';
import app from '../../server'
import jwt from 'jsonwebtoken'
import { User } from '../../models/user';

const request = supertest(app)
const user: User = {
    firstname: "Aya",
    lastname: "Shahine",
    password: "Password0808"}
const tokenSecret = String(process.env.TOKEN);    
let token: string;
let userId: string;    

describe ("Testing Endpoint: /users", ()=> {
    it("Testing the user Create endpoint ", async ()=> {
        await request.post("/users").send(user).expect(200).then(
           (res)=> { 
               token = String(res.body);
               const verification = jwt.verify(token,tokenSecret)
               const user_data = verification.myUser.id
               userId = String(user_data)
            }
        );
    });

    it("Testing the user Show endpoint",async ()=> {
        await request.get (`/users/${userId}`).set("Authorization", `Bearer ${token}`).expect(200)
    })

    it("Testing the user Show endpoint with wrong token",async ()=> {
        await request.get (`/users/${userId}`).set("Authorization", "Bearer TryingInvalidToken").expect(401)
    })

    it("Testing the users Index endpoint",async ()=> {
        await request.get ("/users").set("Authorization", `Bearer ${token}`).expect(200)
    })
 
})