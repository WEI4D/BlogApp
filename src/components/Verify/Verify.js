import React,{Component} from'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './verify.css';
import axios from 'axios';
import qs from 'qs';
import MD5 from 'md5';
import { message } from "antd/es";

export default class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        if(this.props.trigger.trigger) return;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const random = "ANDEIYITIANJIANKUAHAIZHANCHANGJING".split("");
                let publicKey = "";
                for(let i = 1;i <= 7;i++ ){
                    publicKey += random[Math.floor(Math.random()*34)];
                };
                let password = MD5(values.password+publicKey);
                let data = {
                    username: values.username,
                    password: password,
                    publicKey: publicKey
                };
                console.log(password);
                data = qs.stringify(data);
                axios.post("/thisblog/api/VerifyManager",data,{ timeout: 180000 }).then((response)=>{
                    let code = parseInt(response.data);
                    this.props.trigger.loginTrigger(code);
                }).catch((response)=>{
                    let code = parseInt(response.data);
                    this.props.trigger.loginTrigger(code);
                })
            }
        });
    };
    isSession=()=>{
        if(this.props.trigger.count === -1){
            console.log(this.props.trigger.count);
            return;
        }
        axios.post("/thisblog/api/VerifyManager",{},{ timeout: 180000 }).then((response)=>{
            let code = parseInt(response.data);
            if(code === 0) return;
            this.props.trigger.loginTrigger(code);
        }).catch((error)=>{
            message.error(error.response.status);
        })
    }
    componentWillMount() {
        this.isSession();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrapper">
                <Form onSubmit={this.handleSubmit} action="thisblog/Verify" className="login-form">
                 <Form.Item>
                     {getFieldDecorator('username', {
                         rules: [{ required: true, message: 'Please input your username!' }],
                     })(
                         <Input
                             prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                             placeholder="Username"
                         />,
                     )}
                 </Form.Item>
                 <Form.Item>
                     {getFieldDecorator('password', {
                         rules: [{ required: true, message: 'Please input your Password!' }],
                     })(
                         <Input
                             prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                             type="password"
                             placeholder="Password"
                         />,
                     )}
                 </Form.Item>
                 <Form.Item>
                     <Button type="primary" htmlType="submit" className="login-form-button">
                         BINGO
                     </Button>
                 </Form.Item>
             </Form>
            </div>
        );
    }
}
Form.create({ name: 'normal_login' })(Verify);
