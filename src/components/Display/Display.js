import React,{Component} from 'react';
import './display.css';
import "./dispaly-bg.css";
import axios from 'axios';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CodeBlock from './CodeBlock';
import ReactMarkdown from 'react-markdown/with-html';
import qs from "qs";
import Comment from "../Comment/Comment";
import {Tag} from "antd";
import NProgress from 'nprogress';
import '../../assets/css/nprogress.css';
import  { preloadImg,getBrowserWith,getDeviceInfo } from "../../utils";
export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : 1,
            info:{
                title:[
                    "宣父犹能畏后生，丈夫未可轻年少",
                    "兴酣落笔摇五岳，诗成笑傲凌沧洲",
                    "仙人抚我顶，结发受长生",
                    "时命乃大谬，弃之海上行",
                    "拣尽寒枝不肯栖,寂寞沙洲冷",
                    "一点浩然气，千里快哉风",
                    "仰天大笑出门去，我辈岂是蓬蒿人",
                    "男儿何不带吴钩，收取关山五十州",
                    "古来青史谁不见，今见功名胜古人",
                    "一声鸡唱，万怪烟消云落",
                    "大风起兮云飞扬，安得猛士兮守四方"
                ][Math.floor(Math.random()*10)],
                publish: new Date().getDate(),
                classify: "WEID",
                rating:'47',
                view:'47',
                display: "",
                tag:"React,高亮"
            },
            ratingCount:"7",
            toNavBar: "",
            background: ["one","two","third","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","twenty-one","twenty-two","twenty-three","twenty-four","twenty-five","twenty-six","twenty-seven","twenty-eight","twenty-nine","thirty","thirty-one"],
        }
    };

    async getBlogContent(){
        let data = {
            id:this.state.id,
            headers: {
                'content-type':'text/plain'
            }
        };
        let info = {};
        let markdown = {};
        axios.post('thisblog/api/DisplayBlog',qs.stringify(data),{ timeout:180000 }).then((response1)=>{
            info = response1.data;
            preloadImg("DISPLAY",info);
            axios.get(response1.data.content,{
                headers: {
                    'content-type':'text/plain'
                },
                timeout: 180000
            }).then((response2)=>{
                markdown = response2.data;
                this.setState({
                    info:info,
                    markdown: markdown
                },()=>{
                    NProgress.done();
                })
            });
        })

    };
    getRatingCount=(count)=>{
        this.setState({
            ratingCount: count
        })
    };
    componentWillMount() {
        let id = window.location.search.substr(4);
        this.setState({
            id: id
        });
        NProgress.start();
    };

    componentDidMount() {
        this.getBlogContent();
        if(getDeviceInfo()){
            let blogTitleWrapperNode = this.refs.blogTitleWrapper;
            let paddingLeft = window.getComputedStyle(blogTitleWrapperNode, null).paddingLeft;
            this.setState({
                toNavBar: paddingLeft,
            })

        }
    }

    render() {
        const markdown = this.state.markdown;
        const tagList = this.state.info.tag.split(",");
        const colorList = ["#f50","#2db7f5","#87d068","#108ee9","coral","salmon"];
        const { title,publish,classify,view } = this.state.info;
        return (
            <React.Fragment>
                <NavBar paddingLeft={ this.state.toNavBar }/>
                <div className="blog-header">
                    <div className={`blog-background part-${this.state.background[new Date().getDate()]}`} >

                    </div>
                    <div className="blog-wrapper">
                        <div ref="blogTitleWrapper" className="blog-title-wrapper">
                            <div className="blog-title">
                                {
                                    title
                                }
                            </div>
                            <div className="blog-publish-classify-ratings-views">
                                {
                                    publish+" "
                                }·
                                {
                                    " "+classify+" "
                                }·
                                {
                                    ` 评论: ${this.state.ratingCount} `
                                }·
                                {
                                    ` 观看: ${view}`
                                }
                            </div>
                            <div>
                                {
                                    tagList.map((tag,key)=>{
                                        return(<Tag key={key} color={colorList[key]}>{tag}</Tag>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <article className="blog-content">
                    <ReactMarkdown
                        className="markdown-body"
                        source={ markdown }
                        escapeHtml={ false }
                        renderers={{
                            code: CodeBlock,
                        }}
                    />
                </article>
                <Comment getRatingCount={count=>this.getRatingCount(count)}/>
                <Footer/>
            </React.Fragment>
        );
    };
}
