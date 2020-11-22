import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {logoutUser} from '../redux/login/loginActions'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  navColor: {
    backgroundColor: "#fd2675",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
}));

function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles();

  const handleClick =(e)=>{
   setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }



  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navColor}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <FastfoodIcon /> FoodCorner
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>

          {Object.keys(props.user).length===0?
          (<Button 
          component={Link} 
          to="/login" 
          color="inherit">
            Login
          </Button>):
          (
            <div>
            <Button color="inherit" onClick={handleClick}>
            {props.user.name}
            </Button>
           <Menu
             anchorEl={anchorEl}
             keepMounted
             open={anchorEl!==null}
             onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
        <Button onClick={props.logoutUser} color="inherit">Logout</Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Button color="secondary">Profile</Button>
        </MenuItem>
      </Menu>
      </div>

          )}
          <Button component={Link} to="/cart" color="inherit">
            <Badge badgeContent={props.totalItems} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    totalItems: state.cart.cartItems.reduce(
      (acc, currentItem) => acc + parseInt(currentItem.quantity, 10),
      0
    ),
    user:state.login.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUser : () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
