import axios from "axios";

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 你可以在这里做发请求之前的操作 自定义的基础配置,可以被覆盖
        config = {
            method: "get", // 请求方法
            // 详细的配置文件参阅https://github.com/axios/axios#request-config
            timeout: 3000, // 超时时间，单位:  ms 毫秒
            withCredentials: false, // 是否携带coocie ， true: 是， false:否
            responseType: "json", // 表示服务器将响应的数据类型 // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            xsrfCookieName: "XSRF-TOKEN", // 是用作xsrf标记值的cookie的名称(不了解xsrf的可以自行搜索),
            xsrfHeaderName: "X-XSRF-TOKEN", // 是带有xsrf标记值的http标头的名称
            onUploadProgress: function(progressEvent) {
                // 允许处理上传的进度事件
                // Do whatever you want with the native progress event
            },
            headers: { ticked: "145646" },
            onDownloadProgress: function(progressEvent) {
                // Do whatever you want with the native progress event
            },
            validateStatus: function(status) {
                // 自定义有效的status,
                return status >= 200 && status < 300; // default
            },
            maxRedirects: 5, // 定义了node.js中要遵循的最大重定向数。
            ...config,
        };

        // 对请求的数据做处理，因为axios 对于'get' 请求使用params接收数据，post,put,patch请求使用data接收数据
        // 这里处理一下使之统一使用data来接收

        if (
            typeof config.method === "string" &&
            config.method.toLocaleUpperCase() === "GET"
        ) {
            config = {
                ...config,
                params: config.data,
            };
            Reflect.deleteProperty(config, "data");
        } else {
            Reflect.deleteProperty(config, "params");
        }
        // 你还可以在这里继续做你想做的事...
        return config;
    },
    function(error) {
        // 你可以在这里处理请求错误
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        // 你可以在这里对响应数据做处理
        console.log(59, response);
        return response;
    },
    function(error) {
        // 你可以在这里处理响应错误
        return Promise.reject(error);
    }
);

export default axios;
