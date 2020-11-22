import axios from "axios";
import {
  CART_LOAD,
  FILTER_PRODUCTS,
  PERSISTED_USER,
  PRODUCT_LOADING_FAILED,
  PRODUCT_LOADING_STARTED,
  PRODUCT_LOADING_SUCCESS,
  SORT_PRODUCTS,

} from "./homeActionTypes";

export const loadMainPage = () => {
  return dispatch => {
    dispatch(productLoadingStarted());
    const loadProducts = axios.get("/api/products");
    const loadPersistedUser = axios.get("/home",{withCredentials:true})

    axios.all([loadProducts, loadPersistedUser])
    .then(responses => {
      console.log(responses)
      const products = responses[0].data;
      const user = responses[1].data.user;
      const cart = responses[1].data.cart;
      
      

       dispatch(productLoadingSuccess(products));
       dispatch(persistedUser(user))
       dispatch(cartLoad(cart))
    })
  .catch(err =>{
    dispatch(productLoadingFailed(err))
  })

  }
}

const productLoadingStarted = () => {
  return {
    type: PRODUCT_LOADING_STARTED,
  };
};

const productLoadingFailed = (err) => {
  return {
    type: PRODUCT_LOADING_FAILED,
    payload:err
  }
}

const productLoadingSuccess = (products) => {
  return {
    type:PRODUCT_LOADING_SUCCESS,
    payload:{
      products
    }
  }
}

export const filterProducts = (filters) => {
  return {
    type: FILTER_PRODUCTS,
    payload: {
      filters,
    },
  };
};
export const sortProducts = (criteria) => {
  return {
    type: SORT_PRODUCTS,
    payload: {
      criteria,
    },
  };
};

export const persistedUser = (user) => {
  return {
    type:PERSISTED_USER,
    payload:{
      user
    }
  }
}

const cartLoad = (cart) => {
  return{
    type:CART_LOAD,
    payload:{
      cart
    }
  }
}



