import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// http request interceptors
api.interceptors.request.use(
    (axiosCfg) => {
        const config = { ...axiosCfg };
        config.baseURL = process.env.REACT_APP_SERVER_URL;

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default api;