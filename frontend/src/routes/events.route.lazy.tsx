import { createLazyFileRoute } from '@tanstack/react-router'
import { Events } from '../components/pages/Events/Events'

export const Route = createLazyFileRoute('/events')({
  component: Events,
})