import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const HotelsContext = createContext()

export default function HotelProvider({ children }){
    const [hotels, setHotels] = useState(null)
    const [savedHotels, setSavedHotels] = useState(localStorage.getItem("savedHotels") ? JSON.parse(localStorage.getItem("savedHotels")) : [])

    useEffect(() => {
        localStorage.setItem("savedHotels", JSON.stringify(savedHotels))
    }, [savedHotels])

    useEffect(() => {
        const getAllHotels = async() => {
            try {
                const hotelsAPIEndpoint = import.meta.env.VITE_HOTELS_API_ENDPOINT

                const { data } = await axios.get(hotelsAPIEndpoint)

                setHotels(data.hotels)
            } catch(error){
                setHotels(null)
            }
        }

        getAllHotels()
    }, [])
    
    return <HotelsContext.Provider value={{ hotels, setHotels, savedHotels, setSavedHotels }}>
        {children}
    </HotelsContext.Provider>
}