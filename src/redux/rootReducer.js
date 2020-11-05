import { combineReducers } from "redux";
import homeReducer from "./home/homeReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
  home: homeReducer,
  cart: cartReducer,
});

export default rootReducer;
