import React, {useEffect} from "react";
import { connect } from "react-redux";
import {
  increment,
  decrement,
  removeFromCart,
  emptyCart,
  saveCart,
  loadCart
} from "../redux/cart/cartActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from '@material-ui/core/ButtonGroup'

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
  },
  img: {
    width: "100%",
    display: "block",
  },
  grid:{
    backgroundColor:"#f1f1f1",
    padding:"1rem"
    
  },
 
  
}));

function Cart(props) {
  
  const classes = useStyles();
  
  const handleEmptyCart = () => {
    props.emptyCart()
    if(Object.keys(props.user).length>0)
     props.saveCart([]);
   
  }

  const handleRemoveFromCart = (id) => {
    if(props.totalItems===1 && Object.keys(props.user).length>0 ){
      props.saveCart([]);
    }
    props.removeFromCart(id)
  }

  return (
    <div className={classes.root}>
      {props.cartItems.length === 0 ? (
        <Typography variant="h6" align="center" gutterBottom>
         Your Cart is Empty
        </Typography>
      ) : (
        <div>
        <Container maxWidth={false}>
          {/* main container */}
          <Grid  container >

         
          <Grid item xs={7} md={9} >
            {props.cartItems.map((img) => (
              <Grid container key={img.id}  alignItems="center" className={classes.grid}>
                 <Grid item md={1}></Grid>
                 <Grid item xs={5} md={2}>
                  <img className={classes.img} src={img.url} alt="" />
                </Grid>

                <Grid item xs={4} md={2} align="center">
                  <Typography variant="body2" component="h6">
                    {img.title}
                  </Typography>
                  <Typography variant="body2" color="secondary" component="h6">
                    {img.price}
                  </Typography>
                  <Button
                    onClick={() => handleRemoveFromCart(img.id)}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    remove
                  </Button>
                </Grid>
                <Grid item  xs={3} align="center">
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

            <Grid item xs={1}></Grid>

            
            <Grid align="center" item  xs={4} md={2} className={classes.grid}>

              <Typography gutterBottom variant="h6">Your Cart </Typography>
              <Typography gutterBottom variant="body2">Total Items:{props.totalItems} </Typography>
            <Typography gutterBottom variant="body2">Total: ${props.totalPrice.toFixed(2)}</Typography>
            <ButtonGroup
        orientation="vertical"
        color="primary"
      
        variant="text"
      >
            <Button variant="contained" color="secondary" size="small">
              Buy Now
            </Button>
            <br/>
            {Object.keys(props.user).length>0 ? (<Button onClick={() => props.saveCart(props.cartItems)} variant="contained" color="secondary" size="small">
              Save Cart
            </Button>):''}
             <br/>
            <Button variant="outlined" onClick={handleEmptyCart} color="primary" size="small">
              Empty Cart
            </Button>
           
            </ButtonGroup>
            </Grid>


          </Grid>
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
    user:state.login.user
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
    saveCart: (cart) => {
      dispatch(saveCart(cart))
    } ,
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
