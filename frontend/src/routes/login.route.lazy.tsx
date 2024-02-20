import { createLazyFileRoute } from '@tanstack/react-router'
import { Login } from '../components/pages/Login'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})