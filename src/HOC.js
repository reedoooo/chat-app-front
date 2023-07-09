// import Cookies from 'js-cookie';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';

// export default function withAuthRedirect(Component) {
//   return function AuthenticatedComponent(props) {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { user } = useSelector((state) => state.auth); // assumes your auth reducer is named 'auth'

//     useEffect(() => {
//       // Redirection based on authentication state should only happen once
//       // when the component is mounted.
//       if (!user && !Cookies.get('token') && location.pathname !== '/login') {
//         // The user is not authenticated
//         // Redirect the user to the login page.
//         navigate('/login');
//       } else if (
//         user &&
//         Cookies.get('token') &&
//         location.pathname !== '/rooms'
//       ) {
//         // The user is authenticated
//         // Redirect the user to the /rooms page.
//         navigate('/rooms');
//       }
//     }, []); // Empty dependency array to ensure this runs only on component mount

//     return <Component {...props} />;
//   };
// }
