import React from "react";
import { connect } from "react-redux";
import {
  increment,
  decrement,
  removeFromCart,
  emptyCart,
} from "../redux/cart/cartActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
  },
  img: {
    padding: "0.5rem",
    width: "100%",
    display: "block",
  },
}));

function Cart(props) {
  console.log(props.cartItems);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="center">
        Your Cart
      </Typography>
      {props.cartItems.length === 0 ? (
        <Typography variant="body1" align="center" gutterBottom>
          is Empty
        </Typography>
      ) : (
        <div>
          <Grid direction="column" container spacing={1}>
            {props.cartItems.map((img) => (
              <Grid container key={img.id} spacing={3} alignItems="center">
                <Grid item xs={2} md={3}></Grid>
                <Grid item xs={3} md={2}>
                  <img className={classes.img} src={img.url} alt="" />
                </Grid>
                <Grid item xs={3} md={3}>
                  <Typography variant="body2" component="h6">
                    {img.title}
                  </Typography>
                  <Typography variant="body2" color="secondary" component="h6">
                    {img.price}
                  </Typography>
                  <Button
                    onClick={() => props.removeFromCart(img.id)}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    remove
                  </Button>
                </Grid>
                <Grid item xs={2} align="center">
                  <IconButton onClick={() => props.increment(img.id)}>
                    <ArrowDropUpIcon />
                  </IconButton>
                  <Typography variant="body2" component="h6">
                    {img.quantity}
                  </Typography>
                  <IconButton onClick={() => props.decrement(img.id)}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Container align="center">
            <Typography>Total Items:{props.totalItems} </Typography>
            <Typography>Total: ${props.totalPrice.toFixed(2)}</Typography>

            <Button variant="outlined" color="secondary" size="small">
              Buy Now
            </Button>
            <Button onClick={props.emptyCart} color="primary" size="small">
              Empty Cart
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    totalItems: state.cart.cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),
    totalPrice: state.cart.cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price.slice(1)) * item.quantity,
      0
    ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (id) => {
      dispatch(increment(id));
    },
    decrement: (id) => {
      dispatch(decrement(id));
    },
    removeFromCart: (id) => {
      dispatch(removeFromCart(id));
    },
    emptyCart: () => {
      dispatch(emptyCart());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
