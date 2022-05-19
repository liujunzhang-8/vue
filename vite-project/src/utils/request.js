import axios from 'axios';

const service = axios.create({
    baseURL: "http://127.0.0.1:4523/mock/1006727/"
})

service.interceptors.request.use(config => config)
service.interceptors.response.use(response => {
    return response
}, err => {
    return Promise.reject(err);
})

export default service;
