import { useState, useEffect, useRef } from "react";
import Slider from "react-slider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../style/Flights.scss"
import { flightsArray } from "../components/FlightsData";

function Flights(){
    document.title = "RoamRoads | Flights"

    return (
        <>
            <Navbar />
            <FlightSearchContainer />
            <Footer />
        </>
    )
}

function FlightSearchContainer(){
    return (
        <>
            <section className="flight-search-container">
                <SearchFlights />
            </section>
        </>
    )
}

function SearchFlights(){

    const routeData = ["Kendari", "Yogyakarta", "Bandung", "Jakarta", "Surabaya", "Malang", "Bali", "Palembang", "Lombok", "Makassar", "Singapore", "Kuala Lumpur", "Seoul", "Tokyo", "Osaka", "Shanghai", "Sydney", "Melbourne", "Amsterdam"]
    const [showRoutes1, setShowRoutes1] = useState(false)
    const [showRoutes2, setShowRoutes2] = useState(false)

    const [route1, setRoute1] = useState("City")
    const [route2, setRoute2] = useState("City")

    const [filters, setFilters] = useState({
        route: [route1, route2],
        sort: "All",
        seat: "All",
        transitNumber: "All",
        transitDuration: [0, 12],
        airline: [],
        departure: [],
        arrival: [],
        facilities: []
    })

    const sortData = ["Highest price", "Lowest price"]
    const seatData = ["Economy", "Business"]
    const transitNumberData = ["Direct", 1, 2]
    const [transitDurationData, setTransitDurationData] = useState([0, 12])
    const airlineData = ["Quantum Air", "Nebula Airways","Stellar Airlines", "SkyWing", "Thunderbird", "Elysian Airways"]
    const departureData = [
        {
            title: "Night to morning",
            time: "00:00 - 06:00",
            range: [0, 6]
        },
        {
            title: "Morning to noon",
            time: "06:00 - 12:00",
            range: [6, 12]
        },
        {
            title: "Noon to evening",
            time: "12:00 - 18:00",
            range: [12, 18]
        },
        {
            title: "Evening to night",
            time: "18:00 - 24:00",
            range: [18, 24]
        }
    ]
    const arrivalData = [...departureData]
    const facilitiesData = ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]

    const [
        [showFilter, setShowFilter],
        [showSort, setShowSort],
        [showSeat, setShowSeat],
        [showTransitNumber, setShowTransitNumber],
        [showTransitDuration, setShowTransitDuration],
        [showAirline, setShowAirline],
        [showDeparture, setShowDeparture],
        [showArrival, setShowArrival],
        [showFacility, setShowFacility]
    ] = 
    [
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false)
    ]

    const facilities = [
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-luggage" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M6 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 6v-1a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1"></path>
            <path d="M6 10h12"></path>
            <path d="M6 16h12"></path>
            <path d="M9 20v1"></path>
            <path d="M15 20v1"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-salad" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z"></path>
            <path d="M18.5 11c.351 -1.017 .426 -2.236 .5 -3.714v-1.286h-2.256c-2.83 0 -4.616 .804 -5.64 2.076"></path>
            <path d="M5.255 11.008a12.204 12.204 0 0 1 -.255 -2.008v-1h1.755c.98 0 1.801 .124 2.479 .35"></path>
            <path d="M8 8l1 -4l4 2.5"></path>
            <path d="M13 11v-.5a2.5 2.5 0 1 0 -5 0v.5"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wifi" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 18l.01 0"></path>
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-usb" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M12 17v-11.5"></path>
            <path d="M7 10v3l5 3"></path>
            <path d="M12 14.5l5 -2v-2.5"></path>
            <path d="M16 10h2v-2h-2z"></path>
            <path d="M7 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            <path d="M10 5.5h4l-2 -2.5z"></path>
        </svg>
    ]

    const addRemoveFilter = (filter, arrayName, title = "", time = "", range = "") => {

        if (arrayName === "departure" || arrayName === "arrival"){
            let newArray = [...filters[arrayName]]
            
            let index = -1
            newArray.forEach((filter, i) => {
                if (filter.title === title){
                    index = i

                    return
                }
            })
            
            if (index > -1){
                newArray.splice(index, 1)
                setFilters(filter => {
                    return (
                        {...filter, [arrayName]: newArray}
                    )
                })
            }

            else {
                setFilters(filter => {
                    return (
                        {...filter, [arrayName]: [...filters[arrayName], {title: title, time: time, range: range}]}
                    )
                })
            }
        }
        else {
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
    }

    function checkDepartureArrival(arrayName, title){
        for (let i = 0 ; i < filters[arrayName].length ; i++){
            if (filters[arrayName][i].title === title){
                return true
            }
            else {
                if (i === filters[arrayName].length - 1){
                    return false
                }
            }
        }
    }

    useEffect(() => {
        setFilters(filters => {
            return (
                {...filters, ["transitDuration"]: [...transitDurationData]}
            )
        })
    }, [transitDurationData])

    function selectAllBtn(arrayName){
        let array
        if (arrayName === "airline"){
            array = [...airlineData]
        }
        else if (arrayName === "departure"){
            array = [...departureData]
        }
        else if (arrayName === "arrival"){
            array = [...arrivalData]
        }
        else if (arrayName === "facilities"){
            array = [...facilitiesData]
        }

        setFilters(filters => {
            return (
                {...filters, [arrayName]: array}
            )
        })
    }

    function resetBtn(arrayName){
        setFilters(filters => {
            return (
                {...filters, [arrayName]: []}
            )
        })
    }

    const showRoute1Btn = useRef()
    const showRoute2Btn = useRef()
    
    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!showRoute1Btn.current.contains(e.target)){
                setShowRoutes1(false)
            }
            if (!showRoute2Btn.current.contains(e.target)){
                setShowRoutes2(false)
            }
        })
    }, [])

    useEffect(() => {
        setFilters(filters => {
            return {...filters, ["route"]: [route1, route2]}
        })
    }, [route1, route2])

    const today = new Date();
    let dayToday = today.getDate();
    if (dayToday < 10){
        dayToday = `0${dayToday}`
    }

    let monthToday = today.getMonth() + 1;
    if (monthToday < 10){
        monthToday = `0${monthToday}`
    }

    let yearToday = today.getFullYear();
    if (yearToday < 10){
        yearToday = `000${yearToday}`
    }
    else if (yearToday < 100){
        yearToday = `00${yearToday}`
    }
    else if (yearToday < 1000){
        yearToday = `0${yearToday}`
    }

    const [dateToday, setDateToday] = useState(
        yearToday + "-" + monthToday + "-" + dayToday
    )

    const dateChange = (e) => {
        setDateToday(e.target.value)
    }

    return (
        <>
            <div className="flight-search-filter">
                <div className="route-search">
                    <div className="routes">
                        <div className="route">
                            <div className="route-result" onClick={() => {setShowRoutes1(!showRoutes1)}} ref={showRoute1Btn}>
                                {route1}
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 10l6 6l6 -6h-12"></path>
                                </svg>
                            </div>
                            <div className={`route-menu ${showRoutes1 ? "active" : ""}`}>
                                {
                                    routeData.map((route, index) => {
                                        return (
                                            <div className="route-option" key={index} onClick={() => {
                                                setRoute1(route)
                                                setShowRoutes1(false)
                                            }}>{route}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l14 0"></path>
                            <path d="M15 16l4 -4"></path>
                            <path d="M15 8l4 4"></path>
                        </svg>
                        <div className="route">
                            <div className="route-result" onClick={() => {setShowRoutes2(!showRoutes2)}} ref={showRoute2Btn}>
                                {route2}
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-caret-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M6 10l6 6l6 -6h-12"></path>
                                </svg>
                            </div>
                            <div className={`route-menu route-menu-2 ${showRoutes2 ? "active" : ""}`}>
                                {
                                    routeData.map((route, index) => {
                                        return (
                                            <div className="route-option" key={index} onClick={() => {
                                                setRoute2(route)
                                                setShowRoutes2(false)
                                            }}>{route}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="date">
                        <input type="date" value={dateToday} onChange={dateChange} />
                    </div>
                </div>
                <div className="flight-search-content">
                    <div className="head">
                        <div className="header" onClick={() => {setShowFilter(!showFilter)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-filter" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
                            </svg>
                            Filter
                            <span className={`material-symbols-rounded ${showFilter ? "rotate" : ""}`}>expand_more</span>
                        </div>
                        <div className="reset-filter" onClick={() => {
                            setFilters({
                                route: [route1, route2],
                                sort: "All",
                                seat: "All",
                                transitNumber: "All",
                                transitDuration: [0, 12],
                                airline: [],
                                departure: [],
                                arrival: [],
                                facilities: []
                            })
                        }}>Reset</div>
                    </div>
                    <div className={`filter-content ${showFilter ? "active" : ""}`}>
                        <div className="line"></div>
                        <div className="sort">
                            <h4 className="head" onClick={() => {setShowSort(!showSort)}}>
                                Sort by
                                <span className={`material-symbols-rounded ${showSort ? "rotate" : ""}`}>expand_more</span>
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
                                                <span className={`circle ${filters.sort === sort ? "selected" : ""}`}></span>
                                                {sort}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="seat">
                            <h4 className="head" onClick={() => {setShowSeat(!showSeat)}}>
                                Seat
                                <span className={`material-symbols-rounded ${showSeat ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showSeat ? "active" : ""}`}>
                                {
                                    seatData.map((seat, index) => {
                                        return (
                                            <div className="seat-option" key={index} onClick={() => {
                                                if (filters.seat === seat){
                                                    seat = "All"
                                                }

                                                setFilters(filters => {
                                                    return (
                                                        {...filters, ["seat"]: seat}
                                                    )
                                                })
                                            }}>
                                                <span className={`circle ${filters.seat === seat ? "selected" : ""}`}></span>
                                                {seat}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="transit-number">
                            <h4 className="head" onClick={() => {setShowTransitNumber(!showTransitNumber)}}>
                                No of transit
                                <span className={`material-symbols-rounded ${showTransitNumber ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showTransitNumber ? "active" : ""}`}>
                                {
                                    transitNumberData.map((transitNumber, index) => {
                                        return (
                                            <div className="transit-number-option" key={index} onClick={() => {
                                                if (filters.transitNumber === transitNumber){
                                                    transitNumber = "All"
                                                }
                                                setFilters(filters => {
                                                    return (
                                                        {...filters, ["transitNumber"]: transitNumber}
                                                    )
                                                })
                                            }}>
                                                <span className={`circle ${filters.transitNumber === transitNumber ? "selected" : ""}`}></span>
                                                {transitNumber}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="transit-duration">
                            <h4 className="head" onClick={() => {setShowTransitDuration(!showTransitDuration)}}>
                                Transit duration (hour)
                                <span className={`material-symbols-rounded ${showTransitDuration ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showTransitDuration ? "active" : ""}`}>
                                <div className="transit-duration-option" onClick={() => {}}>
                                    <div className="duration-result">
                                        {transitDurationData[0]}h - {transitDurationData[1]}h
                                    </div>
                                    <div className="duration-range">
                                        <Slider className="slider" value={transitDurationData} onChange={setTransitDurationData} min={0} max={12} />
                                    </div>
                                    <div className="duration-label">
                                        <span>0h</span>
                                        <span>12h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="airline">
                            <h4 className="head" onClick={() => {setShowAirline(!showAirline)}}>
                                Airline
                                <span className={`material-symbols-rounded ${showAirline ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showAirline ? "active" : ""}`}>
                                {
                                    airlineData.map((airline, index) => {
                                        return (
                                            <div className="airline-option" key={index} onClick={() => {addRemoveFilter(airline, "airline")}}>
                                                <span className={`checkbox ${filters.airline.includes(airline) ? "checked" : ""}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                </span>
                                                {airline}
                                            </div>
                                        )
                                    })
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("airline")
                                    }}>Select all</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("airline")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="departure">
                            <h4 className="head" onClick={() => {setShowDeparture(!showDeparture)}}>
                                Departure time
                                <span className={`material-symbols-rounded ${showDeparture ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showDeparture ? "active" : ""}`}>
                                {
                                    departureData.map((departure, index) => {
                                        return (
                                            <div className="departure-option" key={index} onClick={() => {
                                                addRemoveFilter(departure, "departure", departure.title, departure.time, departure.range)
                                            }}>
                                                <span className={`checkbox ${checkDepartureArrival("departure", departure.title) ? "checked" : ""}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                </span>
                                                <div className="departure-option-choice">
                                                    <div className="title">{departure.title}</div>
                                                    <div className="time">{departure.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("departure")
                                    }}>Select all</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("departure")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="arrival">
                            <h4 className="head" onClick={() => {setShowArrival(!showArrival)}}>
                                Arrival time
                                <span className={`material-symbols-rounded ${showArrival ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showArrival ? "active" : ""}`}>
                                {
                                    arrivalData.map((arrival, index) => {
                                        return (
                                            <div className="arrival-option" key={index} onClick={() => {
                                                addRemoveFilter(arrival, "arrival", arrival.title, arrival.time, arrival.range)
                                            }}>
                                                <span className={`checkbox ${checkDepartureArrival("arrival", arrival.title) ? "checked" : ""}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                </span>
                                                <div className="arrival-option-choice">
                                                    <div className="title">{arrival.title}</div>
                                                    <div className="time">{arrival.time}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("arrival")
                                    }}>Select all</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("arrival")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="facilities">
                            <h4 className="head" onClick={() => {setShowFacility(!showFacility)}}>
                                Facilities
                                <span className={`material-symbols-rounded ${showFacility ? "rotate" : ""}`}>expand_more</span>
                            </h4>
                            <div className={`content ${showFacility ? "active" : ""}`}>
                                {
                                    facilitiesData.map((facility, index) => {
                                        return (
                                            <div className="facility-option" key={index} onClick={() => {
                                                addRemoveFilter(facility, "facilities")
                                            }}>
                                                <span className={`checkbox ${filters.facilities.includes(facility) ? "checked" : ""}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-check`} width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M5 12l5 5l10 -10"></path>
                                                    </svg>
                                                </span>
                                                {facilities[index]}
                                                {facility}
                                            </div>
                                        )
                                    })
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("facilities")
                                    }}>Select all</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("facilities")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FlightGrid filters={filters} />
        </>
    )
}

function FlightGrid(props){

    const filters = props.filters

    let arrayFlights = []

    flightsArray.forEach((flight) => {
        if (
            // route
            ((filters.route[0] === flight.route[0] || filters.route[0] === "City") && (filters.route[1] === flight.route[1] || filters.route[1] === "City")) &&
            // seat
            (filters.seat === "All" || flight.seat === filters.seat) &&
            // transitNumber
            (filters.transitNumber === "All" || flight.transitNumber === filters.transitNumber) &&
            // transitDuration
            (filters.transitDuration[0] <= flight.transitDuration && filters.transitDuration[1] >= flight.transitDuration) &&
            // airline
            (filters.airline.length === 0 || filters.airline.includes(flight.airline)) &&
            // departure
            (checkDepartureArrival("departure", flight.departure) || filters.departure.length === 0) &&
            // arrival
            (checkDepartureArrival("arrival", flight.arrival) || filters.arrival.length === 0) &&
            // facilities
            (filters.facilities.every(filter => flight.facilities.includes(filter)) || filters.facilities.length === 0)
        ){
            arrayFlights.push(flight)
        }
    })

    function checkDepartureArrival(arrayName, flight){
        for (let i = 0 ; i < filters[arrayName].length ; i++){
            if (filters[arrayName][i].range[0] <= flight && filters[arrayName][i].range[1] >= flight){
                return true
            }
            else {
                if (i === filters[arrayName].length - 1){
                    return false
                }
            }
        }
    }

    // sorting flights
    function sortArrayOfObjects(array, key, ascending = true) {
        return array.sort((a, b) => {
            const valueA = changeStrToNum(a[key]);
            const valueB = changeStrToNum(b[key]);
        
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
        arrayFlights = sortArrayOfObjects(arrayFlights, "price")
    }
    else if (filters.sort === "Highest price"){
        arrayFlights = sortArrayOfObjects(arrayFlights, "price", false)
    }

    function changeStrToNum(str){
        let array = str.split("")
        let index 
        for (let i = 0 ; i < str.length ; i++){
            if (array[i] === "."){
                index = i
                array.splice(index, 1)
            }
        }

        array = array.join("")

        return parseInt(array)
    }

    const facilities = {
        baggage: 
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-luggage" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M6 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 6v-1a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1"></path>
            <path d="M6 10h12"></path>
            <path d="M6 16h12"></path>
            <path d="M9 20v1"></path>
            <path d="M15 20v1"></path>
        </svg>,
        inflightmeal: 
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-salad" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z"></path>
            <path d="M18.5 11c.351 -1.017 .426 -2.236 .5 -3.714v-1.286h-2.256c-2.83 0 -4.616 .804 -5.64 2.076"></path>
            <path d="M5.255 11.008a12.204 12.204 0 0 1 -.255 -2.008v-1h1.755c.98 0 1.801 .124 2.479 .35"></path>
            <path d="M8 8l1 -4l4 2.5"></path>
            <path d="M13 11v-.5a2.5 2.5 0 1 0 -5 0v.5"></path>
        </svg>,
        wifi: 
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wifi" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 18l.01 0"></path>
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0"></path>
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"></path>
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"></path>
        </svg>,
        powerusbport:
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-usb" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M12 17v-11.5"></path>
            <path d="M7 10v3l5 3"></path>
            <path d="M12 14.5l5 -2v-2.5"></path>
            <path d="M16 10h2v-2h-2z"></path>
            <path d="M7 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            <path d="M10 5.5h4l-2 -2.5z"></path>
        </svg>
    }

    // add to storage
    const [savedFlights, setSavedFlights] = useState(JSON.parse(localStorage.getItem("savedFlights")))

    function addRemoveSaved(item){
        let newSaved = [...savedFlights]

        let index = -1
        newSaved.forEach((saved, i) => {
            if (saved.id === item.id){
                index = i

                return
            }
        })

        if (index > -1){
            newSaved.splice(index, 1)

            setSavedFlights(newSaved)
        }
        else {
            setSavedFlights(saved => {
                return [...saved, item]
            })
        }
    }

    function checkSavedItem(item){
        for (let i = 0 ; i < savedFlights.length ; i++){
            if (savedFlights[i].id === item.id){
                return true
            }
            else if (i === savedFlights.length - 1){
                return false
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("savedFlights", JSON.stringify(savedFlights))
    }, [savedFlights])

    const [showFlightDetail, setShowFlightDetail] = useState(false)
    const flightDetailRef = useRef()

    const [flightDetail, setFlightDetail] = useState({
        route: ["Jakarta", "Melbourne"],
        airline: "Elysian Airways",
        transitNumber: 1,
        transitDuration: 4,
        transitCity: ["Denpasar"],
        transitTime: [20, 0],
        departure: 19,
        arrival: 3,
        seat: "Business",
        price: "5.876.000",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    })

    return (
        <div className={`flight-search-grid ${arrayFlights.length === 0 ? "empty-flight" : ""}`}>
            {
                arrayFlights.length === 0 &&
                <div className="no-flights">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plane-off" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9.788 5.758l-.788 -2.758h3l4 7h4a2 2 0 1 1 0 4h-2m-2.718 1.256l-3.282 5.744h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h3"></path>
                        <path d="M3 3l18 18"></path>
                    </svg>
                    <div className="text-head">No flights available</div>
                    <div className="text">Lorem ipsum dolor sit amet.</div>
                </div>
            }
            {
                arrayFlights.map((flight, index) => {
                    return (
                        <div className="flight" key={index} onClick={() => {}}>
                            <div className="flight-left">
                                <div className="flight-name-seat">
                                    <h4 className="flight-name">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plane-inflight" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M15 11.085h5a2 2 0 1 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3l4 7z"></path>
                                            <path d="M3 21h18"></path>
                                        </svg>
                                        {flight.airline}
                                    </h4>
                                    <div className="flight-seat-facilities">
                                        <div className="flight-seat">
                                            {flight.seat}
                                        </div>
                                        <div className="flight-facilities">
                                            {
                                                flight.facilities.map((facility, index) => {
                                                    return (
                                                        <span className="facility" title={facility} key={index}>
                                                            {facility === "Power/USB Port" ? facilities["powerusbport"] : ""}
                                                            
                                                            {facility === "In-flight meal" ? facilities["inflightmeal"] : ""}
                                                            
                                                            {facility !== "Power/USB Port" && facility !== "In-flight meal" ? facilities[facility.toLowerCase()] : ""}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flight-routes">
                                    <div className="flight-route-from">
                                        <div className="from-time">{flight.departure < 10 ? `0${flight.departure}:00` : `${flight.departure}:00`}</div>
                                        <div className="from-city">{flight.route[0]}</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M5 12l14 0"></path>
                                        <path d="M15 16l4 -4"></path>
                                        <path d="M15 8l4 4"></path>
                                    </svg>
                                    <div className="flight-route-to">
                                        <div className="to-time">{flight.arrival < 10 ? `0${flight.arrival}:00` : `${flight.arrival}:00`}</div>
                                        <div className="to-city">{flight.route[1]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flight-right">
                                <div className="flight-price">IDR {flight.price}</div>
                                <div className="save-select">
                                    <div className={`save ${checkSavedItem(flight) ? "saved" : ""}`} onClick={() => {
                                        addRemoveSaved(flight)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                                        </svg>
                                    </div>
                                    <div className="select" onClick={() => {
                                        setShowFlightDetail(true)
                                        setFlightDetail({...flight})
                                    }}>Show details</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className={`flight-detail-container ${showFlightDetail ? "active" : ""}`} onClick={(e) => {
                if (!flightDetailRef.current.contains(e.target)){
                    setShowFlightDetail(false)
                }
            }}>
                <div className={`flight-details ${showFlightDetail ? "active" : ""}`} ref={flightDetailRef}>
                    <div className="header">
                        <div className="header-left">
                            <h4 className="airline-detail">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plane-inflight" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M15 11.085h5a2 2 0 1 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3l4 7z"></path>
                                    <path d="M3 21h18"></path>
                                </svg>
                                {flightDetail.airline}
                            </h4>
                            <div className="seat-detail">
                                Seat class: {flightDetail.seat}
                            </div>
                            <div className="facility-detail">
                                Facilities: {
                                    flightDetail.facilities.join(", ")
                                }
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="price-detail">
                                IDR {flightDetail.price}
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="routes">
                            <div className="route">
                                <div className="route-time-city">
                                    <div className="route-time">
                                        {flightDetail.departure > 9 ? `${flightDetail.departure}:00` : `0${flightDetail.departure}:00`}
                                    </div>
                                    <div className="route-city">
                                        {flightDetail.route[0]}
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 5l0 14"></path>
                                    <path d="M16 15l-4 4"></path>
                                    <path d="M8 15l4 4"></path>
                                </svg>
                                <div className="route-time-city">
                                    {
                                        flightDetail.transitNumber === "Direct" &&
                                        <>
                                        <div className="route-time">
                                            {flightDetail.arrival > 9 ? `${flightDetail.arrival}:00` : `0${flightDetail.arrival}:00`}
                                        </div>
                                        <div className="route-city">
                                            {flightDetail.route[1]}
                                        </div>
                                        </>
                                    }
                                    {
                                        flightDetail.transitNumber !== "Direct" &&
                                        <>
                                        <div className="route-time">
                                            {flightDetail.transitTime[0] > 9 ? `${flightDetail.transitTime[0]}:00` : `0${flightDetail.transitTime[0]}:00`}
                                        </div>
                                        <div className="route-city">
                                            {flightDetail.transitCity}
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>
                            {
                                flightDetail.transitNumber !== "Direct" &&
                                <div className="transit-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" strokeWidth="0" fill="#ff4d30"></path>
                                    </svg>
                                    Stop to change planes in {flightDetail.transitCity} ({flightDetail.transitDuration}h 0m)
                                </div>
                            }
                            {
                                flightDetail.transitNumber !== "Direct" &&
                                <div className="route">
                                    <div className="route-time-city">
                                        <div className="route-time">
                                            {flightDetail.transitTime[1] > 9 ? `${flightDetail.transitTime[1]}:00` : `0${flightDetail.transitTime[1]}:00`}
                                        </div>
                                        <div className="route-city">
                                            {flightDetail.transitCity}
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 5l0 14"></path>
                                        <path d="M16 15l-4 4"></path>
                                        <path d="M8 15l4 4"></path>
                                    </svg>
                                    <div className="route-time-city">
                                    <div className="route-time">
                                            {flightDetail.arrival > 9 ? `${flightDetail.arrival}:00` : `0${flightDetail.arrival}:00`}
                                        </div>
                                        <div className="route-city">
                                            {flightDetail.route[1]}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="save-select-detail">
                            <div className={`save ${checkSavedItem(flightDetail) ? "saved" : ""}`} onClick={() => {addRemoveSaved(flightDetail)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                                </svg>
                            </div>
                            <div className="select">Select</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flights