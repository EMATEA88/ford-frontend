import { api } from './api'

export const EarningsService = {
  get: () => api.get('/earnings'),
}