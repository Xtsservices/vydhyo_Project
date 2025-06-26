import axios, { AxiosRequestConfig } from 'axios';

// Base API URL
const API_BASE_URL = 'http://192.168.1.42:3000';

// Helper to get token from localStorage (or any storage)
const getToken = () => localStorage.getItem('accessToken');

// Axios instance with token
const axiosWithToken = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to request if available
axiosWithToken.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Axios instance without token
const axiosWithoutToken = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// CRUD Operations with token
export const apiGet = (url: string, config?: AxiosRequestConfig) =>
    axiosWithToken.get(url, config);

export const apiPost = (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosWithToken.post(url, data, config);

export const apiPut = (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosWithToken.put(url, data, config);

export const apiDelete = (url: string, config?: AxiosRequestConfig) =>
    axiosWithToken.delete(url, config);

// CRUD Operations without token
export const apiGetWithoutToken = (url: string, config?: AxiosRequestConfig) =>
    axiosWithoutToken.get(url, config);

export const apiPostWithoutToken = (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosWithoutToken.post(url, data, config);

// File upload with token (multipart/form-data)
export const apiUploadFile = (
    url: string,
    file: File,
    fieldName: string = 'file',
    extraData: Record<string, any> = {},
    config?: AxiosRequestConfig
) => {
    const formData = new FormData();
    formData.append(fieldName, file);
    Object.entries(extraData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return axiosWithToken.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        ...config,
    });
};

// File upload without token (multipart/form-data)
export const apiUploadFileWithoutToken = (
    url: string,
    file: File,
    fieldName: string = 'file',
    extraData: Record<string, any> = {},
    config?: AxiosRequestConfig
) => {
    const formData = new FormData();
    formData.append(fieldName, file);
    Object.entries(extraData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return axiosWithoutToken.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        ...config,
    });
};