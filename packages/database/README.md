# Note Page Database

This package provides the database layer for the Note Page application using Prisma ORM with MongoDB.

## Overview

The database package uses Prisma as an ORM (Object-Relational Mapping) tool to interact with a MongoDB database. It provides type-safe database operations and a clean API for managing notes in the application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Environment variables set up (see Configuration section)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root of this package with the following content:

```env
DATABASE_URL="mongodb://your-mongodb-connection-string"
```

Replace `your-mongodb-connection-string` with your actual MongoDB connection string.

## Database Schema

The database currently has one main model:

### Note Model
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

Fields:
- `id`: Unique identifier (MongoDB ObjectId)
- `userId`: Unique identifier for the user
- `notes`: The content of the notes
- `createdAt`: Timestamp of when the note was created
- `updatedAt`: Timestamp of when the note was last updated

## Available Scripts

- `npm run generate`: Generate Prisma Client
- `npm run push`: Push schema changes to the database
- `npm run studio`: Launch Prisma Studio for database visualization

## Usage

1. First, ensure your MongoDB instance is running and accessible
2. Set up your environment variables in `.env`
3. Generate the Prisma client:
   ```bash
   npm run generate
   ```
4. Push the schema to your database:
   ```bash
   npm run push
   ```

## Development

To visualize and manage your database, you can use Prisma Studio:
```bash
npm run studio
```

This will open a web interface where you can view and edit your database records.

## Dependencies

- `@prisma/client`: Prisma's database client
- `prisma`: Prisma ORM development dependencies

## Contributing

When making changes to the database schema:
1. Modify the `schema.prisma` file
2. Run `npm run generate` to update the Prisma client
3. Run `npm run push` to apply changes to the database 