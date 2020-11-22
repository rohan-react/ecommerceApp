import {
  FILTER_PRODUCTS,
  PRODUCT_LOADING_FAILED,
  PRODUCT_LOADING_STARTED,
  PRODUCT_LOADING_SUCCESS,
  
  SORT_PRODUCTS,
} from "./homeActionTypes";
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from "../cart/cartActionTypes";


const initialState = {
  products: [],
  filters: [],
  criteria: "",
  loading:false,
  error:null
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING_STARTED:
      return{
        ...state,
        loading:true
      }

    case PRODUCT_LOADING_FAILED:
      return{
        ...state,
        loading:false,
        error:action.payload.err
      }
      
    case PRODUCT_LOADING_SUCCESS:
      return {
        ...state,
        loading:false,
        error:null,
        products:[...action.payload.products]
      }

    case ADD_TO_CART:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.product.id
            ? { ...product, inCart: true }
            : product
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, inCart: false, quantity: 1 }
            : product
        ),
      };

      case EMPTY_CART:
        return{
          ...state,
          products:state.products.map(product => (
            {...product, inCart:false}
          ) )
        }

    case FILTER_PRODUCTS:
      return {
        ...state,
        filters: [...action.payload.filters],
      };

    case SORT_PRODUCTS:
      const { criteria } = action.payload;
      return {
        ...state,
        criteria: criteria,
        products: [...state.products].sort((a, b) => {
          if (criteria === "priceHigh")
            return b["price"].slice(1) - a["price"].slice(1);
          else if (criteria === "priceLow")
            return a["price"].slice(1) - b["price"].slice(1);
          else return b[criteria] - a[criteria];
        }),
      };
    default:
      return state;
  }
};
export default homeReducer;
