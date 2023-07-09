import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(
    Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  );

  const saveUser = (user) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user));
  };

  const logoutUser = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

// import { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
