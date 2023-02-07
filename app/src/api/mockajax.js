// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'

const requests=axios.create({
    baseURL:'/mock',
    timeout:5000
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // 进度条开始动
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


