import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = 'Bearer ' + accessToken
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
})

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response
}, async (error: AxiosError) => {
  console.log(error.response?.status)
  const originalRequest: any = error.config
  if (error.response?.status === 401 && !originalRequest?._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:3000/users/refresh-token', { refreshToken })
      const { accessToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      return axiosClient(originalRequest)
    } catch (refreshError) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
      return Promise.reject(refreshError)
    }
  }
  const errorData = error.response?.data as { message: string }
  const message = errorData.message as string | [string]
  if (Array.isArray(message)) {
    toast.error(message[0])
  } else {
    toast.error(message)
  }

  return Promise.reject(message);
})