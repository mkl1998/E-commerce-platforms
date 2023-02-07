// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'

import store from "@/store";

const requests=axios.create({
    baseURL:'/api',
    timeout:5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // 进度条开始动
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nProgress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nProgress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('false'))
}
)

export default requests


