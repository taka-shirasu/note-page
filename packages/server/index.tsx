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

// Trust proxy headers
app.set('trust proxy', true);

// Add middleware to log all incoming requests
app.use((req, res, next) => {
  console.log('\n=== Incoming Request ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('========================\n');
  next();
});

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
    origin: ["https://note.jotme.io", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["*"]
  },
  path: '/socket.io/',
  transports: ['polling', 'websocket'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 10000,
  allowEIO3: true
});

// Add server-level event listeners
io.engine.on('connection_error', (err) => {
  console.error('\n=== Socket.IO Connection Error ===');
  console.error('Error:', err);
  console.error('Request headers:', err.req?.headers);
  console.error('Request URL:', err.req?.url);
  console.error('Request method:', err.req?.method);
  console.error('Error code:', err.code);
  console.error('Error message:', err.message);
  console.error('X-Forwarded-Proto:', err.req?.headers['x-forwarded-proto']);
  console.error('X-Forwarded-For:', err.req?.headers['x-forwarded-for']);
  console.error('Host:', err.req?.headers.host);
  console.error('============================\n');
});

// Add connection state logging
io.engine.on('connection', (socket) => {
  console.log('\n=== New Socket.IO Connection ===');
  console.log('Socket ID:', socket.id);
  console.log('Transport:', socket.transport.name);
  console.log('Headers:', socket.request.headers);
  console.log('X-Forwarded-Proto:', socket.request.headers['x-forwarded-proto']);
  console.log('X-Forwarded-For:', socket.request.headers['x-forwarded-for']);
  console.log('==========================\n');
});

// Add upgrade logging
io.engine.on('upgrade', (req, socket, head) => {
  console.log('\n=== Socket Upgrade Request ===');
  console.log('Headers:', req.headers);
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Host:', req.headers.host);
  console.log('Origin:', req.headers.origin);
  console.log('X-Forwarded-Proto:', req.headers['x-forwarded-proto']);
  console.log('X-Forwarded-For:', req.headers['x-forwarded-for']);
  console.log('==========================\n');
});

// Add transport error logging
io.engine.on('transport_error', (err) => {
  console.error('\n=== Socket.IO Transport Error ===');
  console.error('Error:', err);
  console.error('Error code:', err.code);
  console.error('Error message:', err.message);
  console.error('==========================\n');
});

// Add upgrade error logging
io.engine.on('upgrade_error', (err) => {
  console.error('\n=== Socket.IO Upgrade Error ===');
  console.error('Error:', err);
  console.error('Error code:', err.code);
  console.error('Error message:', err.message);
  console.error('==========================\n');
});

// Enable CORS for all routes
app.use(cors({
  origin: ["https://note.jotme.io", "http://localhost:3000"],
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["*"]
}));

// Parse JSON request bodies
app.use(express.json());

// Add basic root endpoint with CORS headers
app.get('/', (req, res) => {
  console.log('Health check request received at /', req.headers);
  const origin = req.headers.origin;
  if (origin === "https://note.jotme.io" || origin === "http://localhost:3000") {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.json({ status: 'Server is running' });
});

// Add health check endpoint with CORS headers
app.get('/health', async (req, res) => {
  console.log('\n=== Health Check Request ===');
  console.log('Time:', new Date().toISOString());
  console.log('Headers:', req.headers);
  console.log('Client IP:', req.ip);
  
  try {
    // Check database connection
    await prisma.note.findFirst();
    console.log('Database health check: OK');
    
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      database: 'connected'
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    res.status(500).json({
      status: 'error',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
  
  console.log('===========================\n');
});

// Add OPTIONS handler for preflight requests
app.options('*', cors());

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
(io as any).on('connection', async (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
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

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  console.log(`\n=== Received ${signal} signal ===`);
  console.log('Starting graceful shutdown...');
  
  try {
    // Close Socket.IO server
    console.log('Closing Socket.IO server...');
    io.close();
    
    // Close HTTP server
    console.log('Closing HTTP server...');
    httpServer.close();
    
    // Close database connection
    console.log('Closing database connection...');
    await prisma.$disconnect();
    
    console.log('Graceful shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle process signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Test database connection before starting server
testDatabaseConnection().then(() => {
  httpServer.listen(PORT, () => {
    console.log('\n=== Server Started ===');
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS origin: * (allowing all origins)`);
    console.log(`Socket.IO path: /socket.io/`);
    console.log(`Available transports: websocket, polling`);
    console.log('=====================\n');
  });
}); 