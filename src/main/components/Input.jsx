import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

const Input = props => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        key: "",
        text: "",
        attachment: ""
    });
    const regex = /^[0-9a-z._-]+$/;

    const [filled, setFilled] = React.useState(true);

    const handleChange = name => event => {
        if (name === "key") {
            if (
                regex.test(event.target.value) ||
                event.target.value.length === 0
            ) {
                setValues({ ...values, [name]: event.target.value });
            }
            if (
                event.target.value.trim() !== "" &&
                values["text"].trim() !== ""
            ) {
                setFilled(false);
            } else {
                setFilled(true);
            }
        } else if (name === "text") {
            setValues({ ...values, [name]: event.target.value });
            if (
                event.target.value.trim() !== "" &&
                values["key"].trim() !== ""
            ) {
                setFilled(false);
            } else {
                setFilled(true);
            }
        } else {
            setValues({ ...values, [name]: event.target.value });
            if (values["key"].trim() !== "" && values["text"].trim() !== "") {
                setFilled(false);
            } else {
                setFilled(true);
            }
        }
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                label="Key"
                className={classes.textField}
                placeholder="Type in the key used to find this shortcut"
                fullWidth
                value={values["key"]}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true
                }}
                onChange={handleChange("key")}
            />
            <TextField
                label="Text to be pasted"
                value={values["text"]}
                multiline
                fullWidth
                placeholder="Type in the text that will be pasted to the user"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true
                }}
                margin="normal"
                variant="outlined"
                onChange={handleChange("text")}
            />
            <TextField
                label="Attachments"
                value={values["attachment"]}
                multiline
                fullWidth
                placeholder="Paste path to attachment (network drive or Egnyte), separate using commas"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true
                }}
                margin="normal"
                variant="outlined"
                onChange={handleChange("attachment")}
            />
            <Button
                variant="contained"
                onClick={() => {
                    props.handleClick(values);
                    setValues({
                        key: "",
                        text: "",
                        attachment: ""
                    });
                    setFilled(true);
                }}
                disabled={filled}
                className={classes.button}
            >
                Save
            </Button>
        </form>
    );
};

Input.propTypes = {
    handleClick: PropTypes.func
};

export default Input;
