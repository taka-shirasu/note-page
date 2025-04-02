# Note Page Server

[![Node.js CI](https://github.com/yourusername/note-page/actions/workflows/node.js.yml/badge.svg)](https://github.com/yourusername/note-page/actions/workflows/node.js.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Real-time server implementation for the Note Page application using Express and Socket.IO.

## 🚀 Features

- Express.js HTTP server
- Socket.IO for real-time communication
- Prisma Client for database operations
- CORS support
- TypeScript for type safety
- Comprehensive error handling
- Detailed logging

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:
   ```env
   PORT=3001
   DATABASE_URL=mongodb://localhost:27017/note-page
   CORS_ORIGINS=http://localhost:3000,https://your-domain.com
   ```

2. Update the values according to your environment

## 🛠️ Scripts

- `npm start`: Start the server
- `npm run dev`: Start with hot-reload
- `npm run build`: Build TypeScript code
- `npm test`: Run tests
- `npm run lint`: Run ESLint

## 🔌 Socket.IO Events

### Client to Server
- `message`: Note content updates
- `disconnect`: Client disconnection

### Server to Client
- `content`: Broadcast updates
- `error`: Error messages

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 API Documentation

### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-04-02T12:00:00.000Z",
  "uptime": 1234.56,
  "memoryUsage": {
    "rss": 123456,
    "heapTotal": 123456,
    "heapUsed": 123456,
    "external": 123456
  },
  "database": "connected"
}
```

## 🔒 Security

- CORS is configured to allow specific origins
- Input validation for all requests
- Rate limiting for socket connections
- Proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Development

1. Start development server:
   ```bash
   npm run dev
   ```

2. Monitor console for:
   - Database connections
   - Client connections
   - Real-time updates
   - Error messages

## Dependencies

- `express`: Web server
- `socket.io`: Real-time communication
- `cors`: Cross-origin support
- `@prisma/client`: Database client 