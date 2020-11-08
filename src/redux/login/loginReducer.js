
const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } = require("./loginActionTypes")


const initialState = {
    loading:false,

}

const loginReducer = (state=initialState, action)=>{

    switch(action.type) {
    case LOGIN_START:
        return {
            ...state,
            loading:true
        }
     case LOGIN_SUCCESS:
         return {
             ...state,
             loading:false
         }
    case LOGIN_FAILED:
             return {
                 ...state,
                 loading:false
             }
    default : return state;


}
}

export default loginReducer;