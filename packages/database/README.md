# Note Page Database

[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Database layer using Prisma ORM with MongoDB.

## 🚀 Features

- Prisma ORM for type-safe database operations
- MongoDB integration
- Automatic schema migrations
- Database seeding support
- TypeScript support
- Environment-based configuration

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:
   ```env
   DATABASE_URL="mongodb://localhost:27017/note-page"
   ```

2. Update the connection string with your MongoDB credentials

## 🛠️ Scripts

- `npm run generate`: Generate Prisma Client
- `npm run push`: Push schema changes
- `npm run studio`: Launch Prisma Studio
- `npm run seed`: Seed the database
- `npm run migrate`: Run migrations

## 📝 Schema

```prisma
model Note {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @unique
  notes     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("notes")
}
```

### Fields
- `id`: Unique identifier (MongoDB ObjectId)
- `userId`: Unique identifier for the user
- `notes`: The content of the notes
- `createdAt`: Timestamp of when the note was created
- `updatedAt`: Timestamp of when the note was last updated

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🔒 Security

- Environment variables for sensitive data
- Input validation
- Proper error handling
- Database connection pooling
- Query optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details. 