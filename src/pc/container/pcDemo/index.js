import React, { Component } from "react";
import logo from "../../../logo.svg";
import "./index.less";
import fetch from "../../../utils/fetch";
import { withRouter } from "react-router-dom";
import { getListAct } from "../../action";
import { connect } from "react-redux";
import { get } from "lodash";
import { Table } from "antd";
const mapStateToProps = (state, ownProps) => {
    return {
        ...get(state, "PcDemo"),
    };
};
@withRouter
@connect(mapStateToProps)
class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getListAct({ q: "javascript", sort: "stars" }));
    }
    render() {
        console.log(this.props);
        const { stars } = this.props;
        const column = [
            {
                dataIndex: "index",
                title: "序号",
                render: (text, record, index) => index + 1,
            },
            {
                dataIndex: "name",
                title: "名称",
            },
            {
                dataIndex: "git_url",
                title: "git 地址",
            },
            {
                dataIndex: "owner",
                title: "所有者",
                render: (text, record, index) =>
                    get(record, ["owner", "login"]),
            },
            {
                dataIndex: "avatar",
                title: "头像",
                render: (text, record, index) => (
                    <img
                        src={get(record, ["owner", "avatar_url"])}
                        style={{ width: 50 }}
                        alt="头像"
                    />
                ),
            },
        ];
        return (
            <div className="App-pc">
                <Table columns={column} dataSource={stars} />
            </div>
        );
    }
}

export default App;
