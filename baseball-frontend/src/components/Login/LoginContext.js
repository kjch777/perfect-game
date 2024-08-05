import React, { createContext, useState } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginMember, setLoginMember] = useState(null);

  return (
    <LoginContext.Provider value={{ loginMember, setLoginMember }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;