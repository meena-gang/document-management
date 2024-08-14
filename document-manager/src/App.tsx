// src/App.tsx

import React, { useState } from 'react';
import DocumentUploader from './components/DocumentUploader';
import DocumentSearch from './components/DocumentSearch';
import DocumentList from './components/DocumentList';
import FilterComponent from './components/FilterComponent';
import { DocumentProvider } from './context/DocumentContext';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [privacyFilter, setPrivacyFilter] = useState<'public' | 'private' | 'all'>('public');
  const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('user123');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: 'public' | 'private' | 'all') => {
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
    <DocumentProvider>
        <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      <div className="App">
        <DocumentUploader userId={userId} />
        {/* <DocumentSearch onSearchQueryChange={handleSearchQueryChange} /> */}
        <FilterComponent onChange={handleFilterChange} />
        <DocumentList
          userIsAuthenticated={userIsAuthenticated}
          userId={userId}
          searchQuery={searchQuery}
          privacyFilter={privacyFilter}
          isPasswordCorrect={isPasswordCorrect}
        />
      </div>
    </DocumentProvider>
  );
};

export default App;

// import React, { useState } from 'react';
// import DocumentUploader from './components/DocumentUploader';
// import DocumentSearch from './components/DocumentSearch';
// import DocumentList from './components/DocumentList';
// import FilterComponent from './components/FilterComponent';
// import { DocumentProvider } from './context/DocumentContext';

// const App: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [privacyFilter, setPrivacyFilter] = useState<'public' | 'private' | 'all'>('public');
//   const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean>(true);
//   const [userId, setUserId] = useState<string>('user123');
//   const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false);

//   const handleSearchQueryChange = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleFilterChange = (filter: 'public' | 'private' | 'all') => {
//     setPrivacyFilter(filter);

//     if (filter === 'private') {
//       const password = prompt('Enter password to view private documents:');
//       if (password === 'superuser') { // Replace with actual password check
//         setIsPasswordCorrect(true);
//       } else {
//         setIsPasswordCorrect(false);
//         alert('Password is incorrect.');
//       }
//     } else {
//       setIsPasswordCorrect(false);
//     }
//   };

//   return (
//     <DocumentProvider>
//       <div className="App">
//         <DocumentUploader userId={userId} />
//         <DocumentSearch onSearchQueryChange={handleSearchQueryChange} />
//         <FilterComponent onChange={handleFilterChange} />
//         <DocumentList
//           userIsAuthenticated={userIsAuthenticated}
//           userId={userId}
//           searchQuery={searchQuery}
//           privacyFilter={privacyFilter}
//           isPasswordCorrect={isPasswordCorrect} // Ensure this is provided
//         />
//       </div>
//     </DocumentProvider>
//   );
// };

// export default App;
