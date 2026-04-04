import { api } from './api'

export const ProductService = {
  list: () => api.get('/products'),

  detail: (id: number) => api.get(`/products/${id}`),

  purchase: (productId: number) =>
    api.post('/products/purchase', { productId }),
}