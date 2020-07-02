import React,{ Component } from 'react';
import "../Comment/comment.css";
import axios from 'axios';
import qs from 'qs';
import { message } from "antd";
import './publish.css';

export default class Publish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify:{
                question:"2 + 2 = ",
                answer: "4"
            }
        };
    }
    getVerifyCode=()=>{
        axios.get('thisblog/api/GetVerifyCode',{
            timeout: 180000
        })
            .then((response)=>{
                this.setState({
                    verify: response.data
                })
            })
    };
    publishComment=()=>{
        let date = new Date();
        //Email验证
        const RegEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.refs.email.value);
        //HTTP验证
        const RegHTTP = /[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(this.refs.website.value);
        //参数不能为空
        let name = this.refs.name.value.length > 0 ? true : false;
        let verify = this.refs.verify.value == this.state.verify.answer ? true : false;

        if(!verify){
            message.error('验证失败');
            return;
        }
        if(typeof this.props.pid === "number"){
            if(name && RegEmail && verify){
                axios.post("thisblog/api/PublishComment",qs.stringify({
                    pid: this.props.pid,
                    blog_id: window.location.search.substr(4),
                    name: this.refs.name.value,
                    email: this.refs.email.value,
                    website: this.refs.website.value,
                    words: this.refs.words.value,
                    publish: `${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1):date.getMonth()}-${date.getDate()+1 < 10 ? "0"+(date.getDate()+1):date.getDate()}`,
                }),{ timeout: 180000 }).then((response)=>{
                    this.props.getTheLastComment(response.data);
                    message.success("评论成功")
                }).catch((error)=>{
                    message.error(error.response.status);
                });

            }else{
                if(!RegEmail){
                    message.error("邮箱格式错误");
                }
                if(!name){
                    message.error("称呼为空")
                }
                if(this.refs.website.value.length > 0 && !RegHTTP){
                    message.error("站点格式错误");
                }
            }
        }else{
            if(name && RegEmail && RegHTTP){
                axios.post("thisblog/api/ApplyLink",qs.stringify({
                    name: this.refs.name.value,
                    email: this.refs.email.value,
                    avatar: Math.floor((Math.random()+1)*10),
                    website: this.refs.website.value,
                    publish: `${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1):date.getMonth()}-${date.getDate()+1 < 10 ? "0"+(date.getDate()+1):date.getDate()}`,
                }),{ timeout: 180000 }).then((response)=>{
                    this.props.getTheLastLink(response.data.result);
                    console.log(response.data)
                    if(response.data.CODE === "0"){
                        message.error("非法请求");
                    }
                    if(response.data.CODE === "1"){
                        message.error("远程故障");
                    }
                    if(response.data.CODE === "2"){
                        message.success("1、请保持贵站稳定运行 2、请将本站纳入贵站 3、不满足前两者将移出本站");
                    }
                    if(response.data.CODE === "3"){
                        message.error("站点已存在")
                    }
                }).then((response)=>{

                }).catch((error)=>{
                    message.error(error.response.status);
                });
            }else{
                if(!RegEmail){
                    message.error("邮箱格式错误");
                }
                if(!RegHTTP){
                    message.error("站点格式错误");
                }
            }
         }
    }
    componentDidMount() {
        this.getVerifyCode();
    }

    render() {
        //当pid为number型时使用评论样式，否则使用友链申请样式
        const v =typeof this.props.pid === "number"?true:false;
        return(
            <div className="comment-wrapper" style={v?{}:{minHeight:"80px",padding:"0 0"}}>
                <div className="comment-input">
                    <input ref="name" name="call" type="text" placeholder="称呼"/>
                    <input ref="email" name="email" type="text" placeholder="邮箱"/>
                    <input ref="website" name="web" type="text" placeholder="站点(www)"/>
                </div>
                <div className={ v ? "comment-content":"link-apply-none" }>
                    <textarea ref="words" name="comment" type="text"  placeholder="快来写下你的评论吧~"/>
                </div>
                <input ref="verify" name="verify"
                       style={ v ? {}:{height:"30%",bottom:0} }
                       type="text" placeholder={`验证： ${this.state.verify.question}`}

                />
                <button className="comment-publish" style={typeof this.props.pid === "number" ? {}:{height:"30%",bottom:0}} type="button" onClick={this.publishComment}>
                    { v ? "评论":"申请" }
                </button>
            </div>
        )
    }
}
