import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FlightsContext = createContext()

export default function FlightProvider({ children }){
    const [flights, setFlights] = useState(null)

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
    
    return <FlightsContext.Provider value={{ flights, setFlights }}>
        {children}
    </FlightsContext.Provider>
}