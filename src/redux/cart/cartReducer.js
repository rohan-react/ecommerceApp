import { LOGOUT_SUCCESS } from "../login/loginActionTypes";
import {
  ADD_TO_CART,
  DECREMENT,
  EMPTY_CART,
  INCREMENT,
  REMOVE_FROM_CART,
  SAVE_CART_FAILED,
  SAVE_CART_START,
  SAVE_CART_SUCCESS,
} from "./cartActionTypes";
import {CART_LOAD} from '../home/homeActionTypes'
const initialState = {
  cartItems: [],
  loading:false,

  totalItem: 0,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, {...action.payload.product, inCart:true}],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case INCREMENT:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          action.payload.id === item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREMENT:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          action.payload.id === item.id
            ? { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 }
            : item
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_CART_START:
      return {
        ...state,
        loading:true
      }
     
     case SAVE_CART_SUCCESS:
       return{
         ...state,
         loading:false,
         
       }
     
      case SAVE_CART_FAILED:
        return{
          ...state,
          loading:false,
         
        }
      case LOGOUT_SUCCESS:
        return{
          ...state,
          cartItems:[],
          totalItems:0
        }

        case CART_LOAD:
          return{
            ...state,
            cartItems:[...action.payload.cart]

          }

        

    default:
      return state;
  }
};
export default cartReducer;
