import { Container, Flex, Text, Title, Grid, Button, Paper, Center, LoadingOverlay } from "@mantine/core"
import { useEventById } from "../../../hooks/useEvents/useEventById"
import { Link, getRouteApi } from '@tanstack/react-router'
import { IoMdArrowRoundBack } from "react-icons/io";
import { EventBadge } from "../../EventBadge"
import { formatDate, formatTime } from "../../../utils/formatTime"
import { TEvent, TSpeaker } from "../../../types"
import { useMultipleEvents } from "../../../hooks/useEvents/useMultipleEvents"
import { EventCard } from "../../EventCard/EventCard"
import { GoLinkExternal } from "react-icons/go";

const route = getRouteApi('/event/$eventId')

export function Event() {
    
    const { eventId } = route.useParams({})
  
    const {data, isFetching } = useEventById(Number(eventId))

    const relatedEventIds = data === undefined ? [] : data.related_events;
    const relatedEvents = useMultipleEvents(relatedEventIds)

    if(data){
      return (
        <Container fluid m="1rem">
          <LoadingOverlay
                visible={isFetching}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
          />
          <Button radius="100" variant="light">
            <Link to="/events">
              <IoMdArrowRoundBack/>
            </Link>
          </Button>
          <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            <Grid.Col span={{"sm": 6, "lg": 8}}>            
                <Title order={1}>
                  {data.name}
                </Title>
                <Flex my="1rem">
                  <EventBadge eventType={data.event_type}/>
                  <Text c="dimmed" fz="sm">
                    {formatDate(data.start_time)}: &nbsp;
                    {formatTime(data.start_time)} - &nbsp;
                    {formatTime(data.end_time)}
                  </Text>
                </Flex>

                <Text>
                  {data.description}
                </Text>
            </Grid.Col>
            <Grid.Col span={{"sm": 6, "lg": 4}} >
            <Paper shadow="xs" withBorder p="xl">
              <Center>
                <Title order={2}>
                  Event details
                </Title>
              </Center>

              <Flex direction="column" gap="0.25rem" >
                <Text size="xl" fw="700">
                  Speakers:
                </Text>
                <ul>
                  {
                    data.speakers.map((speaker: TSpeaker, index: number) => {
                      return (
                        <li>
                          <Text key={index} size="md">
                            {speaker.name}
                          </Text>
                        </li>

                      )
                    })
                  }
                </ul>
              </Flex>
              <Flex direction="row" gap="1rem" w="100%">
                {
                  data.public_url ?
                  <Button 
                      fullWidth 
                      component="a"
                      href={data.public_url}
                      rightSection={<GoLinkExternal/>}
                  >
                    General event page
                  </Button>
                   : <></>       
                }

                  <Button 
                    fullWidth 
                    component="a"
                    href={data.private_url}
                    rightSection={<GoLinkExternal/>}
                  >
                    Event page for Hackers
                  </Button>

              </Flex>
            </Paper>
            </Grid.Col>
          </Grid>   
          <Text size="lg" fw="700">
            Check out these events!
          </Text>
          <Grid>
            {relatedEvents.data.map((event: TEvent | undefined, index: number) => {
              if(event === undefined) return <></>
              return (
                <Grid.Col span={{"sm": 6, "md": 3}}>
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