import React,{ Component } from 'react'
import "./comment.css"
import Publish from "../Publish/Publish";
import axios from "axios";
import qs from "qs";
import {message} from "antd";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [],
            id: 1,
            trigger: false,
        };
    }
    rotateX =(k,chk,children)=>{
        if(children === ""){
            let ele = document.getElementsByClassName(`RotateTarget-${k}`)[0];
            let hook = document.getElementsByClassName(`info-hook-${k}`)[0];
            let publish = document.getElementsByClassName(`publish`)[k];
            if(!this.state.trigger){
                ele.className = `info-wrapper RotateTarget-${k} rotate-on`;
                hook.style.display = "none";
                publish.style.display = "block";
            }else{
                ele.className = `info-wrapper RotateTarget-${k} rotate-off`;
                hook.style.display = "block";
                publish.style.display = "none";
            }
            this.setState({
                trigger: !this.state.trigger
            })
        }else{
            let ele = document.getElementsByClassName(`RotateTarget-${k}-${chk}-children`)[0];
            let hook = document.getElementsByClassName(`info-hook-${k}-${chk}-children`)[0];
            let publish = document.getElementsByClassName(`publish-children ${k}-${chk}`)[0];
            if(!this.state.trigger){
                ele.className = `info-wrapper RotateTarget-${k}-${chk}-children children-mark rotate-on`;
                hook.style.display = "none";
                publish.style.display = "block";
            }else{
                ele.className = `info-wrapper RotateTarget-${k}-${chk}-children children-mark rotate-off`;
                hook.style.display = "block";
                publish.style.display = "none";
            }
            this.setState({
                trigger: !this.state.trigger
            })
        }
    };
    async getRatings(){
        let data = {
            blog_id: this.state.id
        };
        axios.post('thisblog/api/GetRatings',qs.stringify(data),{ timeout: 180000 })
            .then((response)=>{
                this.setState({
                    comment: response.data
                });
                this.props.getRatingCount(response.data.length);
            }).catch((error)=>{
                message.error(error.response.status);
        })
    }

    getTheLastComment = comment =>{
        this.setState({
            comment: comment
        })
    }

    componentWillMount() {
        let id = window.location.search.substr(4);
        this.setState({
            id: id
        });
    };

    componentDidMount() {
        this.getRatings();
    }

    render() {
        return (
            <form>
                <div className="comment">
                    <Publish pid={-1} getTheLastComment={comment => this.getTheLastComment(comment)}/>
                    <div className="comment-list" style={this.state.comment.length>0?{}:{display:'none'}}>
                        {
                            this.state.comment.map((cv,ck)=>{
                                return(
                                    <div className="info">
                                        <div className={`info-wrapper RotateTarget-${ck}`}>
                                            <div className={`info-hook-${ck}`}>
                                                <div className="user" data-name={cv.name}>
                                                    <img src={cv.avatar} width="30" alt=""/>
                                                </div>
                                                <p>
                                                    {
                                                        cv.words
                                                    }
                                                </p>
                                                <div className="publish-date">
                                                    {
                                                        cv.publish
                                                    }
                                                </div>
                                                <button disabled={this.state.trigger} type="button" className="icon-add reply" onClick={this.rotateX.bind(this,ck,"","")}></button>
                                            </div>
                                            <div className="publish">
                                                <span className="ant-badge">
                                                    <Publish pid={cv.id} trigger={this} getTheLastComment={comment=> this.getTheLastComment(comment)}/>
                                                    <sup onClick={this.rotateX.bind(this,ck,"","")} data-show="true" className="ant-scroll-number ant-badge-count"
                                                         title="X" style={{right: '0px', 'margin-top': '0px'}}>
                                                        X
                                                    </sup>
                                                </span>
                                            </div>
                                        </div>
                                        {
                                            cv.children.map((chv,chk)=>{
                                                return(
                                                    <div className={`info-wrapper RotateTarget-${ck}-${chk}-children children-mark`}>
                                                        <div className={`info-hook-${ck}-${chk}-children`}>
                                                            <div className="user" data-name={chv.name}>
                                                                <img src={chv.avatar} width="30" alt=""/>
                                                            </div>
                                                            <p>
                                                                {
                                                                    chv.words
                                                                }
                                                            </p>
                                                            <div className="publish-date">
                                                                {
                                                                    chv.publish
                                                                }
                                                            </div>
                                                            <button disabled={this.state.trigger} type="button" className="icon-add reply" onClick={this.rotateX.bind(this,ck,chk,"children")}>
                                                            </button>
                                                        </div>
                                                        <div className={`publish-children ${ck}-${chk}`}>
                                                            <span className="ant-badge">
                                                                <Publish pid={cv.id} getTheLastComment={comment=> this.getTheLastComment(comment)}/>
                                                                <sup onClick={this.rotateX.bind(this,ck,chk,"children")} data-show="true" className="ant-scroll-number ant-badge-count"
                                                                     title="X" style={{right: '0px', 'margin-top': '0px'}}>
                                                                    X
                                                                </sup>
                                                             </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </form>
        );
    }
}

export default Comment;
