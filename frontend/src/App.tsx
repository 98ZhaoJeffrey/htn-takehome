import { RouterProvider, createRouter } from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core';
import { routeTree } from './routeTree.gen'
import '@mantine/core/styles.css';
import { AuthProvider } from './contexts/authContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  )
}

export default App
