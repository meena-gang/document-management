// src/index.tsx
import React from 'react';
import App from './App'; // Import the App component
import './index.css'; // Import global styles if needed
// import { createRoot } from 'react-dom/client'; 
import ReactDOM from 'react-dom/client';



let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
