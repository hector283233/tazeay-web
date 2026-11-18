import { useQuery } from '@tanstack/react-query'
import { api } from './mock'

export const useDepartments = () =>
  useQuery({ queryKey: ['departments'], queryFn: api.departments })

export const useDepartment = (slug) =>
  useQuery({ queryKey: ['department', slug], queryFn: () => api.department(slug), enabled: !!slug })

export const useProducts = (dept) =>
  useQuery({ queryKey: ['products', dept], queryFn: () => api.products(dept), enabled: !!dept })

export const useProduct = (dept, slug) =>
  useQuery({ queryKey: ['product', dept, slug], queryFn: () => api.product(dept, slug), enabled: !!dept && !!slug })