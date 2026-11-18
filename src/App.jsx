import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from '@/app/Layout'
import Home from '@/pages/Home'
import Departments from '@/pages/Departments'
import Department from '@/pages/Department'
import Product from '@/pages/Product'
import About from '@/pages/About'
import Gallery from '@/pages/Gallery'
import News from '@/pages/News'
import NewsArticle from '@/pages/NewsArticle'
import Contacts from '@/pages/Contacts'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {path: '/', element: <Navigate to="/ru" replace/>},
  {
    path: '/:lang',
    element: <Layout />,
    children:[
      { index: true, element: <Home />, handle: { heroHeader: true } },
      {path: 'departments', element: <Departments />},
      { path: 'departments/:deptSlug', element: <Department />, handle: { heroHeader: true } },
      {path: 'departments/:depSlug/:productSlug', element: <Product />},
      {path: 'about', element: <About />},
      {path: 'news', element: <News />},
      {path: 'gallery', element: <Gallery />},
      {path: 'news/:newsSlug', element: <NewsArticle />},
      {path: 'contacts', element: <Contacts />},
      {path: '*', element: <NotFound />},
    ],
  }
])

export default function App(){
  return <RouterProvider router={router} />
}