import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addToCart} from "../redux/cart/cartActions";


import {loadMainPage} from '../redux/home/homeActions';
import {disableHomeRedirect} from '../redux/login/loginActions'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import SortAndFilter from "./SortAndFilter";
import Rating from "@material-ui/lab/Rating";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DoneIcon from "@material-ui/icons/Done";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Container from "@material-ui/core/Container";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    "&:hover": {
      boxShadow: "2px 2px 5px",
    },
  },
  product: {
    width: "100%",
    display: "block",
  },
  grid:{
    backgroundColor:"#f1f1f1",
    
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    
  },
}));

function Menu(props) {
  const classes = useStyles();

  console.log(props.logoutLoading)

  useEffect(() => {
    if(props.displayedProducts.length === 0)
      props.loadMainPage();
    
    props.disableHomeRedirect()
    
  }, []);

 

  //***************************
  const [open, setOpen] = React.useState(false);
  const handleClick = (product) => {
    props.addToCart(product);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason == "clickaway") return;
    setOpen(false);
  };
  //************************

  return props.loading?
  <LinearProgress color="secondary" />
  :(<div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Item added to cart
        </Alert>
      </Snackbar>
        
        <Backdrop className={classes.backdrop} open={props.logoutLoading} >
        <CircularProgress color="secondary" />
      </Backdrop>
     

      <Grid container>
      
      
        <Grid item xs={3} md={2} className={classes.grid}>
          <SortAndFilter />
        </Grid>
        <Grid item xs={9} md={10} >
        <Container maxWidth={false} >
          <Grid container  className={classes.grid}>
            

            {props.displayedProducts.map((product) => (
              <Grid
                
                key={product.id}
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
              >
                <Paper className={classes.paper}>
                  <img className={classes.product} src={product.url} alt="" />

                  <Typography variant="caption" component="p">
                    {product.title}
                  </Typography>
                  <Typography variant="caption" color="secondary" component="p">
                    {product.price}
                    {product.inCart ? (
                      <IconButton size="small" disableRipple>
                        <DoneIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => handleClick(product)}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    )}
                  </Typography>

                  <Rating
                    name="half-rating-read"
                    size="small"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>)
}
    


const mapStateToProps = (state) => {
  const { loading, products, filters } = state.home;

  return {
    loading,
    displayedProducts:filters.length === 0
        ? products
        : products.filter((item) =>
            filters.some((criteria) => item.category === criteria)
          ),
    user:state.login.user,
    logoutLoading:state.login.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    loadMainPage:() => {
      dispatch(loadMainPage())
    },
    disableHomeRedirect: () => {
      dispatch(disableHomeRedirect())
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
