import axios from 'axios'
import {
  ADD_TO_CART,
  CART_LOAD,
  DECREMENT,
  EMPTY_CART,
  INCREMENT,
  REMOVE_FROM_CART,
  SAVE_CART_FAILED,
  SAVE_CART_START,
  SAVE_CART_SUCCESS,
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



export const saveCart = (cart) => {
  return dispatch => {
    dispatch(saveCartStart());
    axios.post('http://localhost:5000/cart', {cart},{withCredentials:true})
    .then(res => dispatch(saveCartSuccess()))
    .catch(err => dispatch(saveCartFailed()))
  }
}

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

const saveCartStart = () =>{
  return {
    type:SAVE_CART_START,
  }
}
const saveCartFailed = () => {
  return {
    type:SAVE_CART_FAILED
  }
}

const saveCartSuccess = () => {
  return {
    type:SAVE_CART_SUCCESS
  }
}



