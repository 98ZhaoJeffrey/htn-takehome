import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '../utils/TanStackRouterDevTools'
import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import { NotFound } from '../components/pages/NotFound'

const DefaultNotFound = () => {
  return (
    <>
      <Navbar/>
      <NotFound/>
    </> 
  )
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar/>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
  notFoundComponent: DefaultNotFound
})