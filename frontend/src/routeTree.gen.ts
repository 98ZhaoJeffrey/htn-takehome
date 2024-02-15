/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'

// Create Virtual Routes

const LoginRouteLazyImport = createFileRoute('/login')()
const EventsRouteLazyImport = createFileRoute('/events')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const LoginRouteLazyRoute = LoginRouteLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.route.lazy').then((d) => d.Route))

const EventsRouteLazyRoute = EventsRouteLazyImport.update({
  path: '/events',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/events.route.lazy').then((d) => d.Route))

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/events': {
      preLoaderRoute: typeof EventsRouteLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginRouteLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  LayoutRoute,
  EventsRouteLazyRoute,
  LoginRouteLazyRoute,
])

/* prettier-ignore-end */
