import React,{Component} from 'react';
// import {Link} from "react-router-dom";
// import { Router, Route,Switch } from 'react-router';
import { Layout, Menu, Icon, Input,DatePicker,Radio } from 'antd';
import './operateblog.css';
export default class OperateBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            classify:'Note'
        }

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { TextArea } = Input;
        return (
            <div>
                <table>
                    <th>标题</th>
                    <th>前言</th>
                    <th>内容</th>
                    <th>分类</th>
                    <th>日期</th>
                </table>
            </div>

        );
    }
}
