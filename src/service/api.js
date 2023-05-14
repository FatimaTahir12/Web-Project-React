import axios from 'axios';

const API_URL = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processResponse(error));
    }

)

const processResponse = (response) => {
    if(response?.status === 200)
    {
        return {isSuccess: true, data: response.data};
    } else{
        return {isSuccess: false, data: response.data, msg: response?.msg, code: response?.code};
    }
}


export const SERVICE_URL = {
    signUpUser: {url: '/register', method: 'POST'},
}

const API = {};

for(const [key, value] of Object.entries(SERVICE_URL))
{
    API[key] = (body) => axiosInstance({url: value.url, method: value.method, data: body, responseType: value.responseType});
}

export {API};