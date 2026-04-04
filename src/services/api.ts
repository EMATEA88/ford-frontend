import axios from 'axios'

/* =========================
   AXIOS INSTANCE
========================= */

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3334/api',
})

/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Identificação do frontend
  config.headers['x-app'] = 'mobile'

  return config
})

/* =========================
   RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject(err)
  }
)

/* =========================
   AUTH
========================= */

// ✅ REGISTER (com referral obrigatório)
export const registerUser = async (
  phone: string,
  password: string,
  referralCode: string
) => {
  const { data } = await api.post('/auth/register', {
    phone,
    password,
    referralCode
  })

  return data
}

// ✅ LOGIN (corrigido para phone)
export const loginUser = async (
  phone: string,
  password: string
) => {
  const { data } = await api.post('/auth/login', {
    phone,
    password
  })

  if (data.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  return data
}

/* =========================
   USER
========================= */

export const getProfile = async () => {
  const { data } = await api.get('/user/me')
  return data
}

/* =========================
   PRODUCTS
========================= */

export const getProducts = async () => {
  const { data } = await api.get('/products')
  return data
}

export const buyProduct = async (productId: string) => {
  const { data } = await api.post('/investments/buy', {
    productId
  })
  return data
}

/* =========================
   DASHBOARD
========================= */

export const getDashboard = async () => {
  const { data } = await api.get('/dashboard')
  return data
}

/* =========================
   TRANSACTIONS
========================= */

export const getTransactions = async () => {
  const { data } = await api.get('/transactions')
  return data
}