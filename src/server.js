import axios from 'axios';
import qs from 'qs';

let http = {
    get:"",
    post:"",
};

http.get = function(api,data){
    let params = qs.stringify(data);
    return new Promise((resolve,reject)=> {
            axios.get(api,params).then((res)=>{
                resolve(res);
            })
        }
    )
};

http.post = function(api,data){
    let params = qs.stringify(data);
    return new Promise((resolve,reject)=> {
            axios.post(api,params).then((res)=>{
                resolve(res);
            })
        }
    )
};

export default http
