import { useQuery } from "@tanstack/react-query"
import { getAllEvents } from "../../utils/apiQueries"
import { TEvent } from "../../types"

export const useEvents = (selectFn? : ((data: TEvent[]) => TEvent[])[]) => {
    return useQuery({
        queryKey: [],
        queryFn: getAllEvents,
        select: (data) => { 
          if(!selectFn) return data;
          return selectFn?.reduce((res, fn) => fn(res), data) 
        } // applies all filter and sorting functions we need on the data
    })
}