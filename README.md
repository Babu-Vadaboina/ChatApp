# QuickChat - Full-Stack Chat Application

This is a real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. The frontend is created with Vite for a fast development experience.

## Features

- User authentication (Login/Signup)
- Real-time messaging with Socket.io
- View online users
- See unseen message counts
- Image sharing in chats (via Cloudinary)
- Profile updates

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account for a cloud-hosted database)

## Local Installation and Setup

Follow these steps to get the application running on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ChatApp
```

### 2. Backend Setup (Server)

First, let's set up the server.

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install
```

Next, create a `.env` file in the `server` directory and add the following environment variables.

```ini
# /server/.env

# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# A secret key for signing JSON Web Tokens
JWT_SECRET=your_super_secret_jwt_key

# Port for the backend server
PORT=5001

# Cloudinary credentials for image uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup (Client)

Now, let's set up the React client. Open a new terminal window for this.

```bash
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install
```

The client uses a `.env` file to know where the backend API is located. A default is provided, which should work with the server setup above.

```ini
# /client/.env
VITE_BACKEND_URL='http://localhost:5001'
```

## Running the Application

1.  **Start the Backend Server:** In your terminal inside the `server` directory, run:

    ```bash
    npm start
    ```

    The server should now be running on `http://localhost:5001`.

2.  **Start the Frontend Client:** In your terminal inside the `client` directory, run:
    ```bash
    npm run dev
    ```
    The application will open in your browser, usually at `http://localhost:5173`. You can now register a new user and start chatting!
