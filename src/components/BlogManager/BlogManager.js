import React,{Component} from 'react';
import {Link} from "react-router-dom";
import { Router, Route, Switch} from 'react-router'
import { Layout, Menu, Icon,Form,message } from 'antd';
import './blomanager.css';
import AddBlog from "../AddBlog/AddBlog";
import Verify from "../Verify/Verify";
import EditMusic from "../EditMusic/EditMusic";
import AddMusic from "../AddMusic/AddMusic";
import EditTimeline from "../EditTimeline/EditTimeline";
import AddTimeline from "../AddTimeline/AddTimeline";
import EditBlog from "../EditBlog/EditBlog";
export default class BlogManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            classify: 'Note',
            trigger: false,
            code: 0,
            count: 0
        }
    }

    loginTrigger=(msg)=>{
        if(msg === 2){
            this.setState({
                trigger:true,
                code: msg,
                count: 0
            })
        }else{
            this.setState({
                code: msg,
                count: -1
            })
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentDidMount() {

    }

    render() {
        const {Header, Sider, Content} = Layout;
        const history = require("history").createBrowserHistory();
        // this.state.trigger
        if (this.state.trigger) {
            return (
                <Router history={history}>
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <div className="logo"/>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1">
                                    <Link to="/blogmanager/addblog">
                                        <Icon type="edit"/>
                                        <span>撰文</span>
                                    </Link>
                                </Menu.Item>
                                {/*<Menu.Item key="2">*/}
                                    {/*<Link to="/blogmanager/editblog">*/}
                                        {/*<Icon type="edit"/>*/}
                                        {/*<span>博文管理</span>*/}
                                    {/*</Link>*/}
                                {/*</Menu.Item>*/}
                                <Menu.Item key="3">
                                    <Link to="/blogmanager/addmusic">
                                        <Icon type="folder-add"/>
                                        <span>上传音乐</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/blogmanager/addtimeline">
                                        <Icon type="scissor"/>
                                        <span>记录时光</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to="/blogmanager/editmusic">
                                        <Icon type="scissor"/>
                                        <span>编辑音乐</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to="/blogmanager/edittimeline">
                                        <Icon type="safety-certificate"/>
                                        <span>编辑时光</span>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{background: '#fff', padding: 0}}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Header>
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    background: '#fff',
                                    minHeight: "auto",
                                }}
                            >
                                <Switch>
                                    <Route path="/blogmanager/addblog" exact={true} component={AddBlog}/>
                                    <Route path="/blogmanager/editmusic" exact={true} component={EditMusic}/>
                                    <Route path="/blogmanager/addmusic" exact={true} component={AddMusic}/>
                                    <Route path="/blogmanager/addtimeline" exact={true} component={AddTimeline}/>
                                    <Route path="/blogmanager/edittimeline" exact={true} component={EditTimeline}/>
                                    <Route path="/blogmanager/editblog" exact={true} component={EditBlog}/>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Router>
            );
        } else {
            const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Verify);
            if(this.state.code === 0){
                return (
                    <div className="login">
                        <WrappedNormalLoginForm trigger={this}/>
                    </div>
                )
            }else if(this.state.code === 1){
                return (
                    <div className="login">
                        <WrappedNormalLoginForm trigger={this}/>
                        {
                            message.error('Error')
                        }
                    </div>
                )
            }else if(this.state.code === 2){
                return (
                    <div className="login">
                        <WrappedNormalLoginForm trigger={this}/>
                    </div>
                )
            }
        }
    }
}
