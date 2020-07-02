import React,{ Component } from 'react';
import {message} from 'antd';
import './music.css';
import axios from 'axios';
export default class Music extends Component {
    constructor(props){
        super(props);
        this.state = {
            musicWrapperControl: false, //右侧抽屉开关，false为关
            musicListControl: false, //上方抽屉开关，false为关
            playOrPause: false, //true为正在播放
            musicList: [
                {
                    name: "慢慢喜欢你",
                    singer: "莫文蔚",
                    cover: "https://www.ditto.ink/music/manmanxihuanni.jpg",
                    src: "https://www.ditto.ink/music/manmanxihuanni.mp3"
                }
            ],  //歌单
            currentSong: 0,  //当前播放的音乐
            currentDuration: {  //默认的歌曲时长
                movingTime: "00:00",
                duration: "03:47"
            },
            moving: 0,  //音乐秒数计数器
            barProgress: 0, //进度条
            start: 1,
            maxPage: 1,
            timer: ""
        }
    }

    musicWrapperControl=(e)=>{
        //只有当上方抽屉关闭时，才可关闭右侧抽屉
        if(this.state.musicListControl){
            e.preventDefault();
            return;
        }
        this.setState({
            musicWrapperControl: !this.state.musicWrapperControl
        },()=>{
            if (this.state.musicWrapperControl){
                this.setState({
                    musicListControl: false
                })
            }
        })
    }
    musicListControl=(e)=>{
        //右侧抽屉关闭时，无法打开上方抽屉
        if(!this.state.musicWrapperControl){
            e.preventDefault();
            return;
        }
        this.setState({
            musicListControl: !this.state.musicListControl
        })
    }
    //播放暂停歌曲
    playOrPause =(e)=>{
        let audio = this.refs.ReactMusic;
        this.setState({
            playOrPause: !this.state.playOrPause
        });
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
    }
    //切换下一首歌，并初始化sate里的数据和定时器
    preSong=()=>{
        let current = this.state.currentSong;
        if(current === 0){
            this.setState({
                currentSong: this.state.musicList.length - 1,
                playOrPause: true,
                currentDuration: {
                    movingTime: "00:00",
                    duration: "03:47"
                },
                moving: 0,
                barProgress: 0
            });
            clearInterval(this.state.timer);
        }else{
            this.setState({
                currentSong: current - 1,
                playOrPause: true,
                currentDuration: {
                    movingTime: "00:00",
                    duration: "03:47"
                },
                moving: 0,
                barProgress: 0
            })
            clearInterval(this.state.timer);
        }
    }
    //切换上一首歌，并初始化sate里的数据和定时器
    nextSong=()=>{
        let current = this.state.currentSong;
        if(current === this.state.musicList.length-1){
            this.setState({
                currentSong: 0,
                playOrPause: true,
                currentDuration: {
                    movingTime: "00:00",
                    duration: "03:47"
                },
                moving: 0,
                barProgress: 0
            });
            clearInterval(this.state.timer)
        }else{
            this.setState({
                currentSong: current + 1,
                playOrPause: true,
                currentDuration: {
                    movingTime: "00:00",
                    duration: "03:47"
                },
                moving: 0,
                barProgress: 0
            });
            clearInterval(this.state.timer);
        }
    }
    //播放音乐列表里的歌曲
    playSong=(key)=>{
        if(this.state.currentSong === key){
            return;
        }
        this.setState({
            currentSong: key,
            playOrPause: true,
            currentDuration: {
                movingTime: "00:00",
                duration: "03:47"
            },
            moving: 0,
            barProgress: 0
        });
        clearInterval(this.state.timer);
    }
    getPaginationCount=()=>{
        axios.get('/thisblog/api/GetPaginationCount',{
            timeout: 180000
        })
            .then(response=>{
                this.setState({
                    maxPage: Math.ceil(parseInt(response.data)/10)
                });
            })
    }
    getMusicList=()=>{
        let start = this.state.start;
        axios.get('/thisblog/api/GetMusicInfo',{
            params: {
                start: [0,10,21,31,41,51,61,71,81,91,101][start-1],
                count: 10
            },
            timeout: 180000
        })
            .then(response=>{
                this.setState({
                    musicList: response.data
                })
            })
    }
    getPreSongList=()=>{
        if(this.state.start <= 1){
            message.error(":）这是第一页");
        }else{
            let audio = document.getElementsByTagName('audio')[0];
            audio.pause();
            this.setState({
                start: parseInt(this.state.start) - 1,
                currentSong: 0,
                playOrPause: true,
                currentDuration: {
                    movingTime: "00:00",
                    duration: "03:47"
                },
                moving: 0,
                barProgress: 0
            },()=>{
                let start = this.state.start;
                axios.get('/thisblog/api/GetMusicInfo',{
                    params: {
                        start: [0,10,21,31,41,51,61,71,81,91,101][start-1],
                        count: 10
                    },
                    timeout: 180000
                })
                    .then(response=>{
                        this.setState({
                            musicList: response.data
                        })
                    })
            });
            clearInterval(this.state.timer);
        }
    }
    getNextSongList=()=>{
        if(this.state.start >= this.state.maxPage){
            message.error(":)最后一页");
        }else{
            // let audio = document.getElementsByTagName('audio')[0];
            // audio.pause();
            this.setState({
                start: parseInt(this.state.start) + 1,
                currentSong: 0,
                playOrPause: true,
                currentDuration: {
                    movingTime: "00:00",
                    duration: "03:47"
                },
                moving: 0,
                barProgress: 0
            },()=>{
                clearInterval(this.state.timer);
                let start = this.state.start;
                axios.get('/thisblog/api/GetMusicInfo',{
                    params: {
                        start: [0,10,21,31,41,51,61,71,81,91,101][start-1],
                        count: 10
                    },
                    timeout: 180000
                })
                    .then(response=>{
                        this.setState({
                            musicList: response.data
                        })
                    })
            });
        }
    }
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log(nextState);
    //     // clearInterval(this.state.timer);
    // }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log(prevState);
    //     clearInterval(prevState.timer);
    // }

    componentDidMount() {
        this.getPaginationCount();
        this.getMusicList();
        let audio = document.getElementsByTagName('audio')[0];
        //音乐播放自动计时
        audio.addEventListener('play', ()=> {
            clearInterval(this.state.timer);
            //歌曲总时长
            let duration = audio.duration;
            //记录秒数，将state中的描述读取出来，实现暂停后继续累加
            let moving = this.state.moving;
            //定义了一些记录秒数，分钟数的中间变量
            let min = 0;
            let sec = 0;
            let zeroMin = "";
            let zeroSec = "";
            let totalMin = "";
            let totalSec = "";
            let tm = 0;
            let ts = 0;
            //速度v，路程s为100，时间t，已走路程sed
            let s = 100;
            let t = duration;
            let v = s/t;
            let sed = this.state.barProgress;
            //对歌曲总时长进行格式化
            if(duration > 60){
                tm = parseInt(duration/60);
                ts = Math.ceil(duration % 60);
                totalMin = tm < 10 ? `0${tm}`:`${tm}`;
                totalSec = ts < 10 ? `0${ts}`:`${ts}`;
            }
            //全局定时器
            this.state.timer = setInterval(()=>{
                moving++;
                sed = v + sed;
                //格式化时间
                if(moving > 60){
                    min = parseInt(moving / 60);
                    sec =  Math.ceil(moving % 60);
                    zeroMin = min < 10 ? `0${min}` : `${min}`;
                    zeroSec = sec < 10 ? `0${sec}` : `${sec}`;
                }else{
                    zeroMin = "00";
                    zeroSec = moving < 10 ? `0${moving}` : `${moving}`;
                }
                //对格式化后的时间进行拼接得到最后的时间
                let finalTime = `${zeroMin}:${zeroSec}`;
                //将后续要用到的数据进行记录
                this.setState({
                    currentDuration: {
                        movingTime: finalTime,
                        duration: `${totalMin}:${totalSec}`
                    },
                    moving: moving,
                    barProgress: sed
                })
            },1000);
        });
        //音乐暂停停止计时
        audio.addEventListener('pause',()=>{
            clearInterval(this.state.timer);
        });
        //音乐结束自动切换下一首
        audio.addEventListener('ended',()=>{
            clearInterval(this.state.timer);
            this.nextSong();
        })
    }
    render(){
        return(
            <div className="music">
                <audio ref="ReactMusic"
                       src={
                           this.state.musicList[this.state.currentSong].src
                       }
                       autoPlay={this.state.playOrPause}>
                </audio>
                <div className="music-info">
                    <i className="music-cover" style={{backgroundImage:`url(${this.state.musicList[this.state.currentSong].cover})`}}></i>
                    <div className={this.state.musicWrapperControl ? "music-wrapper music-wrapper-on":"music-wrapper music-wrapper-off"}>
                        <div className="music-drawer-control"
                             onClick={this.musicWrapperControl}>
                            <i className="music-drawer-arrow"></i>
                        </div>
                        <div className="music-drawer">
                            <div className="music-progress-wrapper">
                                <div className="music-name">
                                    {this.state.musicList[this.state.currentSong].name}
                                </div>
                                <div className="music-progress">
                                    <div className="music-bar-static">
                                        <div className="music-ball" style={{left:`${this.state.barProgress}%`}}></div>
                                        <div className="music-bar-moving" style={{width:`${this.state.barProgress}%`}}></div>
                                    </div>
                                </div>
                                <div className="music-time">
                                    <div className="time-wrapper">
                                        <span ref="start" className="start" data-start={this.state.currentDuration.movingTime}></span>
                                        <span className="end" data-end={this.state.currentDuration.duration}></span>
                                    </div>
                                </div>
                            </div>
                            <div className="music-reaction">
                                <div className="music-song music-next-list icon-pre" onClick={this.getPreSongList}></div>
                                <div className="music-song song-pre-play-next">
                                    <span className="song-pre icon-pre-song" onClick={this.preSong}></span>
                                    <span className={this.state.playOrPause ? "song-play-pause icon-pause":"song-play-pause icon-play"}
                                          onClick={this.playOrPause}>
                                    </span>
                                    <span className="song-next icon-next-song" onClick={this.nextSong}></span>
                                </div>
                                <div className="music-song music-previous-list icon-next" onClick={this.getNextSongList}>
                                    {/*<span className="play-model" onClick={}></span>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={this.state.musicListControl&&this.state.musicWrapperControl ? "music-list music-list-on":"music-list music-list-off"}>
                        <div className={this.state.musicWrapperControl ? "music-list-control music-list-control-on":"music-list-control music-list-control-off"}
                             onClick={this.musicListControl}>
                            <i className="music-list-arrow"></i>
                        </div>
                        <div className={this.state.musicWrapperControl ? "music-list-drawer music-list-drawer-on":"music-list-drawer music-list-drawer-off"}>
                            <ul className="music-list-wrapper">
                                {
                                    this.state.musicList.map((value,key)=>{
                                        return(
                                            <li key={key} className="icon-play-li" onClick={this.playSong.bind(this,key)}>
                                                {value.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
