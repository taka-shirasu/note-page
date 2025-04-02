# Note Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

A real-time collaborative note-taking application built with modern web technologies. Note Page allows multiple users to create, edit, and collaborate on notes simultaneously with a beautiful, responsive interface.

## ✨ Features

- **Real-time Collaboration**: Multiple users can edit notes simultaneously
- **Rich Text Editing**: Full-featured editor with markdown support
- **Auto-save**: Changes are automatically saved to the database
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in dark mode support
- **Type Safety**: Full TypeScript support across all packages

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/note-page.git
   cd note-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each package directory
   - Configure database connection and server ports

4. Start development servers:
   ```bash
   # Start database
   cd packages/database
   npm run generate

   # Start server
   cd ../server
   npm run dev

   # Start web app
   cd ../web
   npm run dev
   ```

## 📦 Project Structure

The project is organized into three main packages:

- **Web Application** (`packages/web`): Next.js 14 frontend with real-time editing
- **Server** (`packages/server`): Express.js server with Socket.IO
- **Database** (`packages/database`): MongoDB with Prisma ORM

## 🤝 Contributing

We love contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 Code of Conduct

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TipTap team for the rich text editor
- Socket.IO team for real-time capabilities
- Prisma team for the database ORM

## 📞 Support

- Create an issue for bug reports or feature requests
- Join our [Discord community](https://discord.gg/your-discord) for help and discussion
- Check out our [documentation](https://note-page-docs.vercel.app) for detailed guides 