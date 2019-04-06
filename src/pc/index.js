import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "../serviceWorker";
// import BaseLayout from "./components/BaseLayout";
// import routes from "./routes";
// import "./Pc.less";
// import { routePath } from "./config";
import PcDemo from "./container/pcDemo";
import configureStore from "./store";
const store = configureStore();
console.log("pc");
class Pc extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/pc/demo" component={PcDemo} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Pc />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
