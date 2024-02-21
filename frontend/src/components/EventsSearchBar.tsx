import { TextInput, Flex, MultiSelect, Select } from "@mantine/core"
import { FaSearch } from "react-icons/fa";
import { TEventSort, TEventType } from "../types";
import { Dispatch, SetStateAction } from "react";

interface EventsSearchBarProps {
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>,
    eventFilters: TEventType[],
    setEventFilters: Dispatch<SetStateAction<TEventType[]>>,
    eventSort: string,
    setEventSort: Dispatch<SetStateAction<TEventSort>>,
}

const EventFilters: TEventType[] = ["workshop", "activity", "tech_talk"]
const SortOrders: TEventSort[] = ["Start Time", "Name (Alpha)"]


export const EventsSearchBar = (props: EventsSearchBarProps) => {
    return (
        <Flex direction="row" justify="center" align="center" w="100%" gap="1rem" wrap={"wrap"}>
                <TextInput 
                    placeholder="Event name"
                    label="Search event name"
                    leftSection={<FaSearch/>} 
                    value={props.searchValue}
                    onChange={(e) => props.setSearchValue(e.target.value)}
                    size="lg"
                />
                <MultiSelect
                    label="Filter events"
                    placeholder="Pick event types"
                    data={EventFilters}
                    value={props.eventFilters}
                    onChange={(value) => props.setEventFilters(value as TEventType[])}
                    size="lg"
                />
                <Select
                    label="Sort events"
                    placeholder="Sort Events"
                    data={SortOrders}
                    defaultSearchValue="Start Time"
                    value={props.eventSort}
                    onChange={(value) => props.setEventSort(value ? value as TEventSort : "Start Time")}
                    size="lg"
                />
        </Flex>
    )
}