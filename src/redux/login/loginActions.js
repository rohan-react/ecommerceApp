const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, DISABLE_REDIRECT } = require("./loginActionTypes")
import axios from 'axios'

const loginStart = ()=>{
    return {
        type:LOGIN_START
    }
}

const loginSuccess = (user) => {
    return {
        type:LOGIN_SUCCESS,
        payload:{
            user
        }
    }
}

const loginFailed = (message) => {
    return{
        type:LOGIN_FAILED,
        payload:{
            message,
        }
    }
}

export const login = (user) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post("http://localhost:5000/user/login",user)
        .then(res => dispatch(loginSuccess(res)) )
        .catch(err => dispatch(loginFailed(err)))
    }
}

