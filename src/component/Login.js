import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import {disableRedirect} from '../redux/register/registerActions'
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
    width: "40%",
    margin: "auto",
    alignItems: "center",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [flash, setFlash] = useState("")

  useEffect(() => {
    props.disableRedirect()
    if(props.location.state)
      setFlash(props.location.state.message)
  },[])



  return (
    <div>
     <Card className={classes.root}> 
     <Collapse in={flash.length>0}>
     
        <Alert
          severity="success"
          
          action={
            <IconButton
              size="small"
              onClick={() => {
                setFlash("");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {flash}
        </Alert>
       
      </Collapse>
        <CardContent>
          <Typography align="center" color="secondary" gutterBottom>
            <FastfoodIcon /> FoodCorner
          </Typography>
          <Divider />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" color="primary" fullWidth>
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
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    disableRedirect:() => {
      dispatch(disableRedirect());
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)