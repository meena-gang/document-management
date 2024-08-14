// src/components/DocumentItem.tsx
import React from 'react';
import { Document } from '../types/document';

interface DocumentItemProps {
  document: Document;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-semibold">{document.title}</h3>
      <p>{document.description}</p>
      <p>File: {document.file}</p>
      <p>Privacy: {document.privacy}</p>
    </div>
  );
};

export default DocumentItem;
