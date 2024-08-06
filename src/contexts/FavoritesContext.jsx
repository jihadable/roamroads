import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext()

export default function FavoritesProvider({ children }){
    const { isLogin } = useContext(AuthContext)
    const [favorites, setFavorites] = useState(null)

    useEffect(() => {
        const getAllFavorites = async() => {
            try {
                const favoritesAPIEndpoint = import.meta.env.VITE_FAVORITES_API_ENDPOINT                
                const token = localStorage.getItem("token")

                const { data } = await axios.get(favoritesAPIEndpoint, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                setFavorites(data.favorites)
            } catch (error) {
                setFavorites(null)
            }
        }

        getAllFavorites()
    }, [isLogin])

    return <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        {children}
    </FavoritesContext.Provider>
}