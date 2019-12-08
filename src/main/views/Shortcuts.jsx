import React, { Component } from "react";
import { List } from "react-virtualized";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { editShortcuts, deleteShortcuts } from "../../redux/action/index";
import "../assets/shortcuts.css";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DialogContent from "@material-ui/core/DialogContent";
import ViewIcon from "@material-ui/icons/ViewAgenda";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import FileCopy from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

const regex = /^[0-9a-z._-]+$/;

class Shortcuts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            filled: true,
            key: "",
            text: "",
            attachment: "",
            view: false,
            search: ""
        };

        this.renderListRow = this.renderListRow.bind(this);
        this.renderDataRow = this.renderDataRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    renderListRow({ index, key, style }) {
        return (
            <div key={key} style={style} className="row">
                <div className="content">
                    <div>
                        <Fab style={{ height: "32px", width: "32px" }}>
                            <ViewIcon
                                onClick={() => {
                                    this.handleOpen(this.props.list[index]);
                                }}
                            />
                        </Fab>
                        <Fab
                            style={{ height: "32px", width: "32px" }}
                            onClick={() => {
                                this.setState({
                                    filled: false,
                                    key: this.props.list[index].key,
                                    text: this.props.list[index].text,
                                    attachment: this.props.list[index]
                                        .attachment
                                });
                            }}
                        >
                            <EditIcon />
                        </Fab>
                        <Fab
                            style={{ height: "32px", width: "32px" }}
                            onClick={() => {
                                this.props.deleteShortcuts(
                                    this.props.list[index]
                                );
                            }}
                        >
                            <DeleteIcon />
                        </Fab>
                        <div>
                            <b>Key:</b> {this.props.list[index].key}
                        </div>
                        <div className="text">
                            <b>Text:</b> {this.props.list[index].text}
                        </div>
                        <div>{this.props.list[index].attachment}</div>
                    </div>
                </div>
            </div>
        );
    }

    renderDataRow({ index, key, style }) {
        return (
            <div key={key} style={style} className="row">
                <div className="content">
                    <div>
                        <Fab style={{ height: "32px", width: "32px" }}>
                            <ViewIcon
                                onClick={() => {
                                    this.handleOpen(this.state.data[index]);
                                }}
                            />
                        </Fab>
                        <Fab
                            style={{ height: "32px", width: "32px" }}
                            onClick={() => {
                                this.setState({
                                    filled: false,
                                    key: this.state.data[index].key,
                                    text: this.state.data[index].text,
                                    attachment: this.state.data[index]
                                        .attachment
                                });
                            }}
                        >
                            >
                            <EditIcon />
                        </Fab>
                        <Fab
                            style={{ height: "32px", width: "32px" }}
                            onClick={() => {
                                this.props.deleteShortcuts(
                                    this.state.data[index].key
                                );
                            }}
                        >
                            <DeleteIcon />
                        </Fab>
                        <div>
                            <b>Key: </b>
                            {this.state.data[index].key}
                        </div>
                        <div className="text">
                            <b>Text: </b>
                            {this.state.data[index].text}
                        </div>
                        <div>{this.state.data[index].attachment}</div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange(str) {
        let data = this.props.list.filter(name => {
            if (name.key.toLowerCase().includes(str.toLowerCase())) {
                let score = 0;
                for (let i = 0; i < name.key.length; i++) {
                    if (i < str.length) {
                        if (
                            str.toLowerCase().charAt(i) ===
                            name.key.toLowerCase().charAt(i)
                        ) {
                            score++;
                        } else {
                            score = score - (name.key.length - i);
                            break;
                        }
                    } else {
                        score = score - (name.key.length - i);
                        break;
                    }
                }
                name.score = score;
                return name;
            }
        });
        const sorted = data.sort((a, b) => a.score - b.score).reverse();
        this.setState({
            data: sorted,
            search: str
        });
    }

    handleClick() {
        this.props.editShortcuts({
            key: this.state.key,
            text: this.state.text,
            attachment: this.state.attachment
        });
    }

    handleOpen(data) {
        this.setState({
            single: data,
            view: true
        });
    }

    handleClose() {
        this.setState({
            view: false
        });
    }

    handleInput(name, event) {
        if (name === "key") {
            if (
                (regex.test(event.target.value) ||
                    event.target.value.length === 0) &&
                event.target.value.length <= 16
            ) {
                this.setState({
                    [name]: event.target.value
                });
            }
            if (
                event.target.value.trim() !== "" &&
                this.state.text.trim() !== ""
            ) {
                this.setState({
                    filled: false
                });
            } else {
                this.setState({
                    filled: true
                });
            }
        } else if (name === "text") {
            this.setState({
                [name]: event.target.value
            });
            if (
                event.target.value.trim() !== "" &&
                this.state.key.trim() !== ""
            ) {
                this.setState({
                    filled: false
                });
            } else {
                this.setState({
                    filled: true
                });
            }
        } else {
            this.setState({
                [name]: event.target.value
            });
            if (this.state.key.trim() !== "" && this.state.text.trim() !== "") {
                this.setState({
                    filled: false
                });
            } else {
                this.setState({
                    filled: true
                });
            }
        }
    }

    render() {
        return (
            <div>
                <TextField
                    label="Key"
                    placeholder="Type in the key used to find this shortcut"
                    fullWidth
                    value={this.state.key}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={e => this.handleInput("key", e)}
                />
                <TextField
                    label="Text to be pasted"
                    value={this.state.text}
                    multiline
                    fullWidth
                    placeholder="Type in the text that will be pasted to the user"
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleInput("text", e)}
                />
                <TextField
                    label="Attachments"
                    value={this.state.attachment}
                    multiline
                    fullWidth
                    placeholder="Paste path to attachment (network drive or Egnyte), separate using commas"
                    InputLabelProps={{
                        shrink: true
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleInput("attachment", e)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    style={{ marginBottom: "1em" }}
                    onClick={() => {
                        this.handleClick();
                        this.setState({
                            key: "",
                            text: "",
                            attachment: "",
                            filled: true
                        });
                    }}
                    disabled={this.state.filled}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    style={{ marginBottom: "1em" }}
                    onClick={() => {
                        this.setState({
                            key: "",
                            text: "",
                            attachment: "",
                            filled: true
                        });
                    }}
                >
                    Clear
                </Button>
                {Object.keys(this.props.list).length > 0 ? (
                    <div>
                        <TextField
                            label="Shortcut"
                            placeholder="Enter a shortcut"
                            fullWidth
                            autoFocus
                            margin="normal"
                            variant="outlined"
                            value={this.state.search}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={e => this.handleChange(e.target.value)}
                        />
                        {this.state.data.length === 0 &&
                        this.state.search.length > 0 ? (
                                <div>No shortcuts found</div>
                            ) : (
                                <List
                                    width={800}
                                    height={600}
                                    rowHeight={100}
                                    rowRenderer={
                                        this.state.data.length > 0
                                            ? this.renderDataRow
                                            : this.renderListRow
                                    }
                                    rowCount={
                                        this.state.data.length > 0
                                            ? this.state.data.length
                                            : this.props.list.length
                                    }
                                />
                            )}
                    </div>
                ) : (
                    <div>No shortcuts found</div>
                )}
                {this.state.single ? (
                    <Dialog
                        onClose={this.handleClose}
                        aria-labelledby="simple-dialog-title"
                        open={this.state.view}
                    >
                        <DialogTitle id="simple-dialog-title">
                            View Alias {this.state.single.key}{" "}
                            <CopyToClipboard text={this.state.single.text}>
                                <Fab style={{ width: "32px", height: "32px" }}>
                                    <FileCopy />
                                </Fab>
                            </CopyToClipboard>
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                <b>Key: </b>
                                {this.state.single.key}
                            </div>
                            <div>
                                <b>Text: </b>
                                <pre>{this.state.single.text}</pre>
                            </div>
                            <div>{this.state.single.attachment}</div>
                        </DialogContent>
                    </Dialog>
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.list
    };
}

const mapDispatchToProps = dispatch => {
    return {
        editShortcuts: theme => dispatch(editShortcuts(theme)),
        deleteShortcuts: theme => dispatch(deleteShortcuts(theme))
    };
};

Shortcuts.propTypes = {
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    editShortcuts: PropTypes.func,
    deleteShortcuts: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Shortcuts);
