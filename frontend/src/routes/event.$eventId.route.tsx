import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { Event } from '../components/pages/Event/Event'
import { getEvent } from '../utils/apiQueries'
import { NotFound } from '../components/pages/NotFound'
import axios from 'axios'

export const Route = createFileRoute('/event/$eventId')({
  beforeLoad: async ({context, location, params: { eventId } }) => {
    try {
      const auth = context.auth
      const event = await getEvent(Number(eventId))
      console.log(auth)
      if(!event) throw notFound()
      if(event.permission && event.permission === "private" && !auth.isAuthenticated()) {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        })
      }
      return { event }
    } catch (e) {
      if(axios.isAxiosError(e)) throw notFound()
      throw e
    }
  },
  component: Event,
  notFoundComponent: () => <NotFound message="This event doesn't exist right now. Check if the URL is correct"/>
})
