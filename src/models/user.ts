// importing the database connection
import client from "../database";
import bcrypt from "bcrypt";

//our typescript type
export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

//defining our hashing salt and pepper
const pepper = process.env.PEPPER;
const salt = process.env.SALT_ROUNDS;

// the class that will be used over and over to make each new item
// representation of the database
// postgres ambassador in JavaScript land
export class UsersStore {
  // all calls of the db will be promises

    //creating new user
    async create(u: User): Promise<User> {
      try {
        const conn = await client.connect();
        const sql =
          "INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *";
        //hashing the user password
        const hash = bcrypt.hashSync(u.password + pepper, Number(salt));
        const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
        const user = result.rows[0];
        conn.release();
        return user;
      } catch (err) {
        throw new Error(
          `Could not add new user ${(u.firstname, u.lastname)}.Error: ${err}`
        );
      }
    }

  //indexing all users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Can't Get users, ${err}`);
    }
  }

  //searching a specific user with it's id
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  //updating user data
  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE users SET firstname=($2), lastname=($3), password_digest=($4) WHERE id=($1) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, Number(salt));
      const result = await conn.query(sql, [u.id, u.firstname, u.lastname, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not update user ${u.id}. Error: ${err}`);
    }
  }

  //deleting a specific user
  async deleting(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }

}
