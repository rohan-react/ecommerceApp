import axios from "axios";
import {
  FILTER_PRODUCTS,
  LOADING_FAILED,
  LOADING_STARTED,
  LOADING_SUCCESS,
  SORT_PRODUCTS,

} from "./homeActionTypes";

export const loadProducts = () => {
  return dispatch => {
    dispatch(loadingStarted());
  axios.get("http://localhost:5000/api/products")
  .then(res => {
   
    dispatch(loadingSuccess(res.data))
  })
  .catch(err =>{
    dispatch(loadingFailed(err))
  })

  }
}

const loadingStarted = () => {
  return {
    type: LOADING_STARTED,
  };
};

const loadingFailed = (err) => {
  return {
    type: LOADING_FAILED,
    payload:err
  }
}

const loadingSuccess = (products) => {
  return {
    type:LOADING_SUCCESS,
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
