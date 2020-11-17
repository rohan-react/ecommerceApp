import axios from "axios";
import {
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
    const loadProducts = axios.get("http://localhost:5000/api/products");
    const loadPersistedUser = axios.get("http://localhost:5000/",{withCredentials:true})

    axios.all([loadProducts, loadPersistedUser])
    .then(responses => {
      const response1 = responses[0].data;
      const response2 = responses[1].data;
      

       dispatch(productLoadingSuccess(response1));
       dispatch(persistedUser(response2))
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


