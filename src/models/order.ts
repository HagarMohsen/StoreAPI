// importing the database connection
import client from "../database";
import bcrypt from "bcrypt";

//our typescript type
export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

// the class that will be used over and over to make each new item
// representation of the database
// postgres ambassador in JavaScript land
export class OrdersStore {
  // all calls of the db will be promises

    //creating new order
    async create(o: Order): Promise<Order> {
      try {
        const conn = await client.connect();
        const sql =
          "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
        const result = await conn.query(sql, [o.status, o.user_id]);
        const order = result.rows[0];
        conn.release();
        return order;
      } catch (err) {
        throw new Error(
          `Could not add new product ${(o)}.Error: ${err}`
        );
      }
    }
  
  //indexing all orders along with it's products 
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't Get orders, ${err}`);
    }
  }

  //searching a specific order with it's id
  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  //updating order data
  async update (o:Order): Promise<Order>{
    try{
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [o.id, o.status]);
      const updatedOrder = result.rows[0];
      conn.release();
      return updatedOrder;
    } catch(err){
      throw new Error(
        `Could not update product ${(o.user_id)}.Error: ${err}`
      )
    }
  }

  //attaching a products to an order
  async addProduct(quantity: number, order_id: string, product_id: string): Promise<{quantity: number, order_Id: string, product_Id: string}> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [quantity, order_id, product_id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
    }
  }

  //requiring user current order "fetching the order associated with a specific user"
  async currentOrdersByUser(user_id: number): Promise<{id:number, status:string}[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT orders.id, orders.status FROM users INNER JOIN orders ON users.id = orders.user_id WHERE users.id=($1)";
      const result = await conn.query(sql,[user_id]);
      conn.release();
      const order = result.rows
      return order;
    } catch (err) {
      throw new Error(`Can't Get current orders made by this user, ${err}`);
    }
  }

  //deleting a specific order
  async deleting (id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

}
