// importing the database connection
import client from "../database";

//our typescript type
export type Product = {
  id?: number;
  name: string;
  price: number;
};

// the class that will be used over and over to make each new item
// representation of the database
// postgres ambassador in JavaScript land
export class ProductsStore {
  // all calls of the db will be promises

    //creating new product
    async create(p: Product): Promise<Product> {
      try {
        const conn = await client.connect();
        const sql =
          "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
        const result = await conn.query(sql, [p.name, p.price]);
        const product = result.rows[0];
        conn.release();
        return product;
      } catch (err) {
        throw new Error(
          `Could not add new product ${(p.name)}.Error: ${err}`
        );
      }
    }

  //indexing all products
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't Get products, ${err}`);
    }
  }

  //searching a specific products with it's id
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();  
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  //updating product data
  async update(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE products SET name=($2), price=($3) WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [p.id, p.name, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not update product ${p.id}. Error: ${err}`);
    }
  }

   //deleting a specific product
  async deleting (id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

}
