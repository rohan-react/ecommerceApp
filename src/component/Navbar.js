import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import FastfoodIcon from "@material-ui/icons/Fastfood";

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
  const classes = useStyles();

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

          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
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
  };
};
export default connect(mapStateToProps)(Navbar);
