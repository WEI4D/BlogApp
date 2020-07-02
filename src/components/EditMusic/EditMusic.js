import React,{Component} from 'react';
import { Table, Divider, Input,Upload, message, Button, Icon } from 'antd';
import UploadAvatar from "../UploadAvatar/UploadAvatar";
import axios from 'axios';
import qs from 'qs';
export default class EditMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editTrigger: false,
            songId: "1",
            page: {
                start: 0,
                count: 10
            },
            total: 20,
            data: []
        }
    }
    editInfo=(id,e)=>{
        if(this.state.editTrigger&&this.state.songId === id){
            this.setState({
                editTrigger: !this.state.editTrigger,
                songId: id.toString()
            });

            return;
        }
        if(!this.state.editTrigger){
            this.setState({
                editTrigger: !this.state.editTrigger,
                songId: id.toString()
            });
        }
    }
    submitInfo=()=>{
        let name = document.getElementsByName("name")[0];
        let singer = document.getElementsByName("singer")[0];
        let src = document.getElementsByName("src")[0];
        axios.post("/thisblog/api/EditMusicInformation",qs.stringify({
            id: this.state.songId,
            name: name.value.length > 0 ? name.value : name.placeholder,
            singer: singer.value.length > 0 ? singer.value : singer.placeholder,
            src: src.value.length > 0 ? src.value : src.placeholder
        }),{ timeout: 180000 }).then(response=>{
            if(response.data == "2") {
                message.success("发布成功");
            }
            else{
                message.error("非法表单");
            }
        })
            .catch(error=>{
                message.error(error.response.status);
            });
        this.setState({
            editTrigger: false,
        })
    }
    getMusicInfo=(page,pageSize)=>{
        axios.get('/thisblog/api/GetMusicInfo',{
            params: {
                start: page == ""||page==null ? 0 : [0,10,21,31,41,51,61,71,81,91,101][page-1],
                count: 10
            },
            timeout: 180000
        })
            .then(response=>{
                this.setState({
                    data: response.data
                })
                if(response.data) message.success("更新成功")
                else message.error("更新失败")
            })
            .catch(error=>{
                message.error(error.response.status);
            });
    }
    getPaginationCount=()=>{
        axios.get('/thisblog/api/GetPaginationCount',{
            timeout: 180000
        })
            .then(response=>{
                this.setState({
                    total: parseInt(response.data)
                })
            })
    }
    componentDidMount() {
        this.getMusicInfo();
        this.getPaginationCount();
    }

    render() {
        const { Column, ColumnGroup } = Table;
        const props = {
            name: 'file',
            action: '/thisblog/api/EditMusicInfo',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {

                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const data = this.state.data;
        return(
            <div>
                <form>
                <Table dataSource={data} pagination={
                    {
                        total: this.state.total,
                        onChange: this.getMusicInfo
                    }
                }
                >
                    <ColumnGroup title="歌曲">
                        <Column title="艺术家" dataIndex="singer" key="firstName" width="15%"
                                render={(text,record) =>{if(record.id == this.state.songId && this.state.editTrigger){
                                    return <Input name="singer" type="text" placeholder={record.singer}/>
                                }else{return record.singer}}}
                        />
                        <Column title="曲名" dataIndex="name" key="lastName" width="20%"
                                render={(text,record) =>{if(record.id == this.state.songId && this.state.editTrigger){
                                    return <Input name="name" type="text" placeholder={record.name}/>
                                }else{return record.name}}} />
                    </ColumnGroup>
                    <Column title="封面" dataIndex="cover" key="age" width="10%"
                            render={(text,record) =>{
                                if(record.id == this.state.songId && this.state.editTrigger) {
                                    return <UploadAvatar/>
                                }else{return <img src={record.cover} alt={record.name} width="40"/>}}}/>
                    <Column title="音乐" dataIndex="id" width="10%"
                            render={() =>(
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> 你的音乐
                                    </Button>
                                </Upload>)}
                    />
                    <Column title="地址" dataIndex="src" key="address"
                            render={(text,record) =>{
                                if(record.id == this.state.songId && this.state.editTrigger) {
                                    return <Input name="src" type="text" placeholder={record.src}/>
                                }else{return record.src }}}
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) =>
                            (
                                <span>
                                    <a onClick={record.id == this.state.songId && this.state.editTrigger ? this.submitInfo:this.editInfo.bind(this,record.id)}>
                                        {record.id == this.state.songId && this.state.editTrigger ? "完成":"修改"}
                                    </a>
                                    <Divider type="vertical" />
                                    <a>
                                        Delete
                                    </a>
                                </span>
                            )
                        }
                    />
                </Table>
                </form>
            </div>
        );
    }
}
