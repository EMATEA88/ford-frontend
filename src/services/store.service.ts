import { api } from './api'

export const StoreService = {
  list: (status = 'all') => api.get(`/store?status=${status}`),
  summary: () => api.get('/store/summary'),
}