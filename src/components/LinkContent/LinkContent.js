import React,{ Component,CSSProperties } from 'react';
import { List, message, Avatar, Spin,Button,notification } from 'antd';
import reqwest from 'reqwest';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./linkcontent.css";
import Publish from "../Publish/Publish";
import NProgress from 'nprogress';
import '../../assets/css/nprogress.css';

const fakeDataUrl = 'thisblog/api/GetLinkList';

export default class LinkContent extends Component {
    state = {
        data:[],
        loading: false,
    };

    loadedRowsMap = {};

    componentDidMount() {
        NProgress.start();
        this.fetchData(res => {
            this.setState({
                data: res.results,
            },()=>{
                NProgress.done();
            });
        });
    }

    fetchData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            this.loadedRowsMap[i] = 1;
        }
        if (data.length == this.state.data.length) {
            message.warning('友链加载完毕');
            this.setState({
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };
    getTheLastLink = msg =>{
        this.setState({
            data: msg
        })
    }
    isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

    renderItem = ({ index, key, style }) => {
        const { data } = this.state;
        const item = data[index];
        return (
            <List.Item key={key} style={style}>
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.website}>{item.name}</a>}
                    description={item.email}
                />
                <div>
                    <a href={item.website}>
                        Go
                    </a>
                </div>
            </List.Item>
        );
    };

    render() {
        const { data } = this.state;
        const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
            <VList
                autoHeight
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                overscanRowCount={2}
                rowCount={data.length}
                rowHeight={73}
                rowRenderer={this.renderItem}
                onRowsRendered={onRowsRendered}
                scrollTop={scrollTop}
                width={width}
            />
        );
        const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
            <AutoSizer disableHeight>
                {({ width }) =>
                    vlist({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                        width,
                    })
                }
            </AutoSizer>
        );
        const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.handleInfiniteOnLoad}
                rowCount={data.length}
            >
                {({ onRowsRendered }) =>
                    autoSize({
                        height,
                        isScrolling,
                        onChildScroll,
                        scrollTop,
                        onRowsRendered,
                    })
                }
            </InfiniteLoader>
        );
        const openNotification = () => {
            let width = document.documentElement.clientWidth;
            const args = {
                message: 'Link Apply',
                description:
                    <div className="link-notification"><Publish pid="Link Apply" getTheLastLink={msg=> this.getTheLastLink(msg)} /></div>,
                duration:0,
                top: width <= 615? 80:24
            };
            notification.open(args);
        };

        return (
            <div className="LinkContent">
                <NavBar/>
                    <List>
                        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>
                        }
                        {this.state.loading && <Spin className="demo-loading"/>}
                    </List>
                <Button type="primary" onClick={openNotification}>
                    加入友链
                </Button>
                <Footer/>
            </div>
        );
    }
}
