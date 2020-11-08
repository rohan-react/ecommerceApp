import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../redux/home/homeActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
    marginLeft: "1rem",
  },
}));

function SortAndFilter(props) {
  const classes = useStyles();
  let filters = [...props.filters];

  // Add or remove filter
  const handleFilter = (e) => {
    if (!props.filters.includes(e.target.value)) filters.push(e.target.value);
    else {
      filters = filters.filter((filter) => filter !== e.target.value);
    }
    props.filterProducts(filters);
  };

  // set sorting criteria
  const handleSort = (e) => {
    props.sortProducts(e.target.value);
  };

  return (
    <Grid container alignContent="flex-start" className={classes.root}>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="caption" color="primary">
              Sort by
            </Typography>
          </FormLabel>
          <RadioGroup onChange={handleSort} name="position">
            <FormControlLabel
              value="priceHigh"
              component="p"
              control={
                <Radio
                  checked={props.criteria === "priceHigh"}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Price--high to low
                </Typography>
              }
            />
            <FormControlLabel
              value="priceLow"
              control={
                <Radio
                  checked={props.criteria === "priceLow"}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Price--low to high
                </Typography>
              }
            />
            <FormControlLabel
              value="rating"
              control={
                <Radio
                  checked={props.criteria === "rating"}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Rating
                </Typography>
              }
            />
            <FormControlLabel
              value="orders"
              control={
                <Radio
                  checked={props.criteria === "orders"}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Popularity
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="caption" color="primary">
              Filter by
            </Typography>
          </FormLabel>
          <FormGroup onChange={handleFilter} name="position">
            <FormControlLabel
              value="starter"
              control={
                <Checkbox
                  checked={props.filters.includes("starter")}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Starters
                </Typography>
              }
            />
            <FormControlLabel
              value="main"
              control={
                <Checkbox
                  checked={props.filters.includes("main")}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Main Course
                </Typography>
              }
            />
            <FormControlLabel
              value="drink"
              control={
                <Checkbox
                  checked={props.filters.includes("drink")}
                  size="small"
                  color="secondary"
                />
              }
              label={
                <Typography variant="caption" color="textSecondary">
                  Drinks
                </Typography>
              }
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    filters: state.home.filters,
    criteria: state.home.criteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterProducts: (filters) => {
      dispatch(filterProducts(filters));
    },
    sortProducts: (criteria) => {
      dispatch(sortProducts(criteria));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortAndFilter);
