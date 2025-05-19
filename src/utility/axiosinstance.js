import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:5100/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    });                 

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Adjust based on where you store the token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Include the token in the Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;