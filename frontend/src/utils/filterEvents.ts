import { TEvent, TEventType } from "../types";


//Higher order functions used by react query
export const createFilterEventsByName = (search: string) => (events: TEvent[]) => {
    return events.filter(item => {
        if(search.trim() === '') return true
        return item.name.toLowerCase().includes(search.toLowerCase())
    });
};

export const createFilterEventsByType = (types: TEventType[]) => (events: TEvent[]) => {
    return events.filter(item => {
        if(types.length === 0) return true
        return types.includes(item.event_type)
    });
};
