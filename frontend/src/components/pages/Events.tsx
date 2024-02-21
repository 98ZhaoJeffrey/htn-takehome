import { Flex, LoadingOverlay, Title, Container, Center } from "@mantine/core"
import { useEvents } from "../../hooks/useEvents/useEvents"
import { TEvent, TEventSort, TEventType } from "../../types"
import { EventCard } from "../EventCard/EventCard"
import { EventsSearchBar } from "../EventsSearchBar"
import { eventSortFunctions } from "../../constants"
import { useState } from "react"
import { createFilterEventsByName, createFilterEventsByType } from "../../utils/filterEvents"

export function Events() {

    const [searchValue, setSearchValue] = useState<string>("")
    const [eventFilters, setEventFilters] = useState<TEventType[]>([])
    const [eventSort, setEventSort] = useState<TEventSort>("Start Time")

    
    const { data, isFetching } = useEvents(
        [
            createFilterEventsByName(searchValue),
            createFilterEventsByType(eventFilters),
            eventSortFunctions[eventSort]
        ]
    ) // ideally, we use useCallback and debouncing if we had a large number of events


    return (
        <Container fluid>
            <Title order={1}>
                Events
            </Title>
            <Container mb="2rem" fluid>
                <EventsSearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    eventFilters={eventFilters}
                    setEventFilters={setEventFilters}
                    eventSort={eventSort}
                    setEventSort={setEventSort}
                />
            </Container>
            <LoadingOverlay
                visible={isFetching}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
            />
            <Center>
    `            <Flex direction="column" gap="1rem" align="center" w="50%">
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
                                permission={event.permission}
                            />
                        )
                    })}
                </Flex>
            </Center>

        </Container>
    )
}