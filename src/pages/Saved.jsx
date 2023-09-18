import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../style/Saved.scss"
import { useEffect, useState } from "react"
import { IconCheck } from "@tabler/icons-react"
import { IconTrain } from "@tabler/icons-react"
import { IconArrowNarrowRight } from "@tabler/icons-react"
import { IconStar } from "@tabler/icons-react"
import { IconMapPinFilled } from "@tabler/icons-react"
import { IconBookmark } from "@tabler/icons-react"
import { IconBookOff } from "@tabler/icons-react"
import { IconPlaneDeparture } from "@tabler/icons-react"
import { IconPlaneInflight } from "@tabler/icons-react"

function Saved(){
    document.title = "RoamRoads | Saved"

    return (
        <>
            <Navbar />
            <SavedContainer />
            <Footer />
        </>
    )
}

function SavedContainer(){

    const [
        [savedHotels, setSavedHotels],
        [savedFlights, setSavedFlights],
        [savedTrains, setSavedTrains]
    ] = [
        useState(JSON.parse(localStorage.getItem("savedHotels"))),
        useState(JSON.parse(localStorage.getItem("savedFlights"))),
        useState(JSON.parse(localStorage.getItem("savedTrains"))),
    ]

    function removeSaved(item){
        if (!window.confirm("Are you sure to remove this item")){
            return
        }
        
        let newSaved
        if (item.list === "hotels"){
            newSaved = savedHotels
        }
        else if (item.list === "flights"){
            newSaved = savedFlights
        }
        else if (item.list === "trains"){
            newSaved = savedTrains
        }
        
        let index
        newSaved.forEach((saved, i) => {
            if (saved.id === item.id && saved.list === item.list){
                index = i
                
                return
            }
        })

        newSaved.splice(index, 1)

        if (item.list === "hotels"){
            setSavedHotels([...newSaved])
        }
        else if (item.list === "flights"){
            setSavedFlights([...newSaved])
        }
        else if (item.list === "trains"){
            setSavedTrains([...newSaved])
        }
    }

    const [savedItems, setSavedItems] = useState([
        ...savedHotels, ...savedFlights, ...savedTrains
    ])

    useEffect(() => {
        setSavedItems([...savedHotels, ...savedFlights, ...savedTrains])

        localStorage.setItem("savedHotels", JSON.stringify(savedHotels))
        localStorage.setItem("savedFlights", JSON.stringify(savedFlights))
        localStorage.setItem("savedTrains", JSON.stringify(savedTrains))
    }, [savedHotels, savedFlights, savedTrains])

    const trips = ["Hotels", "Flights", "Trains"]
    const [filters, setFilters] = useState([])

    function addRemoveFilter(filter){
        let newFilters = [...filters]
        
        let index = -1
        newFilters.forEach((newFilter, i) => {
            if (newFilter === filter){
                index = i

                return
            }
        })

        if (index > -1){
            newFilters.splice(index, 1)

            setFilters(newFilters)
        }
        else {
            setFilters(filters => {
                return [...filters, filter]
            })
        }
    }

    const [newSavedItems, setNewSavedItems] = useState([...savedItems])
    useEffect(() => {
        let array = []

        savedItems.forEach(item => {
            if (filters.length === 0 || filters.includes(item.list)){
                array.push(item)
            }
        })

        setNewSavedItems(array)
    }, [filters, savedItems])

    return (
        <section className={`saved-container ${newSavedItems.length === 0 ? "empty-saved" : ""}`}>
            <div className="product-filter">
                <div className="head">
                    <div className="header">Product Filter</div>
                    <div className="text">Showing result based on your criteria</div>
                </div>
                <div className="check-item">
                    {
                        trips.map((trip, index) => {
                            return (
                                <div className="trip-item" key={index} onClick={() => {
                                    addRemoveFilter(trip.toLowerCase())
                                }}>
                                    <div className={`item-checkbox ${filters.includes(trip.toLowerCase()) ? "checked" : ""}`}>
                                        <IconCheck stroke={1.5} />
                                    </div>
                                    <div className="item-label">{trip}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="filter-footer">
                    <div className="select-all" onClick={() => {setFilters(["hotels", "flights", "trains"])}}>Select all</div>
                    <div className="reset-filter"  onClick={() => {setFilters([])}}>Reset</div>
                </div>
            </div>
            {
            newSavedItems.length > 0 &&
            <div className="saved-list">
                <div className="head">
                    <div className="header">Saved List</div>
                    <div className="text">A place to keep all your favorite items!</div>
                </div>
                <div className="content">
                    {
                        newSavedItems.map((item, index) => {
                            return (
                                <div className="saved-item" key={index}>
                                    <div className="saved-item-left">
                                        {
                                            (item.list === "flights" || item.list === "trains") &&
                                            <>
                                            <div className="item-svg">
                                            {
                                                item.list === "flights" &&
                                                <IconPlaneDeparture stroke={1.5} />
                                            }
                                            {
                                                item.list === "trains" &&
                                                <IconTrain stroke={1.5} />
                                            }
                                            </div>
                                            <div className="item-info">
                                                <div className="item-list-name">
                                                    {item.list}
                                                </div>
                                                <h4 className="item-airline-train-name">
                                                    {
                                                    item.list === "flights" &&
                                                    <IconPlaneInflight stroke={1.5} />
                                                    }
                                                    {
                                                    item.list === "trains" &&
                                                    <IconTrain stroke={1.5} />
                                                    }
                                                    {item.list === "flights" ? item.airline : item.trainName}
                                                </h4>
                                                <div className="item-routes">
                                                    <div className="route">
                                                        <div className="route-time">
                                                            {item.departure > 9 ? `${item.departure}:00` : `0${item.departure}:00`}
                                                        </div>
                                                        <div className="route-city">
                                                            {item.route[0]}
                                                        </div>
                                                    </div>
                                                    <IconArrowNarrowRight stroke={1.5} />
                                                    <div className="route">
                                                        <div className="route-time">
                                                            {item.arrival > 9 ? `${item.arrival}:00` : `0${item.arrival}:00`}
                                                        </div>
                                                        <div className="route-city">
                                                            {item.route[1]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                        }
                                        {
                                            item.list === "hotels" &&
                                            <>
                                            <div className="item-img">
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className="item-info">
                                                <div className="item-list-name">
                                                    {item.list}
                                                </div>
                                                <h4 className="item-hotel-name">
                                                    {item.name}
                                                </h4>
                                                <div className="item-rating">
                                                    <div className="item-star">
                                                        <IconStar stroke={1.5} />
                                                        {item.stars}
                                                    </div>
                                                    <div className="line"></div>
                                                    <div className="item-rate">
                                                        {item.rate}/5 ({item.review})
                                                    </div>
                                                </div>
                                                <div className="item-location">
                                                    <IconMapPinFilled stroke={1.5} />
                                                    {item.city}
                                                </div>
                                            </div>
                                            </>
                                        }
                                    </div>
                                    <div className="saved-item-right">
                                        <div className="item-price">{item.list === "hotels" ? "$" : "IDR "}{item.price}</div>
                                        <div className="save-btn" onClick={() => {removeSaved(item)}} title="Remove">
                                            <IconBookmark stroke={1.5} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            }
            {
            newSavedItems.length === 0 &&
            <div className="empty">
                <div className="empty-svg">
                    <IconBookOff stroke={1.5} width={50} height={50} />
                </div>
                <div className="info">
                    <div className="header">No Saved Item Yet</div>
                    <div className="text">Start building your bucket list to compare and track the items you love!</div>
                </div>
            </div>
            }
        </section>
    )
}

export default Saved