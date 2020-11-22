import React, {useState} from "react";
import {connect} from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import {closeFlash, loginUser} from '../redux/login/loginActions'
import Grid from "@material-ui/core/Grid";



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
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
   
    margin: "auto",
    alignItems: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  }
}));

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if(email===''|| password==='' )
     setError("All fields are compulsory")
    else if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
     setError("enter a valid email ")
    else if(password.length<2)
     setError("Password must be atleast 8 characters long")
     else {
       setError("")
       props.loginUser({email,password})
     }
    

   }



  return props.redirectToHome?
  <Redirect to={{
    pathname:"/",
    state:{user:props.user}
  }}/> :
  (
    <div>
    <Backdrop className={classes.backdrop}  open={props.loading} >
        <CircularProgress color="secondary" />
      </Backdrop>


      <Grid container >
      <Grid item xs={2}  md={4}></Grid>

      <Grid item xs={8}  md={4}>
     <Card className={classes.root}> 
     <Collapse in={error.length>0}>
        <Alert
          severity="error" 
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
     <Collapse in={props.message.length>0}>
        <Alert
          severity="error" 
          action={
            <IconButton
              size="small"
              onClick={() => {
                props.closeFlash()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.message}
        </Alert>
      </Collapse>
        <CardContent onClick={props.closeFlash}>
          <Typography align="center" color="secondary" gutterBottom>
            <FastfoodIcon /> FoodCorner
          </Typography>
          <Divider />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button 
          variant="contained" 
          size="small" 
          color="primary" 
          onClick={handleLogin}
          fullWidth>
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="small"
            color="secondary"
            fullWidth
          >
            Register
          </Button>
        </CardActions>
      </Card>
      </Grid>
        <Grid item xs={2}  md={4}></Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = state => {
  const {message, loading, redirectToHome, user} = state.login
  return {
    message,
    loading,
    redirectToHome,
    user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeFlash:()=>{
      dispatch(closeFlash());
    },
    loginUser: (user) => {
      dispatch(loginUser(user))
    },
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)