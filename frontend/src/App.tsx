import { RouterProvider, createRouter } from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core';
import { routeTree } from './routeTree.gen'
import '@mantine/core/styles.css';
import { useAuth } from './hooks/useAuth/useAuth';
import { AuthProvider } from './context/Auth/authContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
const router = createRouter({ 
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// this is used to avoid errors with context not used with an auth provider
function InnerApp () {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <InnerApp/>
          </AuthProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  )
}

export default App
