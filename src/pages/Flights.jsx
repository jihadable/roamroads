import { useState, useEffect, useRef } from "react";
import Slider from "react-slider"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../style/Flights.scss"
import { flightsArray } from "../components/FlightsData";
import { IconCheck } from "@tabler/icons-react";
import { IconLuggage } from "@tabler/icons-react";
import { IconSalad } from "@tabler/icons-react";
import { IconWifi } from "@tabler/icons-react";
import { IconUsb } from "@tabler/icons-react";
import { IconPlaneOff } from "@tabler/icons-react";
import { IconPlaneInflight } from "@tabler/icons-react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { IconBookmark } from "@tabler/icons-react";
import { IconArrowNarrowDown } from "@tabler/icons-react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { IconCaretDown } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";

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

    const routeData = ["All city", "Kendari", "Yogyakarta", "Bandung", "Jakarta", "Surabaya", "Malang", "Bali", "Palembang", "Lombok", "Makassar", "Singapore", "Kuala Lumpur", "Seoul", "Tokyo", "Osaka", "Shanghai", "Sydney", "Melbourne", "Amsterdam"]
    const [showRoutes1, setShowRoutes1] = useState(false)
    const [showRoutes2, setShowRoutes2] = useState(false)

    const [route1, setRoute1] = useState("All city")
    const [route2, setRoute2] = useState("All city")

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
    const facilitiesData = [
        {
            title: "Baggage", 
            svg: <IconLuggage stroke={1.5} />
        },
        {
            title: "In-flight meal", 
            svg: <IconSalad stroke={1.5} />
        },
        {
            title: "Wifi", 
            svg: <IconWifi stroke={1.5} />
        },
        {
            title: "Power/USB Port", 
            svg: <IconUsb stroke={1.5} />
        }
    ]

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
                                <span>{route1}</span>
                                <IconCaretDown stroke={1.5} width={16} height={16} />
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
                        <IconArrowNarrowRight stroke={1.5} />
                        <div className="route">
                            <div className="route-result" onClick={() => {setShowRoutes2(!showRoutes2)}} ref={showRoute2Btn}>
                                <span>{route2}</span>
                                <IconCaretDown stroke={1.5} width={16} height={16} />
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
                            <IconFilter stroke={1.5} />
                            <span>Filter</span>
                            <IconChevronDown stroke={1.5} className={`chevron ${showFilter ? "rotate" : ""}`} />
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

                            setTransitDurationData([0, 12])
                        }}>Reset</div>
                    </div>
                    <div className={`filter-content ${showFilter ? "active" : ""}`}>
                        <div className="line"></div>
                        <div className="sort">
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
                                                <span className={`circle ${filters.sort === sort ? "selected" : ""}`}></span>
                                                <span>{sort}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="seat">
                            <h4 className="head" onClick={() => {setShowSeat(!showSeat)}}>
                                <span>Seat</span>
                                <IconChevronDown stroke={1.5} className={`${showSeat ? "rotate" : ""}`} />
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
                                                <span>{seat}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="transit-number">
                            <h4 className="head" onClick={() => {setShowTransitNumber(!showTransitNumber)}}>
                                <span>No of transit</span>
                                <IconChevronDown stroke={1.5} className={`${showTransitNumber ? "rotate" : ""}`} />
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
                                                <span>{transitNumber}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="transit-duration">
                            <h4 className="head" onClick={() => {setShowTransitDuration(!showTransitDuration)}}>
                                <span>Transit duration (hour)</span>
                                <IconChevronDown stroke={1.5} className={`${showTransitDuration ? "rotate" : ""}`} />
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
                                <span>Airline</span>
                                <IconChevronDown stroke={1.5} className={`${showAirline ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showAirline ? "active" : ""}`}>
                                {
                                    airlineData.map((airline, index) => {
                                        return (
                                            <div className="airline-option" key={index} onClick={() => {addRemoveFilter(airline, "airline")}}>
                                                <span className={`checkbox ${filters.airline.includes(airline) ? "checked" : ""}`}>
                                                    <IconCheck stroke={1.5} />
                                                </span>
                                                <span>{airline}</span>
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
                                <span>Departure time</span>
                                <IconChevronDown stroke={1.5} className={`${showDeparture ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showDeparture ? "active" : ""}`}>
                                {
                                    departureData.map((departure, index) => {
                                        return (
                                            <div className="departure-option" key={index} onClick={() => {
                                                addRemoveFilter(departure, "departure", departure.title, departure.time, departure.range)
                                            }}>
                                                <span className={`checkbox ${checkDepartureArrival("departure", departure.title) ? "checked" : ""}`}>
                                                    <IconCheck stroke={1.5} />
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
                                <span>Arrival time</span>
                                <IconChevronDown stroke={1.5} className={`${showArrival ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showArrival ? "active" : ""}`}>
                                {
                                    arrivalData.map((arrival, index) => {
                                        return (
                                            <div className="arrival-option" key={index} onClick={() => {
                                                addRemoveFilter(arrival, "arrival", arrival.title, arrival.time, arrival.range)
                                            }}>
                                                <span className={`checkbox ${checkDepartureArrival("arrival", arrival.title) ? "checked" : ""}`}>
                                                    <IconCheck stroke={1.5} />
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
                                <span>Facilities</span>
                                <IconChevronDown stroke={1.5} className={`${showFacility ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showFacility ? "active" : ""}`}>
                                {
                                    facilitiesData.map((facility, index) => {
                                        return (
                                            <div className="facility-option" key={index} onClick={() => {
                                                addRemoveFilter(facility.title, "facilities")
                                            }}>
                                                <span className={`checkbox ${filters.facilities.includes(facility.title) ? "checked" : ""}`}>
                                                    <IconCheck stroke={1.5} />
                                                </span>
                                                {facility.svg}
                                                <span>{facility.title}</span>
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
            ((filters.route[0] === flight.route[0] || filters.route[0] === "All city") && (filters.route[1] === flight.route[1] || filters.route[1] === "All city")) &&
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
        baggage: <IconLuggage stroke={1.5} />,
        inflightmeal: <IconSalad stroke={1.5} />,
        wifi: <IconWifi stroke={1.5} />,
        powerusbport: <IconUsb stroke={1.5} />
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
        route: ["", ""],
        airline: "",
        transitNumber: 0,
        transitDuration: 0,
        transitCity: [],
        transitTime: [0, 0],
        departure: 0,
        arrival: 0,
        seat: "",
        price: "",
        facilities: []
    })

    return (
        <div className={`flight-search-grid ${arrayFlights.length === 0 ? "empty-flight" : ""}`}>
            {
                arrayFlights.length === 0 &&
                <div className="no-flights">
                    <IconPlaneOff stroke={1.5} />
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
                                        <IconPlaneInflight stroke={1.5} />
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
                                    <IconArrowNarrowRight stroke={1.5} />
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
                                        <IconBookmark stroke={1.5} />
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
                                <IconPlaneInflight stroke={1.5} />
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
                                <IconArrowNarrowDown stroke={1.5} />
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
                                    <IconAlertCircleFilled stroke={1.5} />
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
                                    <IconArrowNarrowDown stroke={1.5} />
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
                                <IconBookmark stroke={1.5} />
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