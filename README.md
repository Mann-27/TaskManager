
# Task Manager Application

## Setup
- Clone the repository: `git clone https://github.com/yourusername/task-manager.git`
- Install dependencies: `npm install`
- Set up the database connection in your `.env` file.

## Flow
- **Register:** Users can register with their first name, last name, email, and password.
- **Login:** Users can log in with their email and password to receive a JWT token.
- **Tasks:** Users can create, update, and query tasks, setting their status to "pending" or "completed".

## How to Run the Application
- Start the server: `npm start`
- Access the API: Use tools like Postman to interact with the endpoints (e.g., `/api/register`, `/api/login`, `/api/tasks`).

## Environment Variables
- Create a `.env` file and add the following:
- MONGO_URL
- PORT
- JWT_SECRET_KEY

  
