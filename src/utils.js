/****************************/
/*          图片预加载        */
/****************************/
const preloadImg =(url,data)=>{
    let imgList = [];
    if( url === "HOME" ){
        data.map((value,key)=>{
            imgList[key] = new Image();
            imgList[key].onload = ()=>{};
            imgList[key].src = value.src;
        });
    }else if( url === "DISPLAY"){
        let img = new Image();
        img.src = data.display;
        img.onload = ()=>{};
        img.src = data.display;
    }
}


/****************************/
/*          缓存页数         */
/***************************/
const setPagination =(key,value)=>{
    if(!key){
        console.error("CODE: 0");
        return false;
    }
    localStorage.setItem(key,JSON.stringify(value));
    return true;
}


/*        获取缓存页数        */
/* 0: key为空 1: rs: 对象为空 */
const getPagination =(key)=>{
    let rs = localStorage.getItem(key);
    if(rs){
        return rs;
    }else{
        return false;
    }
}


/****************************/
/*       判断缓存是否过期      */
/****************************/
const isExpire =(obj = { total: 100,date: 1573969054467 })=>{

        let now = new Date().getTime();
        let origin = obj.date;
        let days = (now - origin) / (1000 * 60 * 60 * 24);
        if(Math.abs( days ) > 1){
            return true;
        }
        return false;

}


/*****************************/
/*          缓存评论          */
/****************************/
const setRatings =(key,value)=>{
    if(!key){
        console.error("CODE: 0");
        return false;
    }
    sessionStorage.setItem(key,JSON.stringify(value));
    return true;
}


/*****************************/
/*          获取评论          */
/****************************/
const getRatings =(key)=>{
    let rs = sessionStorage.getItem(key);
    if(rs){
        return rs;
    }else{
        return false;
    }
};

/*****************************/
/*        获取浏览器宽度       */
/****************************/
const getBrowserWith= ()=>{
    return document.body.clientWidth;
};


/*****************************/
/*         获取用户设备        */
/*         true: 移动端       */
/*         false: PC端       */
/****************************/
const getDeviceInfo= ()=>{
    let device = navigator.userAgent;
    let reg = /Android|webOS|iPhone|iPod|BlackBerry/gi;
    if(reg.test(device)){
        return true;
    }else{
        return false;
    }
}

export {
    preloadImg,
    setPagination,
    getPagination,
    isExpire,
    setRatings,
    getRatings,
    getBrowserWith,
    getDeviceInfo,
}
