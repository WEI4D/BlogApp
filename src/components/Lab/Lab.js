import React,{Component} from 'react';
import { Table,Tag } from 'antd';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import './lab.css';
import axios from 'axios';
export default class Lab extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [
                {
                    key: '1',
                    name: '外卖App',
                    time: '2019-6',
                    info: '使用Vue',
                    tags: ['Vue', '前端','外卖'],
                    link: 'https://github.com/BLACKDONGG/Vue-ELeMe-App'
                },
                {
                    key: '2',
                    name: '博客管理系统',
                    time: "2019-7",
                    info: '前后端分离',
                    tags: ['React','Hibernate','Servlet','antd'],
                    link: 'https://github.com/BLACKDONGG/Blog-Manager'
                },
                {
                    key: '3',
                    name: '博客前台',
                    time: "2018-4",
                    info: '前端',
                    tags: ['React技术栈', 'antd'],
                    link: 'https://github.com/BLACKDONGG/React-Blog'
                },
                {
                    key: '4',
                    name: '网络爬虫',
                    time: "2018-4",
                    info: '抓取天猫某类目商品数据',
                    tags: ['Python', 'Selenium'],
                    link: 'https://github.com/BLACKDONGG/TMCrawl'
                },
                {
                    key: '5',
                    name: 'React-Singer',
                    time: "2019-8",
                    info: "使用react.js实现的音乐播放器",
                    tags: ['React','Player'],
                    link: "https://github.com/BLACKDONGG/react-singer"
                }
            ]
        }
    }
    getLabItem=()=>{
        axios.get("thisblog/api/GetLabItem",{
            timeout: 180000
        })
            .then((response)=>{
                this.setState({
                    data: response.data
                })
            })
    }
    render() {
        const columns = [
            {
                title: '项目',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '说明',
                dataIndex: 'info',
                key: 'info',
            },
            {
                title: '标签',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag.toLowerCase() === 'react') {
                                color = 'volcano';
                            }else if(tag.toLowerCase() === 'vue'){
                                color = 'blue';
                            }else if(tag.toLowerCase() === 'hibernate'){
                                color = 'purple';
                            }
                            return (
                                <Tag color={ color } key={ tag }>
                                    { tag }
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: 'Git',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href={ record.link } target="_blank">Go</a>
                    </span>
                ),
            },
        ];
        const data = this.state.data;
        return (
            <div>
                <NavBar/>
                <div className="table-wrapper">
                    <Table columns={columns} dataSource={data} defaultPageSize='10'/>
                </div>
                <Footer/>
            </div>
        )
    }
}
