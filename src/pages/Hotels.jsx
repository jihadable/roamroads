import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../style/Hotels.scss"
import { hotelsArray } from "../components/HotelsData";
import { IconWifi } from "@tabler/icons-react";
import { IconPool } from "@tabler/icons-react";
import { IconParking } from "@tabler/icons-react";
import { IconToolsKitchen2 } from "@tabler/icons-react";
import { IconElevator } from "@tabler/icons-react";
import { IconDisabled } from "@tabler/icons-react";
import { IconBarbell } from "@tabler/icons-react";
import { IconCalendarStats } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { IconHomeOff } from "@tabler/icons-react";
import { IconStar } from "@tabler/icons-react";
import { IconMapPinFilled } from "@tabler/icons-react";
import { IconBookmark } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";

function Hotels(){
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
        <IconWifi stroke={1.5} />,
        <IconPool stroke={1.5} />,
        <IconParking stroke={1.5} />,
        <IconToolsKitchen2 stroke={1.5} />,
        <IconElevator stroke={1.5} />,
        <IconDisabled stroke={1.5} />,
        <IconBarbell stroke={1.5} />,
        <IconCalendarStats stroke={1.5} />
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
                    <IconFilter stroke={1.5} />
                    <span>Filter</span>
                    <IconChevronDown stroke={1.5} className={`chevron ${showFilter ? "rotate" : ""}`} />
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
                        <span>City</span>
                        <IconChevronDown stroke={1.5} className={`${showCities ? "rotate" : ""}`} />
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
                        <span>Sort by</span>
                        <IconChevronDown stroke={1.5} className={`${showSort ? "rotate" : ""}`} />
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
                        <IconChevronDown stroke={1.5} className={`${showStarRating ? "rotate" : ""}`} />
                    </h4>
                    <div className={`content ${showStarRating ? "active" : ""}`}>
                        {
                            starRatingData.map((star, index) => {
                                return (
                                    <div className="star-item" key={index} onClick={() => {addRemoveFilter(star, "star")}}>
                                        <span className={`checkbox ${filters["star"].includes(star) ? "checked" : ""}`}>
                                            <IconCheck stroke={1.5} />
                                        </span>
                                        <span className="star-sum">
                                            <IconStar stroke={1.5} />
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
                        <IconChevronDown stroke={1.5} className={`${showFacilities ? "rotate" : ""}`} />
                    </h4>
                    <div className={`content ${showFacilities ? "active" : ""}`}>
                        {
                            facilitiesData.map((facility, index) => {
                                return (
                                    <div className="facility-option" key={index} onClick={() => {
                                        addRemoveFilter(facility, "facilities")
                                    }}>
                                        <span className={`checkbox ${filters.facilities.includes(facility) ? "checked" : ""}`}>
                                            <IconCheck stroke={1.5} />
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
                    <IconHomeOff stroke={1.5} />
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
                                        <IconStar stroke={1.5} />
                                        {hotel.stars}
                                    </div>
                                    <div className="hotel-review">
                                        {hotel.rate}/5 - {hotel.review} reviews
                                    </div>
                                    <div className="hotel-city">
                                        <IconMapPinFilled stroke={1.5} />
                                        {hotel.city}
                                    </div>
                                </div>
                            </div>
                            <div className="hotel-right">
                                <div className="hotel-price">{`$${hotel.price}`}</div>
                                <div className={`save-btn ${checkSavedItem(hotel) ? "saved" : ""}`} onClick={() => {addRemoveSaved(hotel)}}>
                                    <IconBookmark stroke={1.5} />
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