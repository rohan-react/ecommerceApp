import {
  ADD_TO_CART,
  DECREMENT,
  EMPTY_CART,
  INCREMENT,
  REMOVE_FROM_CART,
} from "./cartActionTypes";
const initialState = {
  cartItems: [],
  totalItem: 0,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.product],
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
    default:
      return state;
  }
};
export default cartReducer;
