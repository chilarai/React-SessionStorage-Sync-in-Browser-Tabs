import React, { Component } from "react";

class Main extends Component {
    constructor(props) {
        super(props);

        // Install an event listener with name "storage"
        // Whenever there is a change in the local storage,
        // this event will be fired
        // and all the open tabs will be notified

        window.addEventListener("storage", () => {});
    }

    componentDidMount = () => {
        this.changeDetect();
    };

    changeDetect = () => {
        // Set a dummy localstorage item and then delete it
        // Just dummy activity to fire the above event listener
        // when a new tab is opened

        window.localStorage.setItem(
            "REQUESTING_STORAGE",
            Date.now().toString()
        );
        window.localStorage.removeItem("REQUESTING_STORAGE");

        // Actual function to be called when a local storage
        // event change is detected in any opentab

        window.addEventListener("storage", (event) => {
            // Check if any one of the item is present in sessionStorage

            const session = JSON.parse(
                window.sessionStorage.getItem("numberA")
            );

            // CONDITION: Add to Local Storage
            // If 'session' isnt empty
            // then set all the values in sessionStorage to localStorage as well
            // these will be copied in the sessionStorage in new tabs

            if (event.key === "REQUESTING_STORAGE" && session) {
                console.log("called");
                window.localStorage.setItem(
                    "STORAGE_SHARING",
                    JSON.stringify({
                        numberA: sessionStorage.getItem("numberA"),
                        numberB: sessionStorage.getItem("numberB"),
                    })
                );
                window.localStorage.removeItem("STORAGE_SHARING");
            }

            // CONDITION: Open New Tab
            // Copy the localStorage data to sessionStorage
            console.log(event.key, session);

            if (event.key === "STORAGE_SHARING" && !session) {
                console.log("un called", JSON.parse(event.newValue).numberA);
                window.sessionStorage.setItem(
                    "numberA",
                    JSON.parse(event.newValue).numberA
                );
                window.sessionStorage.setItem(
                    "numberB",
                    JSON.parse(event.newValue).numberB
                );

                // Set the new states
                this.setState({
                    numberA: JSON.parse(event.newValue).numberA,
                    numberB: JSON.parse(event.newValue).numberB,
                });
            }
        });
    };

    // Generate new session data
    // on button click

    newSession = () => {
        // Set new data in sessionStorage
        sessionStorage.setItem("numberA", Math.random());
        sessionStorage.setItem("numberB", Math.random());

        // Set the new states
        this.setState({
            numberA: sessionStorage.getItem("numberA"),
            numberB: sessionStorage.getItem("numberB"),
        });
        this.changeDetect();
    };

    // Delete session
    // on button click

    deleteSession = () => {
        sessionStorage.clear();
        window.localStorage.setItem("STORAGE_FLUSH", Date.now().toString());
        window.localStorage.removeItem("STORAGE_FLUSH");
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
                <p>
                    <b>Number A:</b> {this.state.numberA}
                </p>
                <p>
                    <b>Number B:</b> {this.state.numberB}
                </p>

                <button color="danger" onClick={this.newSession}>
                    Generate New Session
                </button>
                <button color="danger" onClick={this.deleteSession}>
                    Delete All Session
                </button>
                <p />
                <a href="/">Right Click &amp; Select Open New Tab</a>
            </React.Fragment>
        );
    }
}

export default Main;
