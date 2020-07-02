import React,{Component} from 'react';
import {Form, Input, DatePicker, message} from 'antd';
import axios from 'axios';
import './addtimeline.css';
import qs from 'qs';
export default class EditMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    submitTimeline=()=>{
        let time = document.getElementsByClassName("ant-calendar-picker-input ant-input")[0].value;
        let content = document.getElementById("content").value;
        let status = document.getElementById("status").value;
        if(time.length>0&&content.length>0&&status.length>0){
            axios.post("/thisblog/api/AddTimeline",qs.stringify({
                time,
                content,
                status
            },{ timeout: 180000 }))
                .then(response=>{
                    if(response.data === "2") message.success("发布成功");
                    else message.error("发布失败");
                })
                .catch(error=>{
                    message.error(error.response.status);
                })
        }else{
            message.error("非法表单");
        }
    }
    componentDidMount() {

    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <Form {...formItemLayout}>
                <Form.Item label="状态">
                    <Input placeholder="时光轴状态" id="status" />
                </Form.Item>

                <Form.Item label="内容">
                    <Input placeholder="xxxx/xxxx" id="content" />
                </Form.Item>
                <Form.Item label="时光" hasFeedback>
                    <DatePicker style={{ width: '100%' }} id="time" />
                </Form.Item>
                <Form.Item label className="submit-wrapper">
                    <Input value="发布" type="submit" style={{backgroundColor: "rgb(24, 144, 255)",color:"white",cursor:"pointer"}} onClick={this.submitTimeline} />
                </Form.Item>
            </Form>
        )
    }
}
