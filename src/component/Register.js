import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
    width: "50%",
    margin: "auto",
  },
}));

export default function Register() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography align="center" color="secondary" gutterBottom>
            <FastfoodIcon /> FoodCorner
          </Typography>
          <Divider />

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Phone"
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
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </CardContent>
        <CardActions align="center">
          <Button variant="contained" size="small" color="primary" fullWidth>
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
  );
}
