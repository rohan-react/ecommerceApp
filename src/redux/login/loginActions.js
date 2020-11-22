import axios from 'axios'
const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, DISABLE_HOME_REDIRECT, CLOSE_FLASH, LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAILED } = require("./loginActionTypes")

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

export const loginUser = (user) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post("/user/login",user,{withCredentials:true})
        .then(res => {
           
            dispatch(loginSuccess(res.data))} )
        .catch(err => dispatch(loginFailed(err.response.data)))
    }
}
export const closeFlash = () => {
    return {
     type:CLOSE_FLASH
    }
    
}

export const disableHomeRedirect = () => {
    return {
        type:DISABLE_HOME_REDIRECT
    }
}

export const logoutUser = () =>{
     return dispatch => {
         dispatch(logoutStart());
       
              axios.get('/user/logout',{withCredentials:true})
         .then(res => dispatch(logoutSuccess()))
         .catch(err => dispatch(logoutFailed()))
         
        
     }
}

export const logoutStart = () => {
    return {
        type:LOGOUT_START,
        
    }
}
export const logoutSuccess = () => {
    return {
        type:LOGOUT_SUCCESS,

    }
}
export const logoutFailed = () => {
    return {
        type:LOGOUT_FAILED,

    }
}
