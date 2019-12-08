import React, { Component } from "react";
import Shortcuts from "./main/views/Shortcuts";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { loadShortcuts } from "./redux/action/index";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadShortcuts();
    }

    render() {
        return (
            <div style={{ minWidth: "800px", minHeight: "600px" }}>
                <Shortcuts />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadShortcuts: theme => dispatch(loadShortcuts(theme))
    };
};

App.propTypes = {
    loadShortcuts: PropTypes.func
};

export default connect(null, mapDispatchToProps)(App);
