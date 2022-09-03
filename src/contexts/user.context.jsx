import { createContext, useEffect, useReducer } from 'react';
import createAction from '../utils/reducer/reducer.utils';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// actions
const USER_ACTION_TYPES = { SET_CURRENT_USER: 'SET_CURRENT_USER' }

// reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: action.payload}
    default:
      throw new Error(`Unhandled type ${action.type} in UserReducer`);
  }
}

// initialValue
const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  const[ {currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // dispatch
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }
  
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
