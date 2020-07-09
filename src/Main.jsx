import React, { Component } from "react";

class Main extends Component {
    componentDidMount = () => {
        this.newSession();
    };

    // Generate new session data
    newSession = () => {
        // Set new data in sessionStorage
        sessionStorage.setItem("numberA", Math.random());
        sessionStorage.setItem("numberB", Math.random());

        // Set the new states
        this.setState({
            numberA: sessionStorage.getItem("numberA"),
            numberB: sessionStorage.getItem("numberB"),
        });
    };

    // State
    state = {
        numberA: 0,
        numberB: 0,
    };

    render() {
        return (
            <React.Fragment>
                <h1>SessionStorage data sync in browser tabs</h1>
                <p>NumberA: {this.state.numberA}</p>
                <p>NumberB: {this.state.numberB}</p>

                <button color="danger" onClick={this.newSession}>
                    Generate New Session
                </button>
                <p />
                <a href="/" target="_blank">
                    Open New Tab
                </a>
            </React.Fragment>
        );
    }
}

export default Main;
