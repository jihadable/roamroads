import { IconAlertCircleFilled, IconArrowLeft, IconArrowNarrowDown, IconArrowNarrowRight, IconBookmark, IconCheck, IconChevronDown, IconFilter, IconLuggage, IconPlaneInflight, IconPlaneOff, IconSalad, IconUsb, IconWifi } from "@tabler/icons-react";
import axios from "axios";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Slider from "react-slider";
import { toast } from "react-toastify";
import AutoCompletInput from "../components/AutoCompleteInput";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { FlightsContext } from "../contexts/FlightsContext";
import "../style/Flights.scss";
import getIdCurrency from "../utils/getIdCurrency";

function Flights(){
    document.title = "RoamRoads | Penerbangan"

    return (
        <>
            <Navbar />
            <FlightSearchContainer />
            <Footer />
        </>
    )
}

function FlightSearchContainer(){
    const cities = ["Kendari", "Yogyakarta", "Bandung", "Jakarta", "Surabaya", "Malang", "Bali", "Palembang", "Lombok", "Makassar", "Singapore", "Kuala Lumpur", "Seoul", "Tokyo", "Osaka", "Shanghai", "Sydney", "Melbourne", "Amsterdam"]

    const [searchParams, setSearchParams] = useSearchParams()
    const [departureCity, setDepartureCity] = useState("")
    const [arrivalCity, setArrivalCity] = useState("")

    const [date, setDate] = useState("")

    const [getDepartureCity, getArrivalCity] = [searchParams.get("from"), searchParams.get("to")]

    const handleSearch = () => {
        const departureCityInput = departureCity.toLowerCase()
        const arrivalCityInput = arrivalCity.toLowerCase()

        if (date === ""){
            toast.warn("Tanggal belum diisi")

            return
        }

        if (departureCityInput === ""){
            toast.warn("Silahkan masukkan kota asal")

            return
        }

        if (arrivalCityInput === ""){
            toast.warn("Silahkan masukkan kota tujuan")

            return
        }

        setSearchParams({ from: departureCityInput, to: arrivalCityInput })
    }

    return (
        <>
            <section className="flight-search-container">
            {
                getDepartureCity === null || getDepartureCity === "" || getArrivalCity === null || getArrivalCity === "" ?
                <div className="search">
                    <div className="title">Dapatkan penerbangan sesuai dengan keinginan Anda</div>
                    <div className="date">
                        <label>Tanggal</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="search-input">
                        <AutoCompletInput data={cities} label={"Kota Asal"} value={departureCity} setValue={setDepartureCity} />
                        <IconArrowNarrowRight stroke={1.5} width={60} height={60} />
                        <AutoCompletInput data={cities} label={"Kota Tujuan"} value={arrivalCity} setValue={setArrivalCity} />
                    </div>
                    <button type="button" className="search-btn" onClick={handleSearch}>Cari</button>
                </div> :
                <div className="result">
                    <Link to={"/flights"} className="back">
                        <IconArrowLeft stroke={1.5} />
                        <span>Kembali</span>
                    </Link>
                    <div className="result-container">
                        <SearchFlights />
                    </div>
                </div>
            }
            </section>
        </>
    )
}

function SearchFlights(){

    const [filters, setFilters] = useState({
        sort: "All",
        seat: "All",
        transit_number: "All",
        transit_duration: [0, 12],
        airline: [],
        departure: [],
        arrival: [],
        facilities: []
    })

    const sortData = ["Harga termahal", "Harga termurah"]
    const seatData = ["Ekonomi", "Bisnis"]
    const transitNumberData = [0, 1, 2]
    const [transitDurationData, setTransitDurationData] = useState([0, 12])
    const airlineData = ["Quantum Air", "Nebula Airways","Stellar Airlines", "SkyWing", "Thunderbird", "Elysian Airways"]
    const departureData = [
        {
            time: "00:00 - 06:00",
            range: [0, 6]
        },
        {
            time: "06:00 - 12:00",
            range: [6, 12]
        },
        {
            time: "12:00 - 18:00",
            range: [12, 18]
        },
        {
            time: "18:00 - 24:00",
            range: [18, 24]
        }
    ]
    const arrivalData = [...departureData]
    const facilitiesData = [
        {
            title: "Bagasi", 
            svg: <IconLuggage stroke={1.5} />
        },
        {
            title: "Makanan", 
            svg: <IconSalad stroke={1.5} />
        },
        {
            title: "Wifi", 
            svg: <IconWifi stroke={1.5} />
        },
        {
            title: "Colokan Listrik", 
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
        }
        return false
    }

    useEffect(() => {
        setFilters(filters => {
            return (
                {...filters, ["transit_duration"]: [...transitDurationData]}
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
            array = [...facilitiesData].map(item => item.title)
        }

        setFilters(filters => ({...filters, [arrayName]: array}))
    }

    function resetBtn(arrayName){
        setFilters(filters => ({...filters, [arrayName]: []}))
    }

    return (
        <>
            <div className="flight-search-filter">
                <div className="flight-search-content">
                    <div className="head">
                        <div className="header" onClick={() => {setShowFilter(!showFilter)}}>
                            <IconFilter stroke={1.5} />
                            <span>Filter</span>
                            <IconChevronDown stroke={1.5} className={`chevron ${showFilter ? "rotate" : ""}`} />
                        </div>
                        <div className="reset-filter" onClick={() => {
                            setFilters({
                                sort: "All",
                                seat: "All",
                                transit_number: "All",
                                transit_duration: [0, 12],
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
                                <span>Urutkan</span>
                                <IconChevronDown stroke={1.5} className={`${showSort ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showSort ? "active" : ""}`}>
                            {
                                sortData.map((sort, index) => (
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
                                ))
                            }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="seat">
                            <h4 className="head" onClick={() => {setShowSeat(!showSeat)}}>
                                <span>Kursi</span>
                                <IconChevronDown stroke={1.5} className={`${showSeat ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showSeat ? "active" : ""}`}>
                            {
                                seatData.map((seat, index) => (
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
                                ))
                            }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="transit-number">
                            <h4 className="head" onClick={() => {setShowTransitNumber(!showTransitNumber)}}>
                                <span>Jumlah transit</span>
                                <IconChevronDown stroke={1.5} className={`${showTransitNumber ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showTransitNumber ? "active" : ""}`}>
                            {
                                transitNumberData.map((transit_number, index) => (
                                    <div className="transit-number-option" key={index} onClick={() => {
                                        if (filters.transit_number === transit_number){
                                            transit_number = "All"
                                        }
                                        setFilters(filters => {
                                            return (
                                                {...filters, ["transit_number"]: transit_number}
                                            )
                                        })
                                    }}>
                                        <span className={`circle ${filters.transit_number === transit_number ? "selected" : ""}`}></span>
                                        <span>{transit_number}</span>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="transit-duration">
                            <h4 className="head" onClick={() => {setShowTransitDuration(!showTransitDuration)}}>
                                <span>Durasi transit (jam)</span>
                                <IconChevronDown stroke={1.5} className={`${showTransitDuration ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showTransitDuration ? "active" : ""}`}>
                                <div className="transit-duration-option" onClick={() => {}}>
                                    <div className="duration-result">
                                        {transitDurationData[0]}jam - {transitDurationData[1]}jam
                                    </div>
                                    <div className="duration-range">
                                        <Slider className="slider" value={transitDurationData} onChange={setTransitDurationData} min={0} max={12} />
                                    </div>
                                    <div className="duration-label">
                                        <span>0jam</span>
                                        <span>12jam</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="airline">
                            <h4 className="head" onClick={() => {setShowAirline(!showAirline)}}>
                                <span>Maskapai</span>
                                <IconChevronDown stroke={1.5} className={`${showAirline ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showAirline ? "active" : ""}`}>
                                {
                                    airlineData.map((airline, index) => (
                                        <div className="airline-option" key={index} onClick={() => {addRemoveFilter(airline, "airline")}}>
                                            <span className={`checkbox ${filters.airline.includes(airline) ? "checked" : ""}`}>
                                                <IconCheck stroke={1.5} />
                                            </span>
                                            <span>{airline}</span>
                                        </div>
                                    ))
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("airline")
                                    }}>Pilih semua</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("airline")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="departure">
                            <h4 className="head" onClick={() => {setShowDeparture(!showDeparture)}}>
                                <span>Waktu berangkat</span>
                                <IconChevronDown stroke={1.5} className={`${showDeparture ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showDeparture ? "active" : ""}`}>
                                {
                                    departureData.map((departure, index) => (
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
                                    ))
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("departure")
                                    }}>Pilih semua</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("departure")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="arrival">
                            <h4 className="head" onClick={() => {setShowArrival(!showArrival)}}>
                                <span>Waktu datang</span>
                                <IconChevronDown stroke={1.5} className={`${showArrival ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showArrival ? "active" : ""}`}>
                                {
                                    arrivalData.map((arrival, index) => (
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
                                    ))
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("arrival")
                                    }}>Pilih semua</div>
                                    <div className="reset" onClick={() => {
                                        resetBtn("arrival")
                                    }}>Reset</div>
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="facilities">
                            <h4 className="head" onClick={() => {setShowFacility(!showFacility)}}>
                                <span>Fasilitas</span>
                                <IconChevronDown stroke={1.5} className={`${showFacility ? "rotate" : ""}`} />
                            </h4>
                            <div className={`content ${showFacility ? "active" : ""}`}>
                                {
                                    facilitiesData.map((facility, index) => (
                                        <div className="facility-option" key={index} onClick={() => {
                                            addRemoveFilter(facility.title, "facilities")
                                        }}>
                                            <span className={`checkbox ${filters.facilities.includes(facility.title) ? "checked" : ""}`}>
                                                <IconCheck stroke={1.5} />
                                            </span>
                                            {facility.svg}
                                            <span>{facility.title}</span>
                                        </div>
                                    ))
                                }
                                <div className="content-footer">
                                    <div className="select-all" onClick={() => {
                                        selectAllBtn("facilities")
                                    }}>Pilih semua</div>
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

function FlightGrid({ filters }){

    const [searchParams] = useSearchParams()

    const { isLogin } = useContext(AuthContext)
    
    const { flights } = useContext(FlightsContext)
    const [filteredFlights, setFilteredFlights] = useState(null)

    // check departure arrival
    const checkDepartureArrival = useCallback((arrayName, flight) => {
        for (let i = 0 ; i < filters[arrayName].length ; i++){
            if (filters[arrayName][i].range[0] <= flight && filters[arrayName][i].range[1] >= flight){
                return true
            }
        }
        
        return false
    }, [filters])

    // sorting flights
    const sortArrayOfObjects = useCallback((array, key, ascending = true) => {
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
        })
    }, [])
    
    useEffect(() => {
        setFilteredFlights(flights)

        if (flights){
            setFilteredFlights(() => {
                return [...flights].filter(flight => {
                    const transitDuration = flight.transit_departure_time ? parseInt(flight.transit_departure_time) - parseInt(flight.transit_arrival_time) : 0

                    const departureCity = searchParams.get("from")
                    const arrivalCity = searchParams.get("to")

                    if (// route
                        (departureCity.toLowerCase() === flight.departure_city.toLowerCase() && arrivalCity.toLowerCase() === flight.arrival_city.toLowerCase()) && 
                        // seat
                        (filters.seat === "All" || filters.seat === flight.seat) &&
                        // transit_number
                        (filters.transit_number === "All" || flight.transit_number === filters.transit_number) &&
                        // transit_duration
                        (filters.transit_duration[0] <= transitDuration && filters.transit_duration[1] >= transitDuration) &&
                        // airline
                        (filters.airline.length === 0 || filters.airline.includes(flight.airline)) &&
                        // departure
                        (checkDepartureArrival("departure", parseInt(flight.departure_time)) || filters.departure.length === 0) &&
                        // arrival
                        (checkDepartureArrival("arrival", parseInt(flight.arrival_time)) || filters.arrival.length === 0) &&
                        // facilities
                        (filters.facilities.every(filter => flight.facilities.includes(filter)) || filters.facilities.length === 0)
                    ){
                        return flight
                    }
                })
            })

            if (filters.sort === "Harga termurah"){
                setFilteredFlights(filteredFlights => (sortArrayOfObjects([...filteredFlights], "price")))
            }
            else if (filters.sort === "Harga termahal"){
                setFilteredFlights(filteredFlights => (sortArrayOfObjects([...filteredFlights], "price", false)))
            }
        }
    }, [flights, filters, checkDepartureArrival, sortArrayOfObjects])

    function changeStrToNum(str){
        while(str.includes(".")){
            str = str.replace(".", "")
        }

        return parseInt(str)
    }

    const facilities = {
        baggage: <IconLuggage stroke={1.5} />,
        inflightmeal: <IconSalad stroke={1.5} />,
        wifi: <IconWifi stroke={1.5} />,
        powerusbport: <IconUsb stroke={1.5} />
    }

    const { favorites, setFavorites } = useContext(FavoritesContext)

    const [isLoading, setIsLoading] = useState(false)

    const handleSaveFavorite = async(flight) => {
        try {
            setIsLoading(true)
            const favoritesAPIEndpoint = import.meta.env.VITE_FAVORITES_API_ENDPOINT
            const token = localStorage.getItem("token")

            const { data } = await axios.post(favoritesAPIEndpoint, 
                {
                    flight_hotel_id: flight.id,
                    type: "flight"
                },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            setIsLoading(false)
            setFavorites([data.favorite, ...favorites])
        } catch (error) {
            setIsLoading(false)
            toast.error("Gagal menambah simpanan")
        }
    }

    const handleDeleteFavorite = async(flight) => {
        try {
            setIsLoading(true)
            const favoritesAPIEndpoint = import.meta.env.VITE_FAVORITES_API_ENDPOINT
            const token = localStorage.getItem("token")

            await axios.delete(`${favoritesAPIEndpoint}/${flight.id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            setIsLoading(false)
            setFavorites(favorites.filter(favorite => favorite.favorite.id !== flight.id))
        } catch (error) {
            setIsLoading(false)
            toast.error("Gagal menghapus simpanan")
        }
    }

    const handleClickSaveBtn = flight => {
        const id = flight.id

        if (checkSaved(id)){
            handleDeleteFavorite(flight)
        }
        else {
            handleSaveFavorite(flight)
        }
    }

    const checkSaved = id => {
        if (favorites !== null){
            for (let { favorite } of favorites){
                if (favorite.id === id){
                    return true
                }
            }
    
            return false
        }
    }

    const [showFlightDetail, setShowFlightDetail] = useState(false)
    const flightDetailRef = useRef()

    const [flightDetail, setFlightDetail] = useState({
        departure_city: "",
        arrival_city: "",
        airline: "",
        transit_number: 0,
        transit_arrival_time: 0,
        transit_departure_time: 0,
        transit_city: [],
        departure_time: 0,
        arrival_time: 0,
        seat: "",
        price: "",
        facilities: []
    })

    return (
        <div className={`flight-search-grid ${filteredFlights && filteredFlights.length === 0 ? "empty-flight" : ""}`}>
            {
                (filteredFlights && filteredFlights.length === 0) &&
                <div className="no-flights">
                    <IconPlaneOff stroke={1.5} />
                    <div className="text-head">Tidak ada penerbangan yang sesuai</div>
                </div>
            }
            {
                !filteredFlights &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(item => (
                    <FlightSkeleton key={item} />
                ))
            }
            {
                (filteredFlights && filteredFlights.length > 0) &&
                filteredFlights.map((flight, index) => (
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
                                        flight.facilities.map((facility, index) => (
                                            <span className="facility" title={facility} key={index}>
                                                {facility === "Power/USB Port" ? facilities["powerusbport"] : ""}
                                                
                                                {facility === "In-flight meal" ? facilities["inflightmeal"] : ""}
                                                
                                                {facility !== "Power/USB Port" && facility !== "In-flight meal" ? facilities[facility.toLowerCase()] : ""}
                                            </span>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="flight-routes">
                                <div className="flight-route-from">
                                    <div className="from-time">{flight.departure_time}</div>
                                    <div className="from-city">{flight.departure_city}</div>
                                </div>
                                <IconArrowNarrowRight stroke={1.5} />
                                <div className="flight-route-to">
                                    <div className="to-time">{flight.arrival_time}</div>
                                    <div className="to-city">{flight.arrival_city}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flight-right">
                            <div className="flight-price">{getIdCurrency(flight.price)}</div>
                            <div className="save-select">
                            {
                                isLogin && isLoading &&
                                <div className="loader">
                                    <div className="spinner"></div>
                                </div>
                            }
                            {
                                isLogin && !isLoading &&
                                <div className={`save ${checkSaved(flight.id) ? "saved" : ""}`} onClick={() => {handleClickSaveBtn(flight)}}>
                                    <IconBookmark stroke={1.5} />
                                </div>
                            }
                                <div className="select" onClick={() => {
                                    setShowFlightDetail(true)
                                    setFlightDetail({...flight})
                                }}>Show details</div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className={`flight-detail-container ${showFlightDetail ? "active" : ""}`} onClick={(e) => {
                if (!flightDetailRef.current?.contains(e.target)){
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
                            <div className="price-detail">{getIdCurrency(flightDetail.price)}</div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="routes">
                            <div className="route">
                                <div className="route-time-city">
                                    <div className="route-time">{flightDetail.departure_time}</div>
                                    <div className="route-city">
                                        {flightDetail.departure_city}
                                    </div>
                                </div>
                                <IconArrowNarrowDown stroke={1.5} />
                                <div className="route-time-city">
                                {
                                    flightDetail.transit_number > 0 ?
                                    <>
                                    <div className="route-time">{flightDetail.transit_arrival_time}</div>
                                    <div className="route-city">{flightDetail.transit_city}</div>
                                    </> :
                                    <>
                                    <div className="route-time">{flightDetail.arrival_time}</div>
                                    <div className="route-city">{flightDetail.arrival_city}</div>
                                    </>
                                }
                                </div>
                            </div>
                            {
                                flightDetail.transit_number > 0 &&
                                <>
                                <div className="transit-info">
                                    <IconAlertCircleFilled stroke={1.5} />
                                    Stop to change planes in {flightDetail.transit_city} ({parseInt(flightDetail.transit_departure_time) - parseInt(flightDetail.transit_arrival_time)}h 0m)
                                </div>
                                <div className="route">
                                    <div className="route-time-city">
                                        <div className="route-time">{flightDetail.transit_departure_time}</div>
                                        <div className="route-city">
                                            {flightDetail.transit_city}
                                        </div>
                                    </div>
                                    <IconArrowNarrowDown stroke={1.5} />
                                    <div className="route-time-city">
                                    <div className="route-time">{flightDetail.arrival_time}</div>
                                        <div className="route-city">
                                            {flightDetail.arrival_city}
                                        </div>
                                    </div>
                                </div>
                                </>
                            }
                        </div>
                    {
                        isLogin &&
                        <div className="save-select-detail">
                        {
                            isLoading ?
                            <div className="loader">
                                <div className="spinner"></div>
                            </div> :
                            <div className={`save ${checkSaved(flightDetail.id) ? "saved" : ""}`} onClick={() => {handleClickSaveBtn(flightDetail)}}>
                                <IconBookmark stroke={1.5} />
                            </div>
                        }
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

function FlightSkeleton(){
    return (
        <div className="flight-skeleton">
            <div className="left">
                <div className="left">
                    <div className="thick"></div>
                    <div className="thin"></div>
                </div>
                <div className="right">
                    <div className="route1">
                        <div className="thick"></div>
                        <div className="thin"></div>
                    </div>
                    <div className="route2">
                        <div className="thick"></div>
                        <div className="thin"></div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="thick"></div>
                <div className="bottom">
                    <div className="square"></div>
                    <div className="thick"></div>
                </div>
            </div>
        </div>
    )
}

export default Flights