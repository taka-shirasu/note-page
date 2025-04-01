'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const MarkdownEditor = () => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <div className="w-full h-screen p-4" data-color-mode="light">
      <div className="container mx-auto h-full">
        <MDEditor
          value={value}
          onChange={setValue}
          height="100%"
          preview="edit"
          hideToolbar={false}
          className="!bg-white"
        />
      </div>
    </div>
  );
};

export default MarkdownEditor; 