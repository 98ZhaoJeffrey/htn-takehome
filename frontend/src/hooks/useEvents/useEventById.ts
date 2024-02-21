import { useQuery } from "@tanstack/react-query"
import { getEvent } from "../../utils/apiQueries"

export const useEventById = (id: number) => {
    return useQuery({
        queryKey: ['id', id],
        queryFn: async () => getEvent(id),
    })
}