import React, { Component } from "react";
import logo from "../../../logo.svg";
import "./index.less";
import fetch from "../../../utils/fetch";

class App extends Component {
    componentDidMount = async () => {
        const res = await fetch({
            url: "https://api.github.com/search/repositories",
            method: "get",
            data: { q: "javascript", sort: "stars" },
        });
        console.log(res);
    };
    render() {
        return (
            <div className="App-pc">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        pc
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
