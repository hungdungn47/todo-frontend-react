
import { toast } from "react-toastify"
import { Task } from "../pages/Home/HomePage"
import { axiosClient } from "./axiosClient"


export const getAllTasks = async () => {
  const response = await axiosClient.get('/tasks')
  return response.data
}

export const updateTaskAPI = async (taskData: Task) => {
  const taskId = taskData._id;
  const response = await axiosClient.put(`/tasks/${taskId}`, taskData)
  return response.data
}

export const createTaskAPI = async (taskData: Task) => {
  const reqBody: any = {
    ...taskData
  }
  delete reqBody._id
  const response = await axiosClient.post(`/tasks`, reqBody)
  return response.data
}

export const deleteTaskAPI = async (taskId: string) => {
  const response = await axiosClient.delete(`/tasks/${taskId}`)
  return response.data
}

export const loginAPI = async (data: { email: string, password: string }) => {
  const response = await axiosClient.post(`/users/login`, data)
  const { accessToken, refreshToken } = response.data
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  return response.data
}

export const registerAPI = async (data: { username: string, email: string, password: string }) => {
  const response = await axiosClient.post(`/users/register`, data)
  return response.data
}

export const getUserInfoAPI = async () => {
  const response = await axiosClient.get('/users/info')
  return response.data
}