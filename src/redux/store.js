import { createStore } from "redux";
// Khai bao actions
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const FETCH_USER = "FETCH_USER";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";


// Khai báo reducer với giá trị mặc định state là initialState
const initialState = {
    users: [],
    userlogined: {}
};
const rootReducer = (state = initialState, action) => {
    // Handle các actions gửi lên
    switch (action.type) {
      case LOGIN_SUCCESS:
        return { ...state, userlogined: action.payload };
      case FETCH_USER_SUCCESS:
        return { ...state, users: action.payload };
      default:
        return state;
    }
  };

// Khai báo store
const store = createStore(rootReducer);

export default store;