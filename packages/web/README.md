# Note Page Web Application

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Frontend implementation using Next.js 14 with App Router.

## 🚀 Features

- Next.js 14 with App Router
- React 18 with hooks
- TipTap rich text editor
- Socket.IO real-time sync
- TailwindCSS styling
- Markdown support
- Dark mode
- Responsive design

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copy `.env.example` to `.env`:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:3001
   ```

2. Update the values according to your environment

## 🛠️ Scripts

- `npm run dev`: Start development server
- `npm run build`: Build production app
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm test`: Run tests

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router
│   ├── layout.tsx # Root layout
│   └── page.tsx   # Home page
├── components/    # React components
│   ├── Editor/    # Editor components
│   └── UI/        # UI components
└── public/        # Static assets
```

## 🎨 Styling

The application uses TailwindCSS with custom configuration:
- Typography plugin for markdown content
- Dark mode support
- Custom font family (Inter)
- Responsive design utilities

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Documentation

### Components

#### Editor
- `NotionEditor`: Main editor component
- `Toolbar`: Editor toolbar
- `MarkdownPreview`: Markdown preview component

#### UI
- `ThemeToggle`: Dark/light mode toggle
- `Button`: Reusable button component
- `Input`: Form input component

## 🔒 Security

- Environment variables are properly managed
- Input validation for all forms
- XSS protection
- CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Dependencies

- `next`: Next.js framework
- `react`: React library
- `@tiptap/*`: Rich text editor
- `socket.io-client`: Real-time communication
- `@uiw/react-markdown-preview`: Markdown preview
- `@uiw/react-md-editor`: Markdown editor
- `tailwindcss`: CSS framework
