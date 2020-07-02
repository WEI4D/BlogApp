import React, { Component } from 'react';
import './navbar.css'
import { Link } from "react-router-dom";
import { getBrowserWith,getDeviceInfo } from "../../utils";
import { Icon } from "antd"
import Aside from "../Aside/Aside";
import { BASE_URL } from "../../api.config";
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger:false,
            device: getDeviceInfo()
        };
    }

    asideTrigger=()=>{
        this.setState({
            trigger: true
        })
    };

    componentDidMount() {
        /*开始：antd Icon组件通过component属性设置SVG高度、宽度属性失效暂时以这种方式代替*/
        try{
            let antdMenuNode = this.refs.antdMenuNode;
            let svgNode = antdMenuNode.querySelectorAll("svg")[0];
            svgNode.setAttribute("height","70px");
            svgNode.setAttribute("width","40px");
        }catch (e) {

        }
        /*结束：antd Icon组件通过component属性设置SVG高度、宽度属性失效暂时以这种方式代替*/
    }
    close=()=>{
        this.setState({
            trigger: false
        })
    };
    render() {
        /*开始：动态对其navbar 270为内容元素固定宽度*/
        const browserWidth = getBrowserWith();
        let computedPadding = (browserWidth - 270)/2;
        /*结束：动态对其navbar 270为内容元素固定宽度*/
        const { device } = this.state;
        const defaultStyle = {
            display: "flex",
            width: "100%",
            height: "70px",
        };
        const avatar = "data:image/jpeg;base64,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AREQEREBERAREQEREBD0RCg4zxGy9mKWpj4IjVXWrd7CipG9ZpD05eQ6krw+HGGzWcTXe+ze+5FcPjqah3+mCN+zZ5NHRdbV2miqrnTV89LHJV04LYpXDZYD115FbCNuggqxvI7GuauA0qogLy11JFW0stNURiSGVhY9p6EHqF6kQauy2agsdvhobTSx0tJENMijGgO62bRy591VEBERAREQERWucG8ydBBRz2t5E6Kj3xDyKqkrqfFMbkab7XNLny9RRw/ekd6+Q7rZ+ImWw4zawI4zVXWqcIaOkZzdLI7p/wDEdSV5PDfEprDSVVfeHNqcguDva1lQOvoxp7NHQBBusMxujxawU9tt/wAQZ8T5XfaleeZc49yV0DRz2qQtLW6I+qv0gqiBEBERAREQEREBERAREQEREBERAIQIiAiIgIiICIiAiIgIiIBOlqMiu9HY7ZU3K51DYKOmjL5Hu/TXmT00tq8KP81xCty/JrWy5Pj/AHaoj7eSlG+Kol2eHi/pHI6Qanw4tdZkN5mzjIIPZTVDTHbKV3M01OeeyOz3dSfVSnECBz6qynibFE2NjQ1jRoDyHkso2gvREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAVERAVQiICIiAiIgIiICIiAiIgIiICIiAiIg/9k=";
        const { paddingLeft } = this.props;
        if(paddingLeft){
            if(paddingLeft.endsWith("px")){
                computedPadding = parseInt(paddingLeft);
                console.log(computedPadding)
            }
        }
        return (
            <React.Fragment>
                <div className="nav" style={ device ? { padding: `0 ${computedPadding}px` }: { padding: "0 0 0 170px" }} >
                    <div style={ defaultStyle }>
                        <div className="nav-base nav-logo">
                            <a href={ BASE_URL }>
                                <img width="50px" src={ avatar } />
                            </a>
                        </div>
                        {
                            device ? <WapNode/> : <PcNode/>
                        }
                    </div>
                </div>
                <Aside trigger={ this.state.trigger } close={ this.close }/>
            </React.Fragment>
        );
    }
}

/********PC端适配开始*********/
function PcNode() {
    return(
        <div className="nav-base nav-list">
                <span className="link-wrapper">
                    <Link to="/notes/list" target="_blank">笔记</Link>
                </span>
            <span className="link-wrapper">
                    <Link to="/blog/list" target="_blank">博文</Link>
                </span>
            <span className="link-wrapper">
                    <Link to="/recent" target="_blank">最近</Link>
                </span>
            <span className="link-wrapper">
                    <Link to="/link" target="_blank">友链</Link>
                </span>
            <span className="link-wrapper">
                    <Link to="/lab" target="_blank">实验室</Link>
                </span>
            <span className="link-wrapper">
                    <Link to="/channel" target="_blank">频道</Link>
                </span>
        </div>
    )
}
/********PC端适配结束*********/

function WapNode() {
    const defaultStyle = {
        height: "70px",
        width: "40px",
        "margin-left": "auto",
    };
    const iconStyle = {
        fontWeight: "lighter",
        fontSize: ".9em",
        color: "rgba(0,0,0,0.35)"
    };
    return (
        <div ref="antdMenuNode" className="antdMenuNode" style={ defaultStyle }>
                <span onClick={ this.asideTrigger }>
                    <Icon type="menu" style={ iconStyle } />
                </span>
        </div>
    )
};

export default NavBar;
