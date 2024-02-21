import { Container, Flex, Text, Title, Grid } from "@mantine/core"
import { useEventById } from "../../hooks/useEvents/useEventById"
import { Link, getRouteApi } from '@tanstack/react-router'
import { IoMdArrowRoundBack } from "react-icons/io";
import { EventBadge } from "../EventBadge"
import { formatDate, formatTime } from "../../utils/formatTime"
import { TEvent, TSpeaker } from "../../types"
import { useMultipleEvents } from "../../hooks/useEvents/useMultipleEvents"
import { EventCard } from "../EventCard/EventCard"

const route = getRouteApi('/event/$eventId')

export function Event() {
    
    const { eventId } = route.useParams({})
  
    const { status, data, error, isFetching } = useEventById(Number(eventId))

    const relatedEventIds = data === undefined ? [] : data.related_events;
    const relatedEvents = useMultipleEvents(relatedEventIds)

    if(data){
      return (
        <Container fluid>
          <Link to="/events">
            <IoMdArrowRoundBack/>
          </Link>
          <Title order={1}>
            {data.name}
          </Title>
          <EventBadge eventType={data.event_type}/>
          <Text>
            {data.description}
          </Text>
          <Text c="dimmed" fz="sm">
              {formatDate(data.start_time)}: &nbsp;
              {formatTime(data.start_time)} - &nbsp;
              {formatTime(data.end_time)}
          </Text>
          <Flex>
            <Text>
              Speakers:
            </Text>
            {
              data.speakers.map((speaker: TSpeaker, index: number) => {
                return (
                  <Text key={index}>
                    {speaker.name}
                  </Text>
                )
              })
            }
          </Flex>
          {
            data.public_url ?           
              <Link to={data.public_url}>
                Public Url
              </Link> : <></>
          }
          <Link to={data.private_url}>
            Event page for Hackers
          </Link>

          <Text>
            Check out these events!
          </Text>
          <Grid>
            {relatedEvents.data.map((event: TEvent | undefined, index: number) => {
              if(event === undefined) return <></>
              return (
                <Grid.Col span={3}>
                  <EventCard
                    key={index}
                    id={event.id}
                    name={event.name}
                    event_type={event.event_type}
                    description={event.description}
                    start_time={event.start_time}
                    end_time={event.end_time}
                    permission={event.permission}
                  />
                </Grid.Col>
              )
            })}
           
          </Grid>

        </Container>
      )
    }
  }