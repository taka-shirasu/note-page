# Note Page Web Application

This package provides the frontend implementation for the Note Page application using Next.js 14 with App Router.

## Overview

The web application is a modern, real-time note-taking platform built with:
- Next.js 14 with App Router
- React 18
- TipTap for rich text editing
- Socket.IO for real-time synchronization
- TailwindCSS for styling
- Markdown support

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Socket.IO server running (see server package)

## Installation

```bash
npm install
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production application
- `npm start`: Start the production server
- `npm run lint`: Run ESLint for code linting

## Project Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable React components
└── public/        # Static assets
```

## Features

### Rich Text Editor
- Powered by TipTap with extensions for:
  - Blockquotes
  - Bullet lists
  - Code blocks
  - Headings
  - Horizontal rules
  - Ordered lists
  - Placeholder text

### Real-time Synchronization
- Socket.IO client integration
- Automatic content synchronization across clients
- Real-time updates without page refresh

### Markdown Support
- Markdown preview using `@uiw/react-markdown-preview`
- Markdown editor using `@uiw/react-md-editor`
- Sanitized markdown rendering with `rehype-sanitize`

### Styling
- TailwindCSS for utility-first styling
- Typography plugin for markdown content
- Dark mode support
- Custom font configuration (Inter)

## Dependencies

### Main Dependencies
- `next`: Next.js framework
- `react`: React library
- `@tiptap/*`: Rich text editor components
- `socket.io-client`: Real-time communication
- `@uiw/react-markdown-preview`: Markdown preview
- `@uiw/react-md-editor`: Markdown editor
- `tailwindcss`: Utility-first CSS framework

### Development Dependencies
- `typescript`: TypeScript compiler
- `eslint`: Code linting
- `postcss`: CSS processing
- `autoprefixer`: CSS vendor prefixing
- Various TypeScript type definitions

## Configuration

### TailwindCSS
The application uses TailwindCSS with custom configuration for:
- Typography styling
- Dark mode support
- Custom font family
- Responsive design

### Next.js
- App Router enabled
- TypeScript support
- ESLint integration
- Custom font optimization

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The application will be available at:
   - http://localhost:3000

3. Development features:
   - Hot module replacement
   - TypeScript type checking
   - ESLint code validation
   - TailwindCSS JIT compilation

## Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

When making changes to the web application:
1. Follow the existing code style
2. Ensure TypeScript types are properly defined
3. Test the real-time synchronization
4. Verify markdown rendering
5. Check responsive design
6. Run the linter before committing
