
# E-commerce Product Data Model

### Description
This API provides endpoints to manage products in an e-commerce application. It allows users to perform various operations such as creating, updating, deleting, fetching, and searching products. The API ensures data integrity and validation using Zod schema validation and integrates with a MongoDB database using Mongoose.


### Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- MongoDB installed and running locally (or access to a MongoDB instance)


### Getting Started
To run this project locally, follow these steps:
```bash
git clone <repository-url>

```

- Navigate to the project directory:

```bash
cd project-directory

```

- Install dependencies:
```bash
npm Install

```
- Set up environment variables:
Create a .env file in the root directory of the project and define the following variables:
```bash
DATABASE_URL =mongodb://localhost:27017/your-database-name
PORT=5000

```
Replace your-database-name with the name of your MongoDB database, and 5000 with the desired port number.
- Start the server:

```bash
npm start
```
- Access the application:
Open your web browser and navigate to http://localhost:5000/api/products or http://localhost:5000/api/products  (or the port you specified).


### The Live Website Link for this project

https://assignment2-peach.vercel.app/api/products


https://assignment2-peach.vercel.app/api/orders

