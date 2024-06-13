
# Chats (Backend)

This project is the backend of a real-time chat application built with MERN Stack and Socket.IO . It provides a robust and scalable server-side solution for handling authentication, real-time messaging, and dynamic user status updates, friend requests etc.

## Features

- Real-time Messaging: Facilitates instant messaging between users using Socket.IO.
- Authentication: Secure user authentication using JWT.
- User Management: Handles user registration, login, and profile updates.
- Dynamic Online Status: Updates and provides users' online status in real-time.
- Message Storage: Persists messages and chat history using MongoDB.
- Notifications: Sends real-time notifications for new messages and friend requests.


## Run Locally

Clone the project

```bash
  git clone https://github.com/rishabhraikwar98/Chats-Backend
```

Go to the project directory

```bash
  cd Chats-Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`BASE_URL` (Frontend)

`JWT_SECRET`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_SECRET`

`CLOUDINARY_API_KEY`


## Tech Used

- Node.js: For server-side JavaScript runtime.
- Express.js: For creating the server and handling API routes.
- MongoDB: For database management.
- Mongoose: For MongoDB object modeling.
- Socket.IO: For real-time communication.
- JWT: For secure user authentication.
- Zod: For form validation.
## Related

Here is Backend Repository

[Chats](https://github.com/rishabhraikwar98/chats)

