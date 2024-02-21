import { createFileRoute, notFound } from '@tanstack/react-router'
import { Event } from '../components/pages/Event'
import { getEvent } from '../utils/apiQueries'
import { NotFound } from '../components/pages/NotFound'

export const Route = createFileRoute('/event/$eventId')({
  loader: async ({ params: { eventId } }) => {
    try {
      const event = await getEvent(Number(eventId))
      if (!event) {
        throw notFound()
      }
      return { event }
    } catch (e) {
      throw notFound()
    }
  },
  component: Event,
  notFoundComponent: () => <NotFound message="This event doesn't exist right now. Check if the URL is correct"/>
})
