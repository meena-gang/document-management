import React, { createContext, useState, useContext } from 'react';
import { Document } from '../types/document';

interface DocumentContextProps {
  documents: Document[];
  addDocument: (doc: Document) => void;
  searchDocuments: (query: string) => Document[];
  getPublicDocuments: () => Document[];
  getPrivateDocuments: (userId: string) => Document[];
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = (doc: Document) => {
    setDocuments([...documents, doc]);
  };

  const searchDocuments = (query: string) => {
    if (!query) return documents;
    return documents.filter(doc =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getPublicDocuments = () => {
    return documents.filter(doc => doc.privacy === 'public');
  };

  const getPrivateDocuments = (userId: string) => {
    return documents.filter(doc => doc.privacy === 'private' && doc.uploaderId === userId);
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, searchDocuments, getPublicDocuments, getPrivateDocuments }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};
