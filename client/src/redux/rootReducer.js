import { combineReducers } from "redux";
import homeReducer from "./home/homeReducer";
import cartReducer from "./cart/cartReducer";
import registerReducer from './register/registerReducer'
import loginReducer from './login/loginReducer'

const rootReducer = combineReducers({
  home: homeReducer,
  cart: cartReducer,
  register:registerReducer,
  login:loginReducer
});

export default rootReducer;
