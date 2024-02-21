import { useQueries } from "@tanstack/react-query"
import { getEvent } from "../../utils/apiQueries"


export const useMultipleEvents = (ids: number[]) => {
    return useQueries({
        queries: ids.map((id: number) => {
        return {
                queryKey: ['id', id],
                queryFn:async () => getEvent(id)
            }
        }),
        combine: (results) => {
            return ({
              data: results.map(result => result.data),
              pending: results.some(result => result.isPending),
            })
        }
    })
}