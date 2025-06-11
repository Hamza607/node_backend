## Node.js Backend

This is a Node.js backend project built with Express, Mongoose, and other popular packages to support the development of RESTful APIs.

### Features

Express.js – Fast, unopinionated, minimalist web framework

MongoDB with Mongoose – Flexible and scalable data storage

bcrypt / bcryptjs – Secure password hashing

dotenv – Load environment variables from .env

multer – File uploads handling

cors – Enable Cross-Origin Resource Sharing

nodemon – Auto-restart server during development

## Installation

1. Clone the Repository

git clone https://github.com/Hamza607/node_backend.git
cd node_backend

2. Install Dependencies

yarn install 

3. Configure Environment Variables

Create a .env file in the root directory and add the following variables:

.env

PORT=5000
MONGO_URI=your_mongodb_connection_string

Replace your_mongodb_connection_string with your actual MongoDB URI.

4. Run the Development Server

nodemon .\index.js

## Project Structure

## node_backend/
    │
    ├── index.js # Entry point of the app
    ├── .env # Environment variables
    ├── package.json # Project metadata and dependencies
    ├── /routes/ # Express routes
    ├── /controllers/ # Route handler logic
    ├── /models/ # Mongoose models
    └── /uploads/ # Directory for uploaded files via multer

License
This project is licensed under the MIT License.
