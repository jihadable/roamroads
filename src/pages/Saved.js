import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../style/Saved.scss"
import { useEffect, useState } from "react"

function Saved(){

    document.body.classList.add("saved-body")
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
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M5 12l5 5l10 -10"></path>
                                        </svg>
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
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane-departure" width="24" height="" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z"></path>
                                                    <path d="M3 21h18"></path>
                                                </svg>
                                            }
                                            {
                                                item.list === "trains" &&
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-train" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M21 13c0 -3.87 -3.37 -7 -10 -7h-8"></path>
                                                    <path d="M3 15h16a2 2 0 0 0 2 -2"></path>
                                                    <path d="M3 6v5h17.5"></path>
                                                    <path d="M3 10l0 4"></path>
                                                    <path d="M8 11l0 -5"></path>
                                                    <path d="M13 11l0 -4.5"></path>
                                                    <path d="M3 19l18 0"></path>
                                                </svg>
                                            }
                                            </div>
                                            <div className="item-info">
                                                <div className="item-list-name">
                                                    {item.list}
                                                </div>
                                                <h4 className="item-airline-train-name">
                                                    {
                                                    item.list === "flights" &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane-inflight" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M15 11.085h5a2 2 0 1 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3l4 7z"></path>
                                                        <path d="M3 21h18"></path>
                                                    </svg>
                                                    }
                                                    {
                                                    item.list === "trains" &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-train" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M21 13c0 -3.87 -3.37 -7 -10 -7h-8"></path>
                                                    <path d="M3 15h16a2 2 0 0 0 2 -2"></path>
                                                    <path d="M3 6v5h17.5"></path>
                                                    <path d="M3 10l0 4"></path>
                                                    <path d="M8 11l0 -5"></path>
                                                    <path d="M13 11l0 -4.5"></path>
                                                    <path d="M3 19l18 0"></path>
                                                    </svg>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M5 12l14 0"></path>
                                                        <path d="M15 16l4 -4"></path>
                                                        <path d="M15 8l4 4"></path>
                                                    </svg>
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                                                        </svg>
                                                        {item.stars}
                                                    </div>
                                                    <div className="line"></div>
                                                    <div className="item-rate">
                                                        {item.rate}/5 ({item.review})
                                                    </div>
                                                </div>
                                                <div className="item-location">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor"></path>
                                                    </svg>
                                                    {item.city}
                                                </div>
                                            </div>
                                            </>
                                        }
                                    </div>
                                    <div className="saved-item-right">
                                        <div className="item-price">{item.list === "hotels" ? "$" : "IDR "}{item.price}</div>
                                        <div className="save-btn" onClick={() => {removeSaved(item)}} title="Remove">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                                            </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmark-off" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 3l18 18"></path>
                        <path d="M17 17v3l-5 -3l-5 3v-13m1.178 -2.818c.252 -.113 .53 -.176 .822 -.176h6a2 2 0 0 1 2 2v7"></path>
                    </svg>
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