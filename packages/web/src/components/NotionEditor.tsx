'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const NotionEditor = () => {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Handle userId initialization on client side
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserId) {
      console.log('Client: Retrieved existing User ID from localStorage:', storedUserId);
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      console.log('Client: Generated new User ID:', newUserId);
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // Skip socket initialization if userId is not set yet
    
    console.log('Client: Component mounted with User ID:', userId);
    
    // Initialize socket connection
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
    const newSocket = io(serverUrl, {
      path: '/socket.io/',
      auth: { userId },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    // Add connection event listeners with more detailed logging
    newSocket.on('connect', () => {
      console.log('Client: Connected to server with ID:', newSocket.id);
      console.log('Client: User ID:', userId);
      console.log('Client: Transport:', newSocket.io.engine.transport.name);
      console.log('Client: Server URL:', serverUrl);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Client: Connection error:', error);
      console.log('Client: Attempted connection with User ID:', userId);
      console.log('Client: Attempted connection to URL:', serverUrl);
      console.log('Client: Transport:', newSocket.io.engine?.transport?.name);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Client: Disconnected from server:', reason);
      console.log('Client: Disconnected User ID:', userId);
    });

    // Listen for content updates from server
    newSocket.on('content', (serverContent: string) => {
      console.log('Client: Received content update from server');
      console.log('Client: User ID receiving update:', userId);
      setContent(serverContent);
      // Update editor content if it exists
      if (editor) {
        editor.commands.setContent(serverContent);
      }
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log('Client: Component unmounting, User ID:', userId);
      newSocket.close();
    };
  }, [userId]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Input (Raw Text):', editor.getText());
      console.log('Output (HTML):', html);
      console.log('Client: User ID making update:', userId);
      setContent(html);
      
      // Emit content changes to server
      if (socket) {
        socket.emit('message', { content: html });
      }
    },
  });

  return (
    <div className="w-full h-full">
      <div className="w-full pl-8 pt-8">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NotionEditor;