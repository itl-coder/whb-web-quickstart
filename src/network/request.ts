import axios from "axios";
import { ElMessage } from "element-plus";

// 导入所需要的样式
import 'nprogress/nprogress.css'
// 引入nprogress 进度条插件
// @ts-ignore
import NProgress from 'nprogress'

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 创建axios实例
let request = axios.create({
    baseURL: "http://localhost:8081",// import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    // 开启进度条
    NProgress.start();
    return config;
});
// 响应拦截器
request.interceptors.response.use((response) => {
    // 关闭进度条
    NProgress.done();
    return response.data;
}, (error) => {
    // 处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        default:
            msg = "无网络";
    }
    return Promise.reject(error);
});
export default request;