import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TEvent } from "../../types"
import { API_URL } from "../../constants"

export const useEvents = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
          const { data } = await axios.get<TEvent[]>(API_URL)
          return data
        },
    })
}