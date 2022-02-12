import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import usersRoutes from "./handlers/users";
import productsRoutes from "./handlers/products";
import ordersRoutes from "./handlers/orders";

const app: express.Application = express();
const address = "0.0.0.0:3000";
const corsOptions = {
  origin: "http://someotherdomain.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("This is the Store Front End");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
usersRoutes(app);
productsRoutes(app)
ordersRoutes(app)
