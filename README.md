# Express & Mongoose API Server

This project is a basic REST API built with Express and Mongoose, connecting to MongoDB. It includes routes for handling `users` and `articles`, along with custom error handling for various types of errors.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- **Express Framework**: Handles HTTP requests and routing.
- **MongoDB & Mongoose**: MongoDB as the database, with Mongoose for easy schema and data handling.
- **Modular Routing**: Dedicated routers for `/users` and `/articles`.
- **Global Error Handling**: Handles validation and server errors, with meaningful error responses.
- **Environment Variable Support**: Configurable MongoDB URI and port through a `.env` file.
- **Database Seeding**: Populate the database with sample data for testing purposes.

## Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/anastasia2022be1/express-mongoose-api-server.git
   cd express-mongoose-api-server
   ```

2. **Install dependencies**:

```
npm install
```

3. **Configure environment variables**: Create a .env file in the root directory and add your MongoDB URI and server port:

```
MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
PORT=3000
```

## Usage

1. **Start the server**:

```
npm run dev
```

This command starts the API server on the specified port (default: 3000).

2. **Seed the database**: To populate the database with sample data, run the following command:

```
npm run seed
```

This command uses seed.js to add sample users and articles to your MongoDB database.

## Project Structure

- models/ - Mongoose schemas for users and articles
- routes/ - Routers for handling requests to /users and /articles
- seed.js - Script for seeding the database with initial data
- server.js - Main server file

## API Endpoints

### Users

- GET /users - Retrieve all users
- GET /users/:id - Retrieve a user by ID
- POST /users - Create a new user
- PATCH /users/:id - Update specific fields of a user by ID
- PUT /users/:id - Replace an entire user document by ID
- DELETE /users/:id - Delete a user by ID

### Articles

- GET /articles - Retrieve all articles
- POST /articles - Create a new article
- PUT /articles/:id - Replace an article by ID
- PATCH /articles/:id - Update specific fields of an article by ID
- DELETE /articles/:id - Delete an article by ID

## Error Handling

This project includes global error handling for:

- **Validation Errors**: Displays clear messages when data doesn't meet schema requirements.
- **Server Errors**: Logs errors to the console and sends a generic error response.

## License

This project is licensed under the ISC License.
