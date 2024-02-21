import { TEvent } from "./types"


export const API_URL = "https://api.hackthenorth.com/v3/events"


type TEventSortToFunction = {
    [key: string]: (data: TEvent[]) => TEvent[];
};

export const eventSortFunctions: TEventSortToFunction = {
    "Start Time": (data: TEvent[]) => data.sort((a, b) => a.start_time - b.end_time),
    "Name (Alpha)" : (data: TEvent[]) => data.sort((a, b) => a.name.localeCompare(b.name)) 
}