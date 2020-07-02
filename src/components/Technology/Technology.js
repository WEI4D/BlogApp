import React,{Component} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import NProgress from 'nprogress';
import '../../assets/css/nprogress.css';
export default class Technology extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info: [
                {
                    time: new Date().getUTCFullYear(),
                    content: [
                        {
                            title: '安得倚天剑,跨海斩长鲸',
                            id: 47
                        }]
                }
            ]

        }
    }

    getContent() {
        let id = window.location.search.substr(4);
        axios.get('/thisblog/api/BookClassify', {
            params: {
                classify: "blog",
                id: id
            },
            timeout: 180000
        }).then((response) => {
            console.log(response.data);
            this.setState({
                info: response.data
            },()=>{
                NProgress.done();
            });
        })
    }

    componentDidMount() {
        this.getContent();
        NProgress.start();
    }

    render() {
        return (
            <div className="book-wrapper">
                {
                    this.state.info.map((value,key)=>{
                        return(
                            <div key={key} className="note-list">
                                <div className="note-time">
                                    {
                                        value.time
                                    }
                                </div>
                                {
                                    value.content.map((value,key)=>{
                                        return(
                                            <div key={ key } className="note-list-body">
                                                <div className="book-content-block">
                                                    <div className="post-list-block-container">
                                                        <div className="block-label">
                                                            <div className="block-title">
                                                                <Link to={`/display?id=${value.id}`} target="_blank">
                                                                    {
                                                                        value.title
                                                                    }
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
                    })
                }
            </div>
        )
    }
}
