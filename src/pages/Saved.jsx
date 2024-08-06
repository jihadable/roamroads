import { IconArrowNarrowRight, IconBookmark, IconBookOff, IconCheck, IconMapPinFilled, IconPlaneDeparture, IconPlaneInflight } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { FavoritesContext } from "../contexts/FavoritesContext"
import "../style/Saved.scss"
import getIdCurrency from "../utils/getIdCurrency"
import NotFound from "./NotFound"

function Saved(){
    const { isLogin } = useContext(AuthContext)

    if (isLogin === false){
        return <NotFound />
    }
    if (isLogin === true){
        document.title = "RoamRoads | Simpanan"
    
        return (
            <>
                <Navbar />
                <SavedContainer />
                <Footer />
            </>
        )
    }
}

function SavedContainer(){

    const { favorites, setFavorites } = useContext(FavoritesContext)

    const types = ["Hotel", "Penerbangan"]
    const [selectedTypes, setSelectedTypes] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const handleSelectedTypes = type => {
        if (checkSelectedTypes(type)){
            setSelectedTypes(selectedTypes => selectedTypes.filter(t => t !== type))
        }
        else {
            setSelectedTypes(selectedTypes => [...selectedTypes, type])
        }
    }

    const checkSelectedTypes = type => selectedTypes.includes(type)

    const checkSavedHotels = id => {
        for (let favorite of favorites){
            if (favorite.favorite.id === id){
                if (favorite.type === "hotel"){
                    return true
                }
            }
        }

        return false
    }

    const handleRemove = async(id) => {
        try {
            setIsLoading(true)
            const favoritesAPIEndpoint = import.meta.env.VITE_FAVORITES_API_ENDPOINT
            const token = localStorage.getItem("token")
            
            const {data} = await axios.delete(`${favoritesAPIEndpoint}/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            
            setIsLoading(false)
            setFavorites(favorites.filter(favorite => favorite.favorite.id !== id))
        } catch (error) {
            setIsLoading(false)
            toast.error("Gagal menghapus simpanan")
        }
    }

    const [saved, setSaved] = useState(favorites)

    useEffect(() => {
        if (favorites !== null){
            if (selectedTypes.length !== 1){
                setSaved(favorites)
            }
            else if (selectedTypes.includes("Hotel")){
                setSaved(favorites.filter(favorite => favorite.type === "hotel"))
            }
            else if (selectedTypes.includes("Penerbangan")){
                setSaved(favorites.filter(favorite => favorite.type === "flight"))
            }
        }
    }, [selectedTypes, favorites])

    const imageAPIEndpoint = import.meta.env.VITE_IMAGES_API_ENDPOINT

    return (
        <section className="saved-container">
            <div className="product-filter">
                <div className="head">
                    <div className="header">Filter</div>
                </div>
                <div className="check-item">
                {
                    types.map((type, index) => (
                        <div className="trip-item" key={index} onClick={() => handleSelectedTypes(type)}>
                            <div className={`item-checkbox ${checkSelectedTypes(type) ? "checked" : ""}`}>
                                <IconCheck stroke={1.5} />
                            </div>
                            <div className="item-label">{type}</div>
                        </div>
                    ))
                }
                </div>
                <div className="filter-footer">
                    <div className="select-all" onClick={() => setSelectedTypes(["Hotel", "Penerbangan"])}>Pilih semua</div>
                    <div className="reset-filter" onClick={() => setSelectedTypes([])}>Reset</div>
                </div>
            </div>
            {
                saved !== null &&
                saved.length === 0 ?
                <div className="empty">
                    <div className="empty-svg">
                        <IconBookOff stroke={1.5} width={50} height={50} />
                    </div>
                    <div className="info">
                        <div className="header">Simpanan masih kosong</div>
                    </div>
                </div> :
                <div className="saved-list">
                    <div className="head">
                        <div className="header">Daftar simpanan</div>
                    </div>
                    <div className="content">
                    {
                        saved !== null &&
                        saved.map(({ favorite }, index) => (
                            <div className="saved-item" key={index}>
                                <div className="saved-item-left">
                                {
                                    !checkSavedHotels(favorite.id) ?
                                    <>
                                    <div className="item-svg">
                                        <IconPlaneDeparture stroke={1.5} />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-list-name">Penerbangan</div>
                                        <h4 className="item-airline-train-name">
                                            <IconPlaneInflight stroke={1.5} />
                                            <span>{favorite.airline}</span>
                                        </h4>
                                        <div className="item-routes">
                                            <div className="route">
                                                <div className="route-time">{favorite.departure_time}</div>
                                                <div className="route-city">{favorite.departure_city}</div>
                                            </div>
                                            <IconArrowNarrowRight stroke={1.5} />
                                            <div className="route">
                                                <div className="route-time">{favorite.arrival_time}</div>
                                                <div className="route-city">{favorite.arrival_city}</div>
                                            </div>
                                        </div>
                                    </div>
                                    </> :
                                    <>
                                    <div className="item-img">
                                        <img src={`${imageAPIEndpoint}/hotels/${favorite.image}`} alt="" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-list-name">Hotel</div>
                                        <h4 className="item-hotel-name">{favorite.name}</h4>
                                        <div className="item-location">
                                            <IconMapPinFilled stroke={1.5} />
                                            <span>{favorite.city}</span>
                                        </div>
                                    </div>
                                    </>
                                }
                                </div>
                                <div className="saved-item-right">
                                    <div className="item-price">{getIdCurrency(favorite.price)}</div>
                                {
                                    isLoading ?
                                    <div className="loader">
                                        <div className="spinner"></div>
                                    </div> :
                                    <div className="save-btn" title="Remove" onClick={() => handleRemove(favorite.id)}>
                                        <IconBookmark stroke={1.5} />
                                    </div>
                                }
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            }
        </section>
    )
}

export default Saved