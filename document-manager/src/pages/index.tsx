// import React, { useState } from 'react';
// import DocumentUploader from '../components/DocumentUploader'
// import DocumentSearch from '../components/DocumentSearch';
// import DocumentList from '../components/DocumentList';

// const IndexPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private'>('all');
//   const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean>(true); // Example state
//   const [userId, setUserId] = useState<string>('exampleUserId'); // Example state

//   const handleSearchQueryChange = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handlePrivacyFilterChange = (filter: 'all' | 'public' | 'private') => {
//     setPrivacyFilter(filter);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Document Management</h1>
//       <DocumentUploader userId={userId} />
//       <DocumentSearch onSearchQueryChange={handleSearchQueryChange} />
//       {/* Example filter control */}
//       <select onChange={(e) => handlePrivacyFilterChange(e.target.value as 'all' | 'public' | 'private')}>
//         <option value="all">All</option>
//         <option value="public">Public</option>
//         <option value="private">Private</option>
//       </select>
//       <DocumentList
//         userIsAuthenticated={userIsAuthenticated}
//         userId={userId}
//         searchQuery={searchQuery}
//         privacyFilter={privacyFilter} // Provide this prop
//       />
//     </div>
//   );
// };

// export default IndexPage;

// src/pages/index.tsx

// src/pages/index.tsx

import React, { useState } from 'react';
import DocumentUploader from '../components/DocumentUploader';
import DocumentSearch from '../components/DocumentSearch';
import DocumentList from '../components/DocumentList';

const IndexPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private'>('all');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('exampleUserId');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handlePrivacyFilterChange = (filter: 'all' | 'public' | 'private') => {
    if (filter === 'private') {
      const password = prompt('Enter password to view private documents:');
      if (password === 'superuser') { // Replace with actual password check
        setIsPasswordCorrect(true);
      } else {
        setIsPasswordCorrect(false);
        alert('Password is incorrect.');
      }
    } else {
      setIsPasswordCorrect(false);
    }
    setPrivacyFilter(filter);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      <DocumentUploader userId={userId} />
      <DocumentSearch onSearchQueryChange={handleSearchQueryChange} />
      <select onChange={(e) => handlePrivacyFilterChange(e.target.value as 'all' | 'public' | 'private')}>
        <option value="all">All</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <DocumentList
        userIsAuthenticated={userIsAuthenticated}
        userId={userId}
        searchQuery={searchQuery}
        privacyFilter={privacyFilter}
        isPasswordCorrect={isPasswordCorrect}
      />
    </div>
  );
};

export default IndexPage;
