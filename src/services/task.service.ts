import { api } from './api'

export const TaskService = {
  complete: () => api.post('/task/complete'),
  status: () => api.get('/task/status'),
  history: () => api.get('/task/history'),
}