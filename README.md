### Build a Storefront Backend

## Setting up

 -- The project has been written with type script, and the changes can be viewed by nodemon
 -- Pakages such as: jsonwebtoken, pg, bcrypt, db-migrate have been installed and used to implement the project
 -- two databases have been created, one for the development and the other for testing
 -- database port: 5432

## Running

 -- At terminal you can first run the migration up by:
    db-migrate up
 -- Then you can run the server by:
    npm run start
 -- This project have four tabels which can be used for storing or retriving data among them
 -- You can access the data by using Postman

## Setting the Token

  -- Note that each of the Endpoint's different operations require Token to authorize the User
  -- The Token can be obtained after creating the user
  -- you can then use it through the Postman's Authorization tab, then choose the type as: Bearer Token and pass the token.
  -- Another way pass the token through postman, by choosing Headers tab and set the key to Authorization, and under the value you can pass the token, both ways are working just fine.


## Running Endpoints
## users
 # create a user
    from the link: http://localhost:3000/users
    the input json would be:
    {
    "firstname": "user's firstname",
    "lastname" : "user's lastname",
    "password" : "user's password"
    }
    choose POST from Postman

  -- you will be provided by the token, so keep it to the end of the operations

 # listing users
     from the link: http://localhost:3000/users
     you don't need parameters, just choose GET from postman

 # Load user
      from the link: http://localhost:3000/users/:id
      just write the user id as a url parameter and choose GET from Postman

 # Update user 
      from the link: http://localhost:3000/users
      the input json would be:
      {
        "id"       : "The id of thw wanted user to be updated"
        "firstname": "user's firstname",
        "lastname" : "user's lastname",
       "password"  : "user's password"
      }
      choose PUT from Postman

 # Delete user 
       from the link: http://localhost:3000/users/:id
       just write the user id as a url parameter and choose DELETE from Postman



## products
 # create a product
    from the link: http://localhost:3000/products
    the input json would be:
    {
    "name": "product's name",
    "price" : "products's price",
    }
    choose POST from Postman

 # listing products
     from the link: http://localhost:3000/products
     you don't need parameters, just choose GET from postman

 # Load product
      from the link: http://localhost:3000/products/:id
      just write the product id as a url parameter and choose GET from Postman

 # Update product 
      from the link: http://localhost:3000/products
      the input json would be:
      {
        "id"       : "The id of thw wanted product to be updated"
        "name": "product's name",
        "price" : "products's price",
      }
      choose PUT from Postman

 # Delete product 
       from the link: http://localhost:3000/products/:id
       just write the product id as a url parameter and choose DELETE from Postman


## orders
 # create an order
    from the link: http://localhost:3000/orders
    the input json would be:
    {
    "status"  : "orders's status",
    "user_id" : "the id of the user who having this order",
    }
    choose POST from Postman

 # listing orders
     from the link: http://localhost:3000/orders
     you don't need parameters, just choose GET from postman

 # Load order
      from the link: http://localhost:3000/orders/:id
      just write the order id as a url parameter and choose GET from Postman

 # Update order 
      from the link: http://localhost:3000/orders
      the input json would be:
      {
        "id"      : "The id of the wanted order to be updated"
        "status"  : "orders's status",
        "user_id" : "the id of the user who having this order",
      }
      choose PUT from Postman

# Add Product in an Order 
      from the link: http://localhost:3000/orders/:id/products
      write the order id that you want to add products in it as a url parameter
      the input json would be:
      {
        "product_id"  : "product's id to add to the order",
        "quantity"    : "the quantity of the product that will be added to the order",
      }
      choose POST from Postman

# Fined Current Order By User 
      from the link: http://localhost:3000/orders/users/:id
      just write the user id that you want to know which order he made as a url parameter and choose GET from Postman

 # Delete order 
       from the link: http://localhost:3000/products/:id
       just write the order id as a url parameter and choose DELETE from Postman


## Dropping the whole migration
 -- after finishing you can run: db-migrate reset

## Testing the App
 -- you can run: npm run test
 -- it will run the tests on the testing data base that I already created previously
 -- After finishing all tests, all tables will be droped automatically

## Environment Variables 

      -- they will take that form:
       POSTGRES_HOST=
       POSTGRES_DB=
       POSTGRES_TEST_DB=
       POSTGRES_USER=
       POSTGRES_PASSWORD=
       PEPPER=
       SALT_ROUNDS=
       TOKEN=
       ENV=dev





