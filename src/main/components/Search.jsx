import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1)
    },
    dense: {
        marginTop: theme.spacing(2)
    },
    menu: {
        width: 200
    }
}));

const Search = props => {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                label="Shortcut"
                className={classes.textField}
                placeholder="Enter a shortcut"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true
                }}
                onChange={e => props.handleChange(e.target.value)}
            />
        </form>
    );
};

Search.propTypes = {
    handleChange: PropTypes.func
};

export default Search;
