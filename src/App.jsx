import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from '@/app/Layout'
import PageLoader from '@/components/ui/PageLoader'
import ErrorPage from '@/pages/ErrorPage'

const Home = lazy(() => import('@/pages/Home'))
const Departments = lazy(() => import('@/pages/Departments'))
const Department = lazy(() => import('@/pages/Department'))
const Product = lazy(() => import('@/pages/Product'))
const About = lazy(() => import('@/pages/About'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const News = lazy(() => import('@/pages/News'))
const NewsArticle = lazy(() => import('@/pages/NewsArticle'))
const Contacts = lazy(() => import('@/pages/Contacts'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const page = (el) => <Suspense fallback={<PageLoader />}>{el}</Suspense>

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/ru" replace />, errorElement: <ErrorPage /> },
  {
    path: '/:lang',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: page(<Home />), handle: { heroHeader: true } },
      { path: 'departments', element: page(<Departments />) },
      { path: 'departments/:deptSlug', element: page(<Department />), handle: { heroHeader: true } },
      { path: 'departments/:deptSlug/:productSlug', element: page(<Product />) },
      { path: 'about', element: page(<About />) },
      { path: 'gallery', element: page(<Gallery />) },
      { path: 'news', element: page(<News />) },
      { path: 'news/:newsSlug', element: page(<NewsArticle />) },
      { path: 'contacts', element: page(<Contacts />) },
      { path: '*', element: page(<NotFound />) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}