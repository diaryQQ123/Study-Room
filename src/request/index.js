import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  // baseURL: 'http://cbf6df82.natappfree.cc', // 设置基础URL
  timeout: 50000, // 设置超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('请求拦截器', config);

    // 例如，添加一个自定义的请求头
    config.headers['Content-Type'] = 'application/json';

    // 必须返回 config
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log('响应拦截器', response);

    // 必须返回 response
    return response;
  },
  error => {
    // 对响应错误做点什么
    console.error('响应错误', error);
    return Promise.reject(error);
  }
);

// 导出 Axios 实例
export default instance;