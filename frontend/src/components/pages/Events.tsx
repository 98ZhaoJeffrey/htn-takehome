import { Flex, LoadingOverlay, Title, Container } from "@mantine/core"
import { useEvents } from "../../hooks/useEvents/useEvents"
import { TEvent } from "../../types"
import { EventCard } from "../EventCard/EventCard"

export function Events() {
    //const queryClient = useQueryClient()
    const { status, data, error, isFetching } = useEvents()

    console.log(status, data, error, isFetching)
    return (
        <Container fluid>
            <Title order={1}>
                Events
            </Title>
            <LoadingOverlay
                visible={isFetching}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
            />
            <Flex direction="column" gap="1rem" align="center">
                {data?.map((event: TEvent, index: number) => {
                    return (
                        <EventCard 
                            key={index}
                            id={event.id}
                            name={event.name}
                            event_type={event.event_type}
                            description={event.description}
                            start_time={event.start_time}
                            end_time={event.end_time}
                        />
                    )
                })}
            </Flex>
        </Container>
    )
}