import { RouterProvider, createRouter } from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core';
import { routeTree } from './routeTree.gen'
import '@mantine/core/styles.css';
import { AuthProvider } from './contexts/authContext';

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
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MantineProvider>
    </>
  )
}

export default App
