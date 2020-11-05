import {
  ADD_TO_CART,
  DECREMENT,
  EMPTY_CART,
  INCREMENT,
  REMOVE_FROM_CART,
} from "./cartActionTypes";
export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
    },
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id,
    },
  };
};

export const increment = (id) => {
  return {
    type: INCREMENT,
    payload: {
      id,
    },
  };
};

export const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: {
      id,
    },
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
