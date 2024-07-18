import { IconArrowNarrowRight, IconBookmark, IconBookOff, IconCheck, IconMapPinFilled, IconPlaneDeparture, IconPlaneInflight } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { FlightsContext } from "../contexts/FlightsContext"
import { HotelsContext } from "../contexts/HotelsContext"
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

    const { savedHotels, setSavedHotels } = useContext(HotelsContext)
    const { savedFlights, setSavedFlights } = useContext(FlightsContext)

    const types = ["Hotel", "Penerbangan"]
    const [selectedTypes, setSelectedTypes] = useState([])

    const handleSelectedTypes = type => {
        if (checkSelectedTypes(type)){
            setSelectedTypes(selectedTypes => selectedTypes.filter(t => t !== type))
        }
        else {
            setSelectedTypes(selectedTypes => [...selectedTypes, type])
        }
    }

    const checkSelectedTypes = type => selectedTypes.includes(type)

    const handleRemove = id => {
        if (checkSavedHotels(id)){
            setSavedHotels(savedHotels => (savedHotels.filter(hotel => hotel.id !== id)))
        }
        else {
            setSavedFlights(savedFlights => (savedFlights.filter(hotel => hotel.id !== id)))
        }
    }

    const checkSavedHotels = id => {
        for (let hotel of savedHotels){
            if (hotel.id === id){
                return true
            }
        }

        return false
    }

    const [saved, setSaved] = useState([...savedHotels, ...savedFlights])

    useEffect(() => {
        if (selectedTypes.length !== 1){
            setSaved([...savedHotels, ...savedFlights])
        }
        else if (selectedTypes.includes("Hotel")){
            setSaved([...savedHotels])
        }
        else if (selectedTypes.includes("Penerbangan")){
            setSaved([...savedFlights])
        }
    }, [selectedTypes, savedHotels, savedFlights])

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
                        saved.map((item, index) => (
                            <div className="saved-item" key={index}>
                                <div className="saved-item-left">
                                {
                                    !checkSavedHotels(item.id) ?
                                    <>
                                    <div className="item-svg">
                                        <IconPlaneDeparture stroke={1.5} />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-list-name">Penerbangan</div>
                                        <h4 className="item-airline-train-name">
                                            <IconPlaneInflight stroke={1.5} />
                                            <span>{item.airline}</span>
                                        </h4>
                                        <div className="item-routes">
                                            <div className="route">
                                                <div className="route-time">{item.departure_time}</div>
                                                <div className="route-city">{item.departure_city}</div>
                                            </div>
                                            <IconArrowNarrowRight stroke={1.5} />
                                            <div className="route">
                                                <div className="route-time">{item.arrival_time}</div>
                                                <div className="route-city">{item.arrival_city}</div>
                                            </div>
                                        </div>
                                    </div>
                                    </> :
                                    <>
                                    <div className="item-img">
                                        <img src={`${imageAPIEndpoint}/hotels/${item.image}`} alt="" />
                                    </div>
                                    <div className="item-info">
                                        <div className="item-list-name">Hotel</div>
                                        <h4 className="item-hotel-name">{item.name}</h4>
                                        <div className="item-location">
                                            <IconMapPinFilled stroke={1.5} />
                                            <span>{item.city}</span>
                                        </div>
                                    </div>
                                    </>
                                }
                                </div>
                                <div className="saved-item-right">
                                    <div className="item-price">{getIdCurrency(item.price)}</div>
                                    <div className="save-btn" title="Remove" onClick={() => handleRemove(item.id)}>
                                        <IconBookmark stroke={1.5} />
                                    </div>
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