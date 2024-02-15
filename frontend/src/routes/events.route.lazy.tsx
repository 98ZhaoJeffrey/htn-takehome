import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/events')({
  component: Events,
})

function Events() {
  return (
    <div>Events</div>
  )
}