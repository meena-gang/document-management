// src/components/DocumentList.tsx

import React, { useState, useEffect } from 'react';
import { Document } from '../types/document'; // Ensure this path is correct

interface DocumentListProps {
  userIsAuthenticated: boolean;
  userId: string;
  searchQuery: string;
  privacyFilter: 'all' | 'public' | 'private';
  isPasswordCorrect: boolean; // Add this prop to handle password correctness
}

const DocumentList: React.FC<DocumentListProps> = ({
  userIsAuthenticated,
  userId,
  searchQuery,
  privacyFilter,
  isPasswordCorrect
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [paginatedDocuments, setPaginatedDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:5000/documents');
        const data: Document[] = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const filteredDocuments = documents
      .filter(doc => {
        // Ensure doc.title is defined and is a string
        const title = doc.title || '';
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
        const isPublicOrAuthorized = doc.privacy === 'public' || 
          (doc.privacy === 'private' && userIsAuthenticated && doc.uploaderId === userId && isPasswordCorrect);
        const matchesPrivacyFilter = privacyFilter === 'all' || doc.privacy === privacyFilter;
        return matchesSearch && isPublicOrAuthorized && matchesPrivacyFilter;
      });

    setPaginatedDocuments(filteredDocuments);
  }, [documents, searchQuery, privacyFilter, userIsAuthenticated, userId, isPasswordCorrect]);

  return (
    <div className='docListTable'>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Privacy</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDocuments.length > 0 ? (
            paginatedDocuments.map(doc => (
              <tr key={doc.id}>
                <td className="border border-gray-300 px-4 py-2">{doc.title}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.description}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.privacy}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center">No documents available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;


// import React from 'react';
// import { Document } from '../types/document'; // Adjust path as needed

// interface DocumentListProps {
//   userIsAuthenticated: boolean;
//   userId: string;
//   searchQuery: string;
//   privacyFilter: 'public' | 'private' | 'all';
//   isPasswordCorrect: boolean;
// }

// const DocumentList: React.FC<DocumentListProps> = ({
//   userIsAuthenticated,
//   userId,
//   searchQuery,
//   privacyFilter,
//   isPasswordCorrect
// }) => {
//   const [documents, setDocuments] = React.useState<Document[]>([]);
//   const [paginatedDocuments, setPaginatedDocuments] = React.useState<Document[]>([]);

//   React.useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/documents');
//         const data: Document[] = await response.json();
//         setDocuments(data);
//       } catch (error) {
//         console.error('Error fetching documents:', error);
//       }
//     };

//     fetchDocuments();
//   }, []);

//   React.useEffect(() => {
//     const filteredDocuments = documents.filter(doc => {
//       const title = doc.title || '';
//       const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
//       const isPublicOrAuthorized = doc.privacy === 'public' || 
//         (doc.privacy === 'private' && userIsAuthenticated && doc.uploaderId === userId);
//       const matchesPrivacyFilter = privacyFilter === 'all' || doc.privacy === privacyFilter;

//       return matchesSearch && isPublicOrAuthorized && matchesPrivacyFilter;
//     });

//     setPaginatedDocuments(filteredDocuments);
//   }, [documents, searchQuery, privacyFilter, userIsAuthenticated, userId]);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Privacy</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedDocuments.map(doc => (
//             <tr key={doc.id}>
//               <td>{doc.title}</td>
//               <td>{doc.description}</td>
//               <td>{doc.privacy}</td>
//             </tr>
//           ))}
//           {paginatedDocuments.length === 0 && (
//             <tr>
//               <td colSpan={3}>No documents available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DocumentList;
