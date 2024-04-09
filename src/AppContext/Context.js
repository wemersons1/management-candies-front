import { createContext } from 'react';

const AppContext = createContext({
    user: null,
    token: null,
    sign: () => {},
    signOut: () => {}
});

export default AppContext;