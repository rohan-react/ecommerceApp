import React, {useState} from "react";
import {registerUser, closeAlert} from '../redux/register/registerActions'
import {connect} from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Alert from "@material-ui/lab/Alert";
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
    width: "50%",
    margin: "auto",
  },
}));

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState("")

  const classes = useStyles();




  const handleRegister = () => {
    if(name===''|| email===''|| password===''|| password2==='')
     setError("All fields are compulsory")
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
     setError("enter a valid email ")
    else if(password !== password2)
     setError("Passwords should match")
    else if(password.length<2)
     setError("Password must be atleast 8 characters long")
     else {
       props.registerUser({name,email,password})
     }
    

   }

   const handleClose =() => {

    console.log(props.message)
    props.closeAlert()
   }

   return props.loading?"registering":
    <div> 
      <Card className={classes.root}>
        <CardContent>
          <Typography align="center" color="secondary" gutterBottom>
            <FastfoodIcon /> FoodCorner
          </Typography>
          <Divider />

        <Collapse in={error.length>0}>
        <Alert
          severity="error"
          variant="outlined"
          action={
            <IconButton
              size="small"
              onClick={() => {
                setError("");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Collapse>

        <Collapse in={props.message.info.length>0}>
        <Alert
          severity={props.message.error?"error":"success"}
          variant="outlined"
          action={
            <IconButton
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.message.info}
        </Alert>
      </Collapse>

       
       <TextField  
            value={name}
            onChange={(e)=>setName(e.target.value)}
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
       
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
             required
          />
          <TextField
         
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            label="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required  
          />
         
          <TextField
        
            value={password2}
            onChange={(e)=>setPassword2(e.target.value)}
            label="Confirm Password"
            fullWidth
            margin="normal"
            variant="outlined"
             required
          />
        </CardContent>
        <CardActions align="center">
          <Button variant="contained" size="small" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="small"
            color="secondary"
            fullWidth
            
          >
            login
          </Button>
        </CardActions>
      </Card>
    </div>
  
}
const mapStateToProps = state => {
  const {loading, message, redirectToLogin} = state.register
  return {
    loading,
    message,
    redirectToLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser : (user) => {
      dispatch(registerUser(user))
    },
    closeAlert: () => {
      dispatch(closeAlert())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)