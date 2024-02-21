import axios from "axios"
import { API_URL } from "../constants"
import { TEvent } from "../types"

export const getEvent = async (id: number) => {
    const { data } = await axios.get<TEvent>(`${API_URL}/${id}`)
    return data
}

export const getAllEvents = async () => {
    const { data } = await axios.get<TEvent[]>(API_URL)
    return data
}