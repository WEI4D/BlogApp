import React, {Component} from 'react';
import "./language.css";
import classNames from "classnames";
export default class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightOn: true
        }
    }

    lightTrigger=()=>{
        this.setState({
            lightOn: !this.state.lightOn
        })
    }

    render() {
        return (
            <div className="language-wrapper">
                <div className="language">
                    <div className="lantern" onClick={ this.lightTrigger }></div>
                    <div className={
                        classNames({
                            "light": true,
                            // "light-on": this.state.lightOn,
                            // "light-off": !this.state.lightOn
                        })
                    }>

                    </div>
                    <span className="mask"></span>
                </div>
                <div className="change" >
                    {
                        this.state.lightOn ? "CHINESE":"ENGLISH"
                    }
                </div>
            </div>
        )
    }
}
