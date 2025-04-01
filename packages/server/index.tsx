import express, { Express } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Test database connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1); // Exit if database connection fails
  }
}

// Initialize Express app
const app: Express = express();
// Create HTTP server
const httpServer = createServer(app);

// Define types for socket data
interface ServerToClientEvents {
  content: (content: string) => void;
  error: (message: string) => void;
}

interface ClientToServerEvents {
  message: (data: any) => void;
  disconnect: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId?: string;
}

// Initialize Socket.IO with CORS configuration
const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: '/socket.io/',
  transports: ['websocket', 'polling']
});

// Add server-level event listeners
io.engine.on('connection_error', (err) => {
  console.error('Server: Connection error:', err);
});

io.engine.on('upgrade', (req, socket, head) => {
  console.log('Server: Socket upgrade request received');
});

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Global state variables
let connectedClients: number = 0;
let currentContent: string = ''; // Store the current content

// Load initial content from database
async function loadInitialContent() {
  try {
    const latestNote = await prisma.note.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    });
    if (latestNote) {
      currentContent = latestNote.notes;
    }
  } catch (error) {
    console.error('Error loading initial content:', error);
  }
}

// Load initial content when server starts
loadInitialContent();

// Socket.IO connection handling
io.on('connection', async (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  // Get userId from authentication
  const userId = socket.handshake.auth.userId;
  socket.data.userId = userId;

  // Increment connected clients counter
  connectedClients++;
  
  // Log new connection with more details
  console.log('\n=== New Client Connected ===');
  console.log(`Total connected clients: ${connectedClients}`);
  console.log(`Client ID: ${socket.id}`);
  console.log(`User ID: ${userId}`);
  console.log(`Transport: ${socket.conn.transport.name}`);
  console.log(`Headers:`, socket.handshake.headers);
  console.log('===========================\n');

  try {
    // Retrieve user's notes from database
    const userNote = await prisma.note.findFirst({
      where: {
        userId: userId
      }
    });

    if (userNote) {
      console.log('Server: Found user notes, sending to client');
      socket.emit('content', userNote.notes);
    } else {
      console.log('Server: No notes found for user');
    }
  } catch (error) {
    console.error('Error retrieving user notes:', error);
    socket.emit('error', 'Failed to retrieve notes');
  }

  // Handle messages from client
  socket.on('message', async (data: any) => {
    console.log('\n=== Received Message ===');
    console.log(`Client ID: ${socket.id}`);
    console.log(`User ID: ${userId}`);
    console.log('Message type:', typeof data);
    console.log('Message content length:', data.content ? data.content.length : 0);
    console.log('Content preview:', data.content ? data.content.substring(0, 100) + '...' : 'No content');
    console.log('Full message data:', JSON.stringify(data, null, 2));
    console.log('=====================\n');

    // Update current content and save to database
    if (data.content) {
      currentContent = data.content;
      try {
        // First, check if we have a valid userId
        if (!userId) {
          console.error('No userId provided in socket connection');
          socket.emit('error', 'User ID is required');
          return;
        }

        console.log('Attempting to save note with userId:', userId);
        const result = await prisma.note.upsert({
          where: {
            userId: userId
          },
          update: {
            notes: currentContent
          },
          create: {
            userId: userId,
            notes: currentContent
          }
        });
        console.log('Database operation result:', result);
        console.log('Content saved to database successfully');
      } catch (error) {
        console.error('Detailed error saving content to database:', error);
        if (error instanceof Error) {
          console.error('Error name:', error.name);
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        socket.emit('error', `Failed to save content to database: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      console.log('\n=== Broadcasting Content ===');
      console.log('Content length:', currentContent.length);
      console.log('Content preview:', currentContent);
      console.log('=====================\n');
      // Broadcast the content to all connected clients except the sender
      socket.broadcast.emit('content', currentContent);
    }
  });

  // Handle client disconnection
  socket.on('disconnect', (reason) => {
    // Decrement connected clients counter
    connectedClients--;
    
    // Log the disconnection with reason
    console.log('\n=== Client Disconnected ===');
    console.log(`Client ID: ${socket.id}`);
    console.log(`User ID: ${userId}`);
    console.log(`Reason: ${reason}`);
    console.log(`Remaining clients: ${connectedClients}`);
    console.log('========================\n');
  });
});

// Start the server with more detailed logging
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Test database connection before starting server
testDatabaseConnection().then(() => {
  httpServer.listen(PORT, () => {
    console.log('\n=== Server Started ===');
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS origin: http://localhost:3000`);
    console.log(`Socket.IO path: /socket.io/`);
    console.log(`Available transports: websocket, polling`);
    console.log('=====================\n');
  });
}); 