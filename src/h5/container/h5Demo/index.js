import React, { Component } from "react";
import logo from "../../../logo.svg";
import "./index.css";
/**
 * 测试用的HOC
 * @param {React.Component} Cmp
 */
const HOC = Cmp => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return <Cmp abc={123} />;
        }
    };
};

@HOC
class App extends Component {
    render() {
        const { abc } = this.props;
        console.log(abc);
        return (
            <div className="App">
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
                        h5
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
