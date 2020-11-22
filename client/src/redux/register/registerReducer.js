import {REG_FAILED, REG_SUCCESS, REG_START, CLOSE_ALERT, } from './registerActionTypes'

const initialState = {
    loading:false,
    message:{
        error:false,
        info:"" 
    },
    redirectToLogin:false
}

const registerReducer = (state = initialState, action) => {
    switch(action.type){
      case REG_START: 
      return {
          ...state,
          loading:true,
          message:{...state.message, error:false, info:""}
      }
      case REG_SUCCESS:
          return {
              ...state,
              loading:false,
              message:{...action.payload.message},
              redirectToLogin:true
          }
      case REG_FAILED:{
          return {
              ...state,
              loading:false,
              message:{...action.payload.message},
              redirectToLogin:false
          }
      }
      case CLOSE_ALERT:{
          return {
              ...state,
              message:{...state.message,error:false,info:""}
          }
      }  

      default: return state;
    }
    
     
}

export default registerReducer