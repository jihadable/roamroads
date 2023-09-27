import React, { useEffect, useState } from "react"
import "../style/Home.scss"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { kendariHotelList, jogjaHotelList, bandungHotelList, jakartaHotelList } from "../components/HotelsData"
import { indonesiaTrendingList} from "../components/TrendingNow"
import { indonesiaFlightList, internationalFlightList} from "../components/FlightsData"
import travel from "../assets/travel.png"
import service from "../assets/service.png"
import payment from "../assets/payment.png"
import secure from "../assets/secure.png"
import { IconSearch } from "@tabler/icons-react"
import { IconStar } from "@tabler/icons-react"
import { IconArrowNarrowRight } from "@tabler/icons-react"
import { IconHome2 } from "@tabler/icons-react"
import { IconPlaneDeparture } from "@tabler/icons-react"
import { IconTrain } from "@tabler/icons-react"
import { IconChevronLeft } from "@tabler/icons-react"
import { IconChevronRight } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import goTop from "../components/goTop"
import { IconCloudOff } from "@tabler/icons-react"

function Home(){

    return (
        <>
            <Navbar />
            <HomeHeader />
            <TrendingNow />
            <Travel />
            <BookFlights />
            <BookHotels />
            <WhyBookHere />
            <Weather />
            <Footer />
        </>
    )
}

function HomeHeader(){

    const trips = [
        {
            name: "Hotels",
            svg: <IconHome2 stroke={1.5} />,
            link: "hotels"
        },
        {
            name: "Flights",
            svg: <IconPlaneDeparture stroke={1.5} />,
            link: "flights"
        },
        {
            name: "Trains",
            svg: <IconTrain stroke={1.5} />,
            link: "trains"
        }
    ]

    return (
        <header className="home-header">
            <div className="tagline">
                <div className="header-input">
                    <label htmlFor="header-search">
                        <IconSearch stroke={1.5} />
                    </label>
                    <input type="text" id="header-search" placeholder="Find your best roads" />
                </div>
                <div className="trips">
                    {
                        trips.map((trip, index) => {
                            return (
                                <Link to={trip.link} onClick={goTop} className="trip" key={index}>
                                    {trip.svg}
                                    <div className="trip-name">{trip.name}</div>
                                </Link>
                            )
                        })
                    }    
                </div> 
            </div>
        </header>
    )
}

function TrendingNow(){

    const [toRight, setToRight] = useState(false)
    const [toRight2, setToRight2] = useState(false)

    const tablet = window.matchMedia("screen and (max-width: 1023px)").matches

    return (
        <section className="trending-now">
            <h2 className="header">Trending attractions this week</h2>
            {
                (((toRight || toRight2) && tablet) || (!tablet && (toRight && !toRight2))) && 
                <button type="button" className={`left-btn`} onClick={() => {
                    if (toRight && !toRight2){
                        setToRight(false)
                        setToRight2(false)
                    }
                    else if (toRight2 && !toRight){
                        setToRight(true)
                        setToRight2(false)
                    }
                }}>
                    <IconChevronLeft stroke={1.5} />
                </button>
            }
            {
                ((!toRight2 && tablet) || (!tablet && (!toRight && !toRight2))) &&
                <button type="button" className={`right-btn`} onClick={() => {
                    if (!toRight && !toRight2){
                        setToRight(true)
                        setToRight2(false)
                    }
                    else if (toRight && !toRight2){
                        setToRight2(true)
                        setToRight(false)
                    }
                }}>
                    <IconChevronRight stroke={1.5} />
                </button>
            }
            <div className="trending-container">
                <div className={`trending-list ${toRight ? "to-right" : ""} ${toRight2 ? "to-right-2" : ""}`}>
                    {
                        indonesiaTrendingList.map((trending, index) => {
                            return (
                                <div className="trending" key={index} >
                                    <img src={trending.img} alt={trending.name} />
                                    <div className="trending-info">
                                        <h4 className="trending-name">{trending.name}</h4>
                                        <div className="trending-rating">
                                            {`${trending.rating}/5`}
                                        </div>
                                        <div className="trending-review">
                                            {`${trending.review} reviews`}
                                        </div>
                                        <div className="trending-price">{`IDR ${trending.price}`}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

function Travel(){
    return (
        <section className="travel-now">
            <img src={travel} alt="Image" />
            <div className="text">
                <div className="text-header">RoamRoads</div>
                <div className="text-tag">Travel Fair</div>
                <div className="text-text">Discover incredible deals and exclusive offers in our Travel Fair section. From discounted fares to special promotions, RoamRoads ensures you get the most value out of your travel budget. Explore and seize the best opportunities for your next adventure.</div>
            </div>
        </section>
    )
}

function BookFlights(){
    const [toRight, setToRight] = useState(false)
    const [toRight2, setToRight2] = useState(false)
    const tablet = window.matchMedia("screen and (max-width: 1023px)").matches

    const [showAreaFlights, setShowAreaFlights] = useState("ind")
    const [arrayFlight, setArrayFlight] = useState([...indonesiaFlightList])

    useEffect(() => {
        if (showAreaFlights === "ind"){
            setArrayFlight(indonesiaFlightList)
        }
        else if (showAreaFlights === "inter"){
            setArrayFlight(internationalFlightList)
        }
    }, [showAreaFlights])

    return (
        <section className="book-flights">
            <h2 className="header">Check the best price for your flights</h2>
            <div className="areas">
                <div 
                className={`area ${showAreaFlights === "ind" ? "selected" : ""}`} 
                onClick={() => setShowAreaFlights("ind")}
                >Domestic</div>
                <div 
                className={`area ${showAreaFlights === "inter" ? "selected" : ""}`}
                onClick={() => setShowAreaFlights("inter")}
                >International</div>
            </div>
            {
                (((toRight || toRight2) && tablet) || (!tablet && (toRight && !toRight2))) && 
                <button type="button" className={`left-btn`} onClick={() => {
                    if (toRight && !toRight2){
                        setToRight(false)
                        setToRight2(false)
                    }
                    else if (toRight2 && !toRight){
                        setToRight(true)
                        setToRight2(false)
                    }
                }}>
                    <IconChevronLeft stroke={1.5} />
                </button>
            }
            {
                ((!toRight2 && tablet) || (!tablet && (!toRight && !toRight2))) &&
                <button type="button" className={`right-btn`} onClick={() => {
                    if (!toRight && !toRight2){
                        setToRight(true)
                        setToRight2(false)
                    }
                    else if (toRight && !toRight2){
                        setToRight2(true)
                        setToRight(false)
                    }
                }}>
                    <IconChevronRight stroke={1.5} />
                </button>
            }
            <div className="flight-container">
                <div className={`flight-list ${toRight ? "to-right" : ""} ${toRight2 ? "to-right-2" : ""}`}>
                    {
                        arrayFlight.map((flight, index) => {
                            return (
                                <Link to="/flights" onClick={goTop} className="flight" key={index} >
                                    <img src={flight.img} alt={flight.route[1]} />
                                    <div className="flight-info">
                                        <h4 className="flight-routes">
                                            <span className="route-1">{flight.route[0]}</span>
                                            <IconArrowNarrowRight stroke={1.5} />
                                            <span className="route-2">{flight.route[1]}</span>
                                        </h4>
                                        <div className="flight-date">{`${flight.date} 2023`}</div>
                                        <div className="flight-seat">{flight.seat}</div>
                                        <div className="flight-price">{`IDR ${flight.price}`}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

function BookHotels(){

    const [toRight, setToRight] = useState(false)
    const [toRight2, setToRight2] = useState(false)
    const tablet = window.matchMedia("screen and (max-width: 1023px)").matches

    const [showCountryHotels, setShowCountryHotels] = useState("knd")
    const [arrayHotels, setArrayHotels] = useState([...kendariHotelList])
    // knd, jgj, bnd, jkt

    useEffect(() => {
        if (showCountryHotels === "knd"){
            setArrayHotels(kendariHotelList)
        }
        else if (showCountryHotels === "jgj"){
            setArrayHotels(jogjaHotelList)
        }
        else if (showCountryHotels === "bnd"){
            setArrayHotels(bandungHotelList)
        }
        else if (showCountryHotels === "jkt"){
            setArrayHotels(jakartaHotelList)
        }
    }, [showCountryHotels])

    return (
        <section className="book-hotels">
            <h2 className="header">Book a stay at hotels abroad</h2>
            <div className="countries">
                <div 
                className={`country ${showCountryHotels === "knd" ? "selected" : ""}`} 
                onClick={() => setShowCountryHotels("knd")}
                >Kendari</div>
                <div 
                className={`country ${showCountryHotels === "jgj" ? "selected" : ""}`}
                onClick={() => setShowCountryHotels("jgj")}
                >Yogyakarta</div>
                <div 
                className={`country ${showCountryHotels === "bnd" ? "selected" : ""}`}
                onClick={() => setShowCountryHotels("bnd")}
                >Bandung</div>
                <div 
                className={`country ${showCountryHotels === "jkt" ? "selected" : ""}`}
                onClick={() => setShowCountryHotels("jkt")}
                >Jakarta</div>
            </div>
            {
                (((toRight || toRight2) && tablet) || (!tablet && (toRight && !toRight2))) && 
                <button type="button" className={`left-btn`} onClick={() => {
                    if (toRight && !toRight2){
                        setToRight(false)
                        setToRight2(false)
                    }
                    else if (toRight2 && !toRight){
                        setToRight(true)
                        setToRight2(false)
                    }
                }}>
                    <IconChevronLeft stroke={1.5} />
                </button>
            }
            {
                ((!toRight2 && tablet) || (!tablet && (!toRight && !toRight2))) &&
                <button type="button" className={`right-btn`} onClick={() => {
                    if (!toRight && !toRight2){
                        setToRight(true)
                        setToRight2(false)
                    }
                    else if (toRight && !toRight2){
                        setToRight2(true)
                        setToRight(false)
                    }
                }}>
                    <IconChevronRight stroke={1.5} />
                </button>
            }
            <div className="hotel-container">
                <div className={`hotel-list ${toRight ? "to-right" : ""} ${toRight2 ? "to-right-2" : ""}`}>
                    {
                        arrayHotels.map((hotel, index) => {
                            return (
                                <Link to="/hotels" onClick={goTop} className="hotel" key={index} >
                                    <img src={hotel.img} alt={hotel.name} />
                                    <div className="hotel-info">
                                        <h4 className="hotel-name">{hotel.name}</h4>
                                        <div className="hotel-rating">
                                            <IconStar stroke={1.5} />
                                            {hotel.stars}
                                        </div>
                                        <div className="hotel-review">
                                            {hotel.rate}/5 - {hotel.review} reviews
                                        </div>
                                        <div className="hotel-price">{`$${hotel.price}`}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

function WhyBookHere(){

    const whys = [
        {
            img: service,
            title: "Service You Can Trust",
            text: "At RoamRoads, we take pride in delivering reliable and top-notch services. Our commitment to providing accurate information, seamless booking experiences, and responsive customer support ensures that you can trust us to make your travel plans a breeze."
        },
        {
            img: payment,
            title: "Various Payment Options",
            text: "We understand that flexibility is key when it comes to payments. That's why RoamRoads offers a wide range of payment options, including credit cards, mobile wallets, and bank transfers. Choose the method that suits you best for a hassle-free booking process."
        },
        {
            img: secure,
            title: "Secure Transaction Guaranteed",
            text: "Your peace of mind is our priority. RoamRoads employs state-of-the-art security measures to safeguard your transactions. Rest assured that your personal and payment information is protected, making your online bookings with us secure and worry-free."
        }
    ]

    return (
        <section className="why-book-here">
            <div className="header">Why book with RoamRoads</div>
            <div className="content">
                {
                    whys.map((why, index) => {
                        return (
                            <div className="item" key={index}>
                                <img src={why.img} alt="Image" />
                                <div className="title">{why.title}</div>
                                <div className="text">{why.text}</div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

function Weather(){

    const [city, setCity] = useState("")
    const [apiResult, setApiResult] = useState(null)
    const [inValidCity, setInvalidCity] = useState(false)

    const handleSearch = async(event, click = false) => {
        if ((event.key === "Enter" && !click) || click){
            let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b3422c7f93924014b6940130232209&q=${city}&aqi=no`)
            response = await response.json()

            if (response.error){
                setInvalidCity(true)

                return
            }

            setInvalidCity(false)

            setApiResult({
                name: `${response.location.name}, ${response.location.country}`,
                condition: response.current.condition.text,
                img: `https:${changeImgSize(response.current.condition.icon)}`,
                celcius: response.current.temp_c,
                fahrenheit: response.current.temp_f,
                local_time: response.location.localtime
            })
        }
    }

    function changeImgSize(str){
        return str.replace("64x64", "128x128")
    }

    return (
        <section className="weather">
            <h2 className="header">Lets check the weather</h2>
            <div className="content">
                <div className="input">
                    <input type="text" placeholder="Search city" id="search_city" spellCheck={false} value={city} onChange={(e) => setCity(e.target.value)} onKeyUp={handleSearch} />
                    <label htmlFor="search_city" onClick={(e) => handleSearch(e, true)}>
                        <IconSearch stroke={1.5} />
                    </label>
                </div>
                <div className="api-result">
                {
                    (apiResult && !inValidCity) &&
                    <>
                    <div className="img">
                        <img src={apiResult.img} alt="Condition" />
                    </div>
                    <div className="info">
                        <div className="name">{apiResult.name}</div>
                        <div className="condition">{apiResult.condition}</div>
                        <div className="temp">
                            <div>{apiResult.celcius} °C</div>
                            <div>{apiResult.fahrenheit} °F</div>
                        </div>
                        <div className="local-time">{apiResult.local_time}</div>
                    </div>
                    </>
                }
                {
                    inValidCity &&
                    <>
                    <IconCloudOff stroke={1} width={96} height={96} />
                    <div className="error">Invalid city name</div>
                    </>
                }
                </div>
            </div>
        </section>
    )
}

export default Home