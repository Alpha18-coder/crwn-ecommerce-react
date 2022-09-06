import { USER_ACTION_TYPES } from "./user.types";

// initialValue
const INITIAL_STATE = {
  currentUser: null
}

// reducer
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: action.payload}
    default:
      return state;
  }
}