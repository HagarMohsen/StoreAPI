### Build a Storefront Backend

## API Requirements

Build a JavaScript API based on a requirements given by the stakeholders. You will architect the database, tables, and columns to fulfill the requirements. Create a RESTful API to be accessible to the frontend developer. You will also have written test, secured user information with encryption, and provide tokens for integration into the frontend.

## API Endpoint

| Endpoint  | Reqiest |   Parameters  |Requires Token |    usage       |
| ----------|-------- |---------------|-------------- | -------------- |
| **/**     | **GET** |     **N/A**   |   **False**   | **Root Route** |


## Users

| Endpoint          | Reqiest    |   Parameters                          |Requires Token |    usage          |
| ----------        |--------    |---------------                        |-------------- | --------------    |
| **/users**        | **post**   |     **firstname,lastname,password**   |   **False**   | **Create User**   |
| **/users**        | **GET**    |                 **N/A**               |   **True**    | **List Users**    |
| **/users/:id**    | **GET**    |                 **id**                |   **True**    | **Load User**     |
| **/users**        | **PUT**    |  **id,firstname,lastname,password**   |   **True**    | **Update User**   |
| **/users/:id**    | **DELETE** |                 **id**                |   **True**    | **Delete User**   |


## Products

| Endpoint          | Reqiest    |   Parameters          |Requires Token |    usage            |
| ----------        |--------    |---------------        |-------------- | --------------      |
| **/products**     | **post**   |     **name,price**    |   **True**    | **Create product**  |
| **/products**     | **GET**    |         **N/A**       |   **True**    | **List products**   |
| **/products/:id** | **GET**    |         **id**        |   **True**    | **Load product**    |
| **/products**     | **PUT**    |   **id,name,price**   |   **True**    | **Update product**  |
| **/products/:id** | **DELETE** |          **id**       |   **True**    | **Delete product**  |


## Orders

|         Endpoint         |  Reqiest   |             Parameters                 |Requires Token |           usage          |
| -----------------------  | ---------- | -------------------------------------- |-------------- |   ---------------------  |
| **/orders**              | **post**   |         **status,user_id**             |   **True**    | **Create order**         |
| **/orders**              | **GET**    |             **N/A**                    |   **True**    | **List orders**          |
| **/orders/:id**          | **GET**    |             **id**                     |   **True**    | **Load order**           |
| **/users**               | **PUT**    |        **id,status,user_id**           |   **True**    | **Update order**         |
| **/orders/:id/products** | **POST**   |**id,product_id,quantity** :id for order|   **True**    | **Add product to order** | 
| **/orders/users/:id**    | **GET**    |         **id**  :id for user           |   **True**    | **Load orders by user**  |
| **/orders/:id**          | **DELETE** |             **id**                     |   **True**    | **Delete product**       |
 
#### A valid jwt token can be obtained by creating a new user ####
  -- Then you can pass it as authorization or to the header in the postman


## Database Schema

## Users

|       Field         |       Type       |          Special Attributes           |
|       ----------    |      --------    |    ------------------------------     |
| **id**              | **Serial**       |             **Primary Key**           |   
| **firstname**       | **Varchar(100)** |                 **N/A**               |   
| **lastname**        | **Varchar(100)** |                 **N/A**               |   
| **password_digest** | **Varchar**      |                 **N/A**               |  


## Products

|     Field      |       Type       |          Special Attributes           |
| -------------- |  --------------- | -----------------------------------   |
| **id**         | **Serial**       |             **Primary Key**           |   
| **name**       | **Varchar(100)** |                 **N/A**               |   
| **price**      | **integer**      |                 **N/A**               |   


## Orders

|     Field      |       Type       |          Special Attributes           |
| -------------- |  --------------- | -----------------------------------   |
| **id**         | **Serial**       |             **Primary Key**           |   
| **status**     | **Varchar(100)** |                 **N/A**               |   
| **user_id**    | **Varchar(100)** |             **Foreign Key**           |   


## Order_products

|     Field      |       Type       |          Special Attributes           |
| -------------- |  --------------- | -----------------------------------   |
| **id**         |   **Serial**     |             **Primary Key**           |   
| **quantity**   |   **integer**    |                 **N/A**               |   
| **order_id**   | **Varchar(100)** |             **Foreign Key**           |   
| **product_id** | **Varchar(100)** |             **Foreign Key**           |   

