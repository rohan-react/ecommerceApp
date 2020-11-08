import {REG_FAILED, REG_SUCCESS, REG_START, CLOSE_ALERT, DISABLE_REDIRECT} from '../register/registerActionTypes'

const initialState = {
    loading:false,
    message:"",
    redirectToLogin:false
}

const registerReducer = (state = initialState, action) => {
    switch(action.type){
      case REG_START: 
      return {
          ...state,
          loading:true,
          message:""
      }
      case REG_SUCCESS:
          return {
              ...state,
              loading:false,
              message:action.payload.message,
              redirectToLogin:true
          }
      case REG_FAILED:{
          return {
              ...state,
              loading:false,
              message:action.payload.message,
              redirectToLogin:false
          }
      }
      case CLOSE_ALERT:{
          return {
              ...state,
              message:""
          }
      }
      case DISABLE_REDIRECT:{
          return {
              ...state,
              redirectToLogin:false,
              message:""
          }
      }

      default: return state;
    }
    
     
}

export default registerReducer