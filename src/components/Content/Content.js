import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import http from '../../server';
import { Pagination } from "antd";
import axios from "axios";
import { message } from "antd/es";
import NProgress from 'nprogress';
import '../../assets/css/nprogress.css';
import  { preloadImg,getPagination,isExpire,setPagination,getDeviceInfo }  from "../../utils";
export default  class Content extends Component{
    constructor(props){
        super(props);
        this.state= {
            count:0,
            info: [],
            currentPage: 1,
            total:100
        }
    }

    async getBlogList(){
        const request = await http.post('thisblog/api/BlogList',{
            currentPage: this.state.currentPage
        });
        this.setState({
            info:request.data
        },()=>{
            NProgress.done();
            preloadImg("HOME",request.data);
        });

    }
    async getNecessaryInfomation(){
        const request = await http.post('thisblog/api/GetNecessaryInformation');
        let publicKey = request.data.publicKey;
        if(request.data.CODE !== "0" || request.data.CODE !== "1"){
            if(localStorage.getItem("key")&&localStorage.getItem("key") !== publicKey){
                localStorage.setItem("key",publicKey);
            }else{
                localStorage.setItem("key",publicKey);
            }
        }else{
            message.error("获取必要信息失败");
        }

    }
    getPageCount =()=>{
        axios.get('thisblog/api/Pagenation',{
            params:{
                total:true
            },
            timeout: 180000
        }).then((response)=>{
            let result = JSON.parse(response.data);
            this.setState({
                total: result.count
            });
            setPagination("Pagination",{ total: result.count,date: new Date().getTime() })
        }).catch(()=>{

        })
    }
    isGetPageCount =()=> {
        let isPagination = getPagination("Pagination");
        /*分页缓存判断*/
        if( !isPagination ){
            this.getPageCount();
        }else{
            if(isExpire( isPagination )){
                this.getPageCount();
            }else{
                let paginationCON = JSON.parse(isPagination);
                this.setState({
                    total: paginationCON.total
                });
            }
        }

    }
    getPage =(current)=>{
         axios.get('thisblog/api/BlogList',{
             params: {
                 currentPage: current
             },
             timeout: 180000
         }).then((response)=>{
             preloadImg("HOME",response.data);
             this.setState({
                 info: response.data,
                 currentPage: current
             });
         })
    }
    componentDidMount(){
        this.getBlogList();
        this.isGetPageCount();
        this.getNecessaryInfomation();
        // alert("网站正在测试，可能会有些问题。请谅解！");
    }


    render(){
        return(
            <div className="content">
                <div className="content-body">
                    <div className="content-body-body" style={ getDeviceInfo() ? { padding: "unset" }:{ padding: "0 0 0 170px" } }>
                        {
                            this.state.info.map((value) => {
                                return (
                                    <div className="content-body-item" style={ getDeviceInfo() ? {"flex": "unset"}:{}}>
                                        <div className="content-body-item-block block-left">
                                            <div className="content-body-item-block-background" style={{backgroundImage:'url('+value.src+')'}}>
                                            </div>
                                            <div className="content-body-item-block-cover reverse-light">
                                            </div>
                                            <Link to={ "/display?id="+value.blog_id }>
                                                <div className="content-body-item-detail">
                                                    <p className="words">
                                                        {
                                                            value.preface
                                                        }
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="content-body-item-label">
                                                <Link to="" className="content-body-item-title content-title">
                                                    {
                                                        value.title
                                                    }
                                                </Link>
                                                <div className="content-body-item-bottom">
                                                    <div className="content-body-classify classify-link">
                                                        <a className="content-body-item-title content-classify" href="">
                                                            {
                                                                value.classify
                                                            }
                                                        </a>
                                                    </div>
                                                    <div className="content-body-classify classify-logo" style={{backgroundImage:'url('+value.logo+')'}}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Pagination defaultPageSize={9} total={ this.state.total } simple defaultCurrent={1} onChange={this.getPage} style={{zIndex: 10}} />
            </div>
        )
    }
}
