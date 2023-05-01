import { SET_WAREHOUSE_ID } from "./action";

// khởi tạo giá trị mặc định cho state gốc.
const initialState = {
  warehouse_id: 0
};


// Khởi tạo reducer
const rootReducer = (state = initialState, action) => {
    // Handle các actions gửi lên
    switch (action.type) {
      case SET_WAREHOUSE_ID:
        return { ...state, warehouse_id: action.payload };
      default:
        return state;
    }
};
export default rootReducer;