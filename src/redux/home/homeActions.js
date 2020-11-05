import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SORT_PRODUCTS,
} from "./homeActionTypes";

export const loadProducts = (productList) => {
  return {
    type: LOAD_PRODUCTS,
    payLoad: {
      productList,
    },
  };
};
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
