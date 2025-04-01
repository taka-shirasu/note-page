# Note Page Server

This package provides the real-time server implementation for the Note Page application using Express and Socket.IO.

## Overview

The server package implements a real-time communication system that enables synchronized note-taking across multiple clients. It uses:
- Express.js for the HTTP server
- Socket.IO for real-time bidirectional communication
- Prisma Client for database operations
- CORS for cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (configured in the database package)
- Environment variables set up (see Configuration section)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root of this package with the following content:

```env
PORT=3001
```

The server will default to port 3001 if not specified in the environment variables.

## Available Scripts

- `npm start`: Start the server using ts-node
- `npm run dev`: Start the server in development mode with hot-reload
- `npm run build`: Build the TypeScript code

## Server Architecture

### Socket.IO Events

The server implements the following Socket.IO events:

#### Client to Server
- `message`: Receives note content updates from clients
- `disconnect`: Handles client disconnection

#### Server to Client
- `content`: Broadcasts note content updates to all connected clients
- `error`: Sends error messages to clients

### Database Integration

The server integrates with the database package to:
- Load initial note content on server startup
- Save note updates to the database
- Retrieve user-specific notes on connection

### CORS Configuration

CORS is configured to allow connections from:
- Origin: `http://localhost:3000`
- Methods: GET, POST
- Credentials: Enabled

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will:
   - Connect to the MongoDB database
   - Start the Socket.IO server
   - Enable CORS for the frontend
   - Listen for client connections

3. Monitor the console for:
   - Database connection status
   - Client connections/disconnections
   - Real-time updates
   - Error messages

## Dependencies

### Main Dependencies
- `express`: Web server framework
- `socket.io`: Real-time bidirectional communication
- `cors`: Cross-origin resource sharing
- `@prisma/client`: Database client

### Development Dependencies
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript execution engine
- `ts-node-dev`: Development server with hot-reload
- `nodemon`: File system watcher
- Various TypeScript type definitions

## Error Handling

The server implements comprehensive error handling for:
- Database connection issues
- Socket connection errors
- Message processing errors
- Client disconnections

## Logging

The server provides detailed logging for:
- Server startup
- Database connections
- Client connections/disconnections
- Message processing
- Error conditions

## Contributing

When making changes to the server:
1. Ensure all TypeScript types are properly defined
2. Test the Socket.IO events
3. Verify database operations
4. Check error handling
5. Run the development server to test changes 