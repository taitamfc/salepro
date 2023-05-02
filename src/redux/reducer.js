import { SET_WAREHOUSE_ID,SET_FILTER_HOME } from "./action";

// khởi tạo giá trị mặc định cho state gốc.
const initialState = {
  warehouse_id: 0,
  filter_home: {},
};


// Khởi tạo reducer
const rootReducer = (state = initialState, action) => {
    // Handle các actions gửi lên
    switch (action.type) {
      case SET_WAREHOUSE_ID:
        return { ...state, warehouse_id: action.payload };
        break;
      case SET_FILTER_HOME:
        return { ...state, filter_home: action.payload };
        break;
      default:
        return state;
    }
};
export default rootReducer;