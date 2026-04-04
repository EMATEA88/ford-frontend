import { api } from './api'

export const AppService = {

  /* ================= AUTH ================= */
  login: (data: { identifier: string; password: string }) =>
    api.post('/auth/login', data),

  register: (data: any) =>
    api.post('/auth/register', data),

  /* ================= PRODUCTS ================= */

  /* ================= STORE ================= */
  getStore: (status = 'all') =>
    api.get(`/store?status=${status}`),

  getStoreSummary: () =>
    api.get('/store/summary'),

  /* ================= TASK ================= */
  completeTask: () =>
    api.post('/task/complete'),

  getTaskStatus: () =>
    api.get('/task/status'),

  getTaskHistory: () =>
    api.get('/task/history'),

  /* ================= EARNINGS ================= */
  getEarnings: () =>
    api.get('/earnings'),

  /* ================= REFERRAL ================= */
  getTeam: () =>
    api.get('/referral/team'),

}