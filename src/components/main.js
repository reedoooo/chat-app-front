// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import ChatRoom from './ChatRoom/ChatRoom.js';

// const Main = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Assuming you have an `auth` reducer with `isAuthenticated` property. Modify according to your actual state structure.
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/auth');
//     } else {
//       navigate('/rooms');
//     }
//   }, [isAuthenticated, navigate]);

//   return isAuthenticated ? <ChatRoom /> : null;
// };

// export default Main;
