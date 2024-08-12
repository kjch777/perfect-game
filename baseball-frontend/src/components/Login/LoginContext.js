import { createContext } from 'react';

const LoginContext = createContext({
  loginMember: null,
  setLoginMember: () => {}
});

export default LoginContext ;