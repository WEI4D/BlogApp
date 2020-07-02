import React,{Component} from 'react';
import {Timeline, Icon, message} from 'antd';
import axios from 'axios';
import qs from 'qs';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import './recent.css';
export default class EditMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeItems: [
                {
                    id: "",
                    time: "",
                    status: "green",
                    content: ""

                }
            ]

        }
    }
    getTimeline=()=>{
        axios.get('/thisblog/api/GetTimeline',{
            timeout: 180000
        })
            .then(response =>{
                this.setState({
                    timeItems: response.data
                })
            })
            .catch(error=>{
                message.error(error.response.status);
            })
    }
    componentDidMount() {
        this.getTimeline();
    }

    render() {
        return(
            <div className="recent-wrapper">
                <NavBar/>
                <div className="circle-model-wrapper">
                    <div className="circle-model-wrapper-red">
                        <div className="ant-timeline-item-head ant-timeline-item-head-red circle-model"></div>
                    </div>
                    <div className="circle-model-wrapper-blue">
                        <div className="ant-timeline-item-head ant-timeline-item-head-blue circle-model"></div>
                    </div>
                    <div className="circle-model-wrapper-green">
                        <div className="ant-timeline-item-head ant-timeline-item-head-green circle-model"></div>
                    </div>
                    <div className="circle-model-wrapper-gray">
                        <div className="ant-timeline-item-head ant-timeline-item-head-gray circle-model"></div>
                    </div>
                </div>
                <Timeline>
                    {
                        this.state.timeItems.map((v,k)=>{
                            let color = "";
                            let contentList = "";
                            if(v.status === "已完成"){
                                color = "green"
                            }else if(v.status === "警告"){
                                color = "red";
                            }else if(v.status === "开拓中"){
                                color= "blue";
                            }else if(v.status === "未完成"){
                                color = "gray";
                            }else{
                                color = "gray";
                            }
                            if(v.content.indexOf("/")){
                                contentList = v.content.split("/");
                            }else{
                                contentList = v.content;
                            }
                            return(
                                <Timeline.Item color={color} key={k}>
                                    <p className="timeline-publish-time" style={k===0?{fontSize:"4em",lineHeight:".2em"}:{}}>{v.time}</p>
                                    {
                                        contentList.length > 1 ? contentList.map((value,key)=>{return <p>{`${value}`}</p>}):contentList
                                    }
                                </Timeline.Item>
                            )
                        })
                    }
                </Timeline>
                <Footer/>
            </div>
        )
    }
}
