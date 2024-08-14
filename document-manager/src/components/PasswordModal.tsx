import React, { useState } from 'react';

// interface PasswordModalProps {
//   onPasswordSubmit: (password: string) => void;
// }

// const PasswordModal: React.FC<PasswordModalProps> = ({ onPasswordSubmit }) => {
//   const [password, setPassword] = useState<string>('superuser');

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     onPasswordSubmit(password);
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Enter Password to see Private Files</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };
const PasswordModal: React.FC<{ onSubmit: (password: string) => void, onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(password);
    onClose();
  };

  return (
    <div className="modal">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PasswordModal;

