# Note Page

A real-time collaborative note-taking application built with modern web technologies.

## Overview

Note Page is a full-stack application that enables users to create, edit, and collaborate on notes in real-time. The application features a rich text editor with markdown support, real-time synchronization across multiple clients, and a modern, responsive user interface.

## Project Structure

The project is organized into three main packages:

### 1. Web Application (`packages/web`)
- Next.js 14 frontend application
- Real-time note editing with TipTap
- Markdown support
- Modern UI with TailwindCSS
- Socket.IO client for real-time updates

### 2. Server (`packages/server`)
- Express.js server with Socket.IO
- Real-time communication handling
- Client connection management
- Database integration

### 3. Database (`packages/database`)
- MongoDB database with Prisma ORM
- Note data model and schema
- Database operations and queries

## Features

- **Real-time Collaboration**: Multiple users can edit notes simultaneously
- **Rich Text Editing**: Full-featured editor with formatting options
- **Markdown Support**: Write and preview markdown content
- **Auto-save**: Changes are automatically saved to the database
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in dark mode support
- **Type Safety**: Full TypeScript support across all packages

## Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn package manager

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/note-page.git
   cd note-page
   ```

2. Install dependencies for all packages:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in each package directory
   - Configure database connection and server ports

4. Start the development servers:

   Database (if needed):
   ```bash
   cd packages/database
   npm run generate
   ```

   Server:
   ```bash
   cd packages/server
   npm run dev
   ```

   Web Application:
   ```bash
   cd packages/web
   npm run dev
   ```

5. Access the application:
   - Web UI: http://localhost:3000
   - Server: http://localhost:3001

## Development

Each package has its own development workflow:

- **Web**: Hot module replacement, TypeScript checking
- **Server**: Real-time debugging, connection monitoring
- **Database**: Schema management, data migration

## Production Deployment

1. Build all packages:
   ```bash
   # Build web application
   cd packages/web
   npm run build

   # Build server
   cd ../server
   npm run build
   ```

2. Start production servers:
   ```bash
   # Start server
   cd packages/server
   npm start

   # Start web application
   cd ../web
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- TipTap team for the rich text editor
- Socket.IO team for real-time capabilities
- Prisma team for the database ORM 