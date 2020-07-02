import React,{ Component } from 'react';
import {Button, Icon, Input, message, Upload} from "antd";
import UploadAvatar from "../UploadAvatar/UploadAvatar";
import qs from 'qs';
import axios from 'axios';
import './addmusic.css';
import { BASE_URL } from "../../api.config";

export default class AddMusic extends Component{
    constructor(props){
        super(props);
        this.state={
            status: 0
        }
    }
    submitMusicInfo=()=>{
        let singer = document.getElementsByName('singer')[0];
        let name = document.getElementsByName('name')[0];
        let src = document.getElementsByName('src')[0];
        console.log(singer.value);
        if(singer.value.length>0&&name.value.length>0&&src.value.length>0){
            axios.post('/thisblog/api/RecordMusicInfo',qs.stringify({
                singer: singer.value,
                name: name.value,
                src: `${ BASE_URL }/music/${src.value}`
            }),{ timeout: 180000 })
                .then((response)=>{
                    if(response.data === 2){
                        message.success("发布成功");
                    }else{
                        message.error("表单不合法");
                    }
                })
                .catch((error)=>{
                    message.error(error.response.status);
                })
        }
    }
    clearUpInput=()=>{
        document.getElementsByName("name")[0].value = "";
        document.getElementsByName("singer")[0].value = "";
        document.getElementsByName("src")[0].value = "";

    }
    render(){
        const props = {
            name: 'file',
            action: '/thisblog/api/EditMusic',
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
        return(
            <div className="add-music">
                <Input name="singer" type="text" placeholder="艺术家"/>
                <Input name="name" type="text" placeholder="歌曲"/>
                <UploadAvatar/>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 你的音乐
                    </Button>
                </Upload>
                <Input name="src" type="text" placeholder="https://www.xxx.com/music/xxx.mp3"/>
                <Button className="publish-button" type="primary" style={{marginBottom:"10px"}} onClick={this.submitMusicInfo}>
                    发布
                </Button>
                <a href="javascript:" style={{margin:"10px 0px"}} onClick={this.clearUpInput}>清空</a>
            </div>
        )
    }
}
