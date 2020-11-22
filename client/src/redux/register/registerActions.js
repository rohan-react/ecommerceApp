import {REG_FAILED, REG_SUCCESS, REG_START,CLOSE_ALERT, } from './registerActionTypes'
import axios from "axios"

const regFailed = (message) => {
    return{
    type:REG_FAILED,
    payload:{
        message
    }
    }
}

const regSuccess = (message)=>{
    return{
        type:REG_SUCCESS,
        payload:{
            message
        }
    }
}

const regStart = () => {
    return {
        type:REG_START
    }
}

export const registerUser = (user)=>{
    return dispatch => {
        dispatch(regStart());
        axios.post('/user/register',user)
        .then(res =>dispatch(regSuccess(res.data)))
        .catch(err => {
            dispatch(regFailed(err.response.data))})
    }
}

export const closeAlert = () => {
  return{
      type:CLOSE_ALERT
  }
}


