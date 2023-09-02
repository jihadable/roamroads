import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../style/Hotels.scss"
import { hotelsArray } from "../components/HotelsData";

function Hotels(){

    document.body.classList.add("hotels-body")
    document.title = "RoamRoads | Hotels"

    return (
        <>
            <Navbar />
            <HotelSearchContainer />
            <Footer />
        </>
    )
}

function HotelSearchContainer(){
    return (
        <section className="hotel-search-container">
            <SearchHotels />
        </section>
    )
}

function SearchHotels(){

    // filter: city, price, star, facilities

    const [filters, setFilters] = useState({
        // city
        city: "All",
        // price
        sort: "All",
        // star
        star: [],
        // facilities
        facilities: []
    })

    const cityData = ["Kendari", "Yogyakarta", "Bandung", "Jakarta", "Bali", "Lombok", "Makassar"]
    const sortData = ["Highest price", "Lowest price", "Review score"]
    const starRatingData = [1,2,3,4,5]
    const facilitiesData = ["Wifi", "Swimming Pool", "Parking", "Restaurant", "Elevator", "Wheelchair Access", "Fitness Center", "Meeting Facilities"]
    
    const [
        [showFilter, setShowFilter],
        [showCities, setShowCities],   
        [showSort, setShowSort],
        [showStarRating, setShowStarRating],
        [showFacilities, setShowFacilities]
    ] = [
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false)
    ]
    
    const facilities = [
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 18l.01 0"></path>
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pool" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1"></path>
            <path d="M2 16a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1"></path>
            <path d="M15 12v-7.5a1.5 1.5 0 0 1 3 0"></path>
            <path d="M9 12v-7.5a1.5 1.5 0 0 0 -3 0"></path>
            <path d="M15 5l-6 0"></path>
            <path d="M9 10l6 0"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-parking" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 16v-8h4a2 2 0 0 1 0 4h-4"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tools-kitchen-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-elevator" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z"></path>
            <path d="M10 10l2 -2l2 2"></path>
            <path d="M10 14l2 2l2 -2"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-disabled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M11 7l0 8l4 0l4 5"></path>
            <path d="M11 11l5 0"></path>
            <path d="M7 11.5a5 5 0 1 0 6 7.5"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-barbell" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M2 12h1"></path>
            <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2"></path>
            <path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"></path>
            <path d="M9 12h6"></path>
            <path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"></path>
            <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2"></path>
            <path d="M22 12h-1"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-stats" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path>
            <path d="M18 14v4h4"></path>
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M15 3v4"></path>
            <path d="M7 3v4"></path>
            <path d="M3 11h16"></path>
        </svg>
    ]

    const addRemoveFilter = (filter, arrayName) => {
        if (filters[arrayName].includes(filter)){
            let newArray = [...filters[arrayName]]

            let index;
            newArray.forEach((newFilter, i) => {
                if (newFilter === filter){
                    index = i

                    return
                }
            })

            newArray.splice(index, 1)

            setFilters(filters => {
                return (
                    {...filters, [arrayName]: newArray}
                )
            })
        }
        else {
            setFilters(filters => {
                return (
                    {...filters, [arrayName]: [...filters[arrayName], filter]}
                )
            })
        }
    }

    return (
        <>
        <div className="hotel-search-filter">
            <div className="head">
                <div className="header" onClick={() => {setShowFilter(!showFilter)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-filter" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
                    </svg>
                    Filter
                    <span class={`material-symbols-rounded ${showFilter ? "rotate" : ""}`}>expand_more</span>
                </div>
                <div className="reset-filter" onClick={() => {
                    setFilters({
                        city: "All",
                        price: "All",
                        star: [],
                        facilities: []
                    })
                }}>Reset</div>
            </div>
            <div className={`filter-content ${showFilter ? "active" : ""}`}>
                <div className="line"></div>
                <div className="city">
                    <h4 className="head" onClick={() => {setShowCities(!showCities)}}>
                        City
                        <span class={`material-symbols-rounded ${showCities ? "rotate" : ""}`}>expand_more</span>
                    </h4>
                    <div className={`content ${showCities ? "active" : ""}`}>
                        {
                            cityData.map((city, index) => {
                                return (
                                    <div className="city-option" key={index} onClick={() => {
                                        if (filters.city === city){
                                            city = "All"
                                        }
                                        setFilters(filters => {
                                            return (
                                                {...filters, ["city"]: city}
                                            )
                                        })
                                    }}>
                                        <span className={`circle ${filters.city === city ? "selected" : ""}`}></span>
                                        {city} {city === "All" ? "cities" : ""}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="line"></div>
                <div className="price">
                    <h4 className="head" onClick={() => {setShowSort(!showSort)}}>
                        Sort by
                        <span class={`material-symbols-rounded ${showSort ? "rotate" : ""}`}>expand_more</span>
                    </h4>
                    <div className={`content ${showSort ? "active" : ""}`}>
                        {
                            sortData.map((sort, index) => {
                                return ( 
                                    <div className="sort-option" key={index} onClick={() => {
                                        if (filters.sort === sort){
                                            sort = "All"
                                        }
                                        setFilters(filters => {
                                            return (
                                                {...filters, ["sort"]: sort}
                                            )
                                        })
                                    }}>
                                        <span className={`circle ${filters.sort === sort ? "selected" : ""}`}>
                                        </span>
                                        {sort}
                                    </div>          
                                )
                            })
                        }
                    </div>
                </div>
                <div className="line"></div>
                <div className="star-rating">
                    <h4 className="head" onClick={() => {setShowStarRating(!showStarRating)}}>
                        <span>Stars rating</span>
                        <span class={`material-symbols-rounded ${showStarRating ? "rotate" : ""}`}>expand_more</span>
                    </h4>
                    <div className={`content ${showStarRating ? "active" : ""}`}>
                        {
                            starRatingData.map((star, index) => {
                                return (
                                    <div className="star-item" key={index} onClick={() => {addRemoveFilter(star, "star")}}>
                                        <span className={`checkbox ${filters["star"].includes(star) ? "checked" : ""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l5 5l10 -10"></path>
                                            </svg>
                                        </span>
                                        <span className="star-sum">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                                            </svg>
                                            {
                                                star
                                            }
                                        </span>
                                    </div>
                                )
                            })
                        }
                        <div className="stars-footer">
                            <div className="select-all-stars" onClick={() => {
                                setFilters(filters => {
                                    return (
                                        {...filters, ["star"]: [1,2,3,4,5]}
                                    )
                                })
                            }}>Select all</div>
                            <div className="reset-stars" onClick={() => {
                                setFilters(filters => {
                                    return (
                                        {...filters, ["star"]: []}
                                    )
                                })
                            }}>Reset</div>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="facilities">
                    <h4 className="head" onClick={() => {setShowFacilities(!showFacilities)}}>
                        <span>Facilities</span>
                        <span class={`material-symbols-rounded ${showFacilities ? "rotate" : ""}`}>expand_more</span>
                    </h4>
                    <div className={`content ${showFacilities ? "active" : ""}`}>
                        {
                            facilitiesData.map((facility, index) => {
                                return (
                                    <div className="facility-option" key={index} onClick={() => {
                                        addRemoveFilter(facility, "facilities")
                                    }}>
                                        <span className={`checkbox ${filters.facilities.includes(facility) ? "checked" : ""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l5 5l10 -10"></path>
                                            </svg>
                                        </span>
                                        {facilities[index]}
                                        <span className="facility-item">{facility}</span>
                                    </div>
                                )
                            })
                        }
                        <div className="facilities-footer">
                            <div className="select-all-facilities" onClick={() => {
                                setFilters(filters => {
                                    return (
                                        {...filters, ["facilities"]: ["Wifi", "Swimming Pool", "Parking", "Restaurant", "Elevator", "Wheelchair Access", "Fitness Center", "Meeting Facilities"]}
                                    )
                                })
                            }}>Select all</div>
                            <div className="reset-facilities" onClick={() => {
                                setFilters(filters => {
                                    return (
                                        {...filters, ["facilities"]: []}
                                    )
                                })
                            }}>Reset</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <HotelSearchGrid filters={filters} />
        </>
    )
}

function HotelSearchGrid(props){
    
    const filters = props.filters

    let arrayHotels = []

    hotelsArray.forEach((hotel) => {
        if (
            // city
            (hotel.city === filters.city || filters.city === "All") &&
            // star
            (filters.star.includes(hotel.stars) || filters.star.length === 0) &&
            // // facilities
            (filters.facilities.every(filter => hotel.facilities.includes(filter)) || filters.facilities.length === 0)
        ){
            arrayHotels.push(hotel)
        }
    })

    // sorting hotels
    function sortArrayOfObjects(array, key, ascending = true) {
        return array.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
        
            if (ascending) {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } 
            else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
            }
        
            return 0;
        });
    }
    if (filters.sort === "Lowest price"){
        arrayHotels = sortArrayOfObjects(arrayHotels, "price")
    }
    else if (filters.sort === "Highest price"){
        arrayHotels = sortArrayOfObjects(arrayHotels, "price", false)
    }
    else if (filters.sort === "Review score"){
        arrayHotels = sortArrayOfObjects(arrayHotels, "rate", false)
    }

    // add to storage
    const [savedHotels, setsavedHotels] = useState(JSON.parse(localStorage.getItem("savedHotels")))

    function addRemoveSaved(item){
        let newSaved = [...savedHotels]

        let index = -1
        newSaved.forEach((saved, i) => {
            if (saved.name === item.name){
                index = i

                return
            }
        })

        if (index > -1){
            newSaved.splice(index, 1)

            setsavedHotels(newSaved)
        }
        else {
            setsavedHotels(saved => {
                return [...saved, item]
            })
        }
    }

    function checkSavedItem(item){
        for (let i = 0 ; i < savedHotels.length ; i++){
            if (savedHotels[i].name === item.name){
                return true
            }
            else if (i === savedHotels.length - 1){
                return false
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("savedHotels", JSON.stringify(savedHotels))
    }, [savedHotels])

    return (
        <div className={`hotel-search-grid ${arrayHotels.length === 0 ? "empty-hotel" : ""}`}>
            {
                arrayHotels.length === 0 &&
                <div className="no-hotels">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12h-2l4.497 -4.497m2 -2l2.504 -2.504l9 9h-2"></path>
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2m0 -4v-3"></path>
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2m2 2v6"></path>
                        <path d="M3 3l18 18"></path>
                    </svg>
                    <div className="text-head">No hotels available</div>
                    <div className="text">Lorem ipsum dolor sit amet.</div>
                </div>
            }
            {
                arrayHotels.map((hotel, index) => {
                    return (
                        <div className="hotel" key={index}>
                            <div className="hotel-left">
                                <img className="hotel-img" src={hotel.img} alt={hotel.name} />
                                <div className="hotel-info">
                                    <h4 className="hotel-name">{hotel.name}</h4>
                                    <div className="hotel-rating">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                                        </svg>
                                        {hotel.stars}
                                    </div>
                                    <div className="hotel-review">
                                        {hotel.rate}/5 - {hotel.review} reviews
                                    </div>
                                    <div className="hotel-city">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor"></path>
                                        </svg>
                                        {hotel.city}
                                    </div>
                                </div>
                            </div>
                            <div className="hotel-right">
                                <div className="hotel-price">{`$${hotel.price}`}</div>
                                <div className={`save-btn ${checkSavedItem(hotel) ? "saved" : ""}`} onClick={() => {addRemoveSaved(hotel)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
    )
}

export default Hotels