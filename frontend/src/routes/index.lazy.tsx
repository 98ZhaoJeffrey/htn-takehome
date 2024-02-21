import { createLazyFileRoute } from '@tanstack/react-router'
import { Home } from '../components/pages/Home/Home'

export const Route = createLazyFileRoute('/')({
  component: Home
})