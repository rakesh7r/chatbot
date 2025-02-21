// components/MarkdownPreview.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="bg-transparent">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
