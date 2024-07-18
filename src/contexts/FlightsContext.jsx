import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FlightsContext = createContext()

export default function FlightProvider({ children }){
    const [flights, setFlights] = useState(null)
    const [savedFlights, setSavedFlights] = useState(localStorage.getItem("savedFlights") ? JSON.parse(localStorage.getItem("savedFlights")) : [])

    useEffect(() => {
        localStorage.setItem("savedFlights", JSON.stringify(savedFlights))
    }, [savedFlights])

    useEffect(() => {
        const getAllFlights = async() => {
            try {
                const flightsAPIEndpoint = import.meta.env.VITE_FLIGHTS_API_ENDPOINT

                const { data } = await axios.get(flightsAPIEndpoint)

                setFlights(data.flights)
            } catch(error){
                setFlights(null)
            }
        }

        getAllFlights()
    }, [])
    
    return <FlightsContext.Provider value={{ flights, setFlights, savedFlights, setSavedFlights }}>
        {children}
    </FlightsContext.Provider>
}