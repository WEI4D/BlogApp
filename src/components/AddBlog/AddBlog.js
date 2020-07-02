import React,{Component} from 'react';
import { Icon, Input,DatePicker,Radio,Button,Upload,message } from 'antd';
import './addblog.css';
import axios from 'axios';
import qs from 'qs';
export default class AddBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            classify:'Note',
            value:1
        }

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onChange = e => {
        this.setState({
          classify: e.target.value,
        });
     }
    submitBlog= e =>{
        let elements= document.getElementsByTagName('input');
        let textarea = document.getElementsByClassName('textarea-hook')[0];

        let count = 0;
        if(textarea.value){
             count++;
             for(let i = 0;i < elements.length;i++){
                 if(elements[i].className === "ant-radio-input"){
                    continue;
                 }else{
                    if(elements[i].value){
                         count++;
                    }
                 }
             }
             if(count === 6){
                 let title = document.getElementsByName("title")[0].value;
                 let preface = document.getElementsByName("preface")[0].value;
                 let classify = this.state.classify;
                 let article_classify = document.getElementsByName("article_classify")[0].value;
                 let publish = document.getElementsByClassName("ant-calendar-picker-input ant-input")[0].value;
                 let content = document.getElementsByClassName("ant-input blog-group textarea-hook blog-textarea")[0].value;
                 let tag = document.getElementsByName("tag")[0].value;

                 const data = {
                     title,
                     preface,
                     classify,
                     article_classify,
                     publish,
                     content,
                     tag
                 }
                 axios.post("/thisblog/AddBlog",qs.stringify(data),{ timeout: 180000 })
                     .then((response)=>{
                         if(response.data === "2") message.success("发布成功");
                         else message.error("非法发布");
                     })
                     .catch((error)=>{
                         message.error(error.response.status);
                     })
             }
        }else{
             return false;
        }
    }
    componentDidMount() {

    }

    render() {
        const props = {
            name: 'file',
            action: '/thisblog/api/GetMarkdown',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const { TextArea } = Input;
        return (
            <form ref="form" target="DontReplace">
                <div className="form-body">
                    <Input name="title" className="blog-group addblog-title addblog-hook" placeholder="这是你的标题"/>
                    <Input name="preface" className="blog-group addblog-preface addblog-hook" placeholder="这是你的前言" />
                    <Radio.Group name="classify" className="blog-group addblog-hook" onChange={this.onChange} value={this.state.classify}>
                        <Radio value="Note">笔记</Radio>
                        <Radio value="Blog">博文</Radio>
                        <Radio value="Recent">最近</Radio>
                        <Radio value="Link">友链</Radio>
                        <Radio value="Lab">实验室</Radio>
                    </Radio.Group>
                    <Input name="article_classify" className="aticle-classify blog-group" placeholder="这是你的文章二级分类"/>
                    <Input name="tag" className="blog-group addblog-tag addblog-hook" placeholder="这是你的文章标签" />
                    <DatePicker name="publish" className="blog-group addblog-hook"/>
                    <TextArea name="content" className="blog-group textarea-hook blog-textarea" rows={1} maxLength="50" placeholder="你的文件名"/>
                    <Upload {...props} accept=".md">
                        <Button>
                            <Icon type="upload" /> Upload your Markdown
                        </Button>
                    </Upload>
                    <Button className="blog-group blog-publish-button" type="primary" onClick={this.submitBlog}>发布</Button>
                </div>
                <iframe name="DontReplace" frameBorder="0" style={{opacity:0}}></iframe>
            </form>

                );
    }
}
