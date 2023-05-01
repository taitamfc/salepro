import { createStore } from "redux";
import rootReducer from "./reducer";
// Khai báo store
const store = createStore(rootReducer);
export default store;