import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '../utils/TanStackRouterDevTools'
import { Suspense } from 'react'
import Navbar from '../components/Navbar'

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
})