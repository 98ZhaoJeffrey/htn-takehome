import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '../utils/TanStackRouterDevTools'
import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import { NotFound } from '../components/pages/NotFound'
import { AuthContext } from '../context/Auth/authContext'

interface RouterContext {
  auth: AuthContext
}

const DefaultNotFound = () => {
  return (
    <>
      <Navbar/>
      <NotFound/>
    </> 
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
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