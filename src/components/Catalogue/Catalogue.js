import React,{Component} from 'react';
import { Link } from "react-router-dom";
export default class Catalogue extends Component{
    constructor(props) {
        super(props);
        this.state = {
            catalogue:[
                {
                    title: "JavaScript高级程序设计",
                    to:'/notes/content'
                },
                {
                    title: "Thinking in Java",
                    to:'/notes/content'
                },
                {
                    title: "计算机网络",
                    to:'/notes/content'
                },
                {
                    title: "数据结构",
                    to:'/notes/content'
                },
                {
                    title: "计算机操作系统",
                    to:'/notes/content'
                },
            ]
        };
    }
    componentDidMount() {
        if(window.location.href.indexOf('blog') === -1){
            return;
        }else{
            this.setState({
                catalogue:[
                    {
                        title: "React",
                        to:'/blog/content'
                    },
                    {
                        title: "Vue",
                        to:'/blog/content'
                    },
                    {
                        title: "HTML&CSS",
                        to:'/blog/content'
                    },
                    {
                        title: "Ubuntu",
                        to:'/blog/content'
                    },
                ]
            })
        };
    }

    render() {
        return (
            <div className="note-list">
                {
                    this.state.catalogue.map((value, key) => {
                        return (
                            <div key={key} className="note-list-body">
                                <div className="note-list-block">
                                    <div className="post-list-block-container">
                                        <div className="block-label">
                                            <div className="block-title">
                                                <Link to={`${value.to}?id=${key}`}>
                                                    {value.title}
                                                </Link>
                                            </div>
                                            <div className="block-meta">
                                                <div className="block-meta-logo">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
