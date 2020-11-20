import { PERSISTED_USER } from "../home/homeActionTypes"

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, CLOSE_FLASH,DISABLE_HOME_REDIRECT, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT_START } = require("./loginActionTypes")


const initialState = {
    loading:false,
    message:"",
    user:{},
    redirectToHome:false

}

const loginReducer = (state=initialState, action)=>{

    switch(action.type) {
    case LOGIN_START:
        return {
            ...state,
            loading:true,
            message:""
        }
     case LOGIN_SUCCESS:
         return {
             ...state,
             loading:false,
             redirectToHome:true,
             user:{...action.payload.user}
         }
    case LOGIN_FAILED:
             return {
                 ...state,
                 loading:false,
                 redirectToHome:false,
                 message:action.payload.message
             }
    case CLOSE_FLASH:
        return {
            ...state,
            message:""
        }
    case DISABLE_HOME_REDIRECT:
        return{
            ...state,
            redirectToHome:false,
            message:""
        }
    case PERSISTED_USER:
        return{
            ...state,
            user:{...action.payload.user}
        }

        case LOGOUT_START:
            return {
                ...state,
                loading:true
            }

       case LOGOUT_SUCCESS:
           return{
                ...state,
                loading:false,
                 user:{}
                }

    case LOGOUT_FAILED:
        return{
            ...state,
            loading:false,

        }


    default : return state;


}
}

export default loginReducer;