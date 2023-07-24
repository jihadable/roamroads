import React, { useEffect, useState } from "react"
import "../style/Home.scss"
import roamRoadsLogo from '../images/roam-roads-logo.png'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { kendariHotelList, jogjaHotelList, bandungHotelList, jakartaHotelList } from "../components/HotelsData"
import { indonesiaTrendingList} from "../components/TrendingNow"
import { indonesiaFlightList, internationalFlightList} from "../components/FlightsData"

function Home(){

    document.body.classList.add("body-home")

    return (
        <>
            <Navbar />
            <HomeHeader />
            <TrendingNow />
            <Travel />
            <BookFlights />
            <BookHotels />
            <WhyBookHere />
            <DownloadOurApp />
            <Footer />
        </>
    )
}

function HomeHeader(){

    const trips = [
        {
            name: "Hotels",
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M10 12h4v4h-4z"></path>
            </svg>,
            link: "hotels"
        },
        {
            name: "Flights",
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plane-departure" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z"></path>
                <path d="M3 21h18"></path>
            </svg>,
            link: "flights"
        },
        {
            name: "Trains",
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-train" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M21 13c0 -3.87 -3.37 -7 -10 -7h-8"></path>
                <path d="M3 15h16a2 2 0 0 0 2 -2"></path>
                <path d="M3 6v5h17.5"></path>
                <path d="M3 10l0 4"></path>
                <path d="M8 11l0 -5"></path>
                <path d="M13 11l0 -4.5"></path>
                <path d="M3 19l18 0"></path>
            </svg>,
            link: "trains"
        }
    ]

    return (
        <header className="home-header">
            <div className="tagline">
                <img src={roamRoadsLogo} alt="Logo" />
                <h1>Help people to find their best roads for amazing trip</h1>
                <div className="header-input">
                    <label htmlFor="header-search">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                            <path d="M21 21l-6 -6"></path>
                        </svg>
                    </label>
                    <input type="text" id="header-search" placeholder="Search roads..." />
                </div>
                <div className="trips">
                    {
                        trips.map((trip, index) => {
                            return (
                                <a href={trip.link} className="trip" key={index}>
                                    {trip.svg}
                                    <div className="trip-name">{trip.name}</div>
                                </a>
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
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, sit.</div>
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
                    <span class="material-symbols-rounded">chevron_left</span>
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
                    <span class="material-symbols-rounded">chevron_right</span>
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
            <img src={require ("../images/travel.png")} alt="" />
            <div className="text">
                <div className="text-header">RoamRoads</div>
                <div className="text-tag">Travel Fair</div>
                <div className="text-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit ea delectus ipsa, nesciunt doloremque ad vel molestias. Velit, assumenda porro. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus ullam inventore sapiente sequi dolor provident alias expedita quo quas commodi.
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
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia.</div>
            <div className="countries">
                <div 
                className={`country ${showCountryHotels === "knd" ? "selected" : ""}`} 
                onClick={() => {setShowCountryHotels("knd"); setToRight(false)}}
                >Kendari</div>
                <div 
                className={`country ${showCountryHotels === "jgj" ? "selected" : ""}`}
                onClick={() => {setShowCountryHotels("jgj"); setToRight(false)}}
                >Yogyakarta</div>
                <div 
                className={`country ${showCountryHotels === "bnd" ? "selected" : ""}`}
                onClick={() => {setShowCountryHotels("bnd"); setToRight(false)}}
                >Bandung</div>
                <div 
                className={`country ${showCountryHotels === "jkt" ? "selected" : ""}`}
                onClick={() => {setShowCountryHotels("jkt"); setToRight(false)}}
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
                    <span class="material-symbols-rounded">chevron_left</span>
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
                    <span class="material-symbols-rounded">chevron_right</span>
                </button>
            }
            <div className="hotel-container">
                <div className={`hotel-list ${toRight ? "to-right" : ""} ${toRight2 ? "to-right-2" : ""}`}>
                    {
                        arrayHotels.map((hotel, index) => {
                            return (
                                <div className="hotel" key={index} >
                                    <img src={hotel.img} alt={hotel.name} />
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
                                        <div className="hotel-price">{`$${hotel.price}`}</div>
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

function BookFlights(){
    const [toRight, setToRight] = useState(false)
    const [toRight2, setToRight2] = useState(false)
    const tablet = window.matchMedia("screen and (max-width: 1023px)").matches

    const [showAreaFlights, setShowAreaFlights] = useState("ind")
    const [arrayFlight, setArrayFlight] = useState([...indonesiaFlightList])
    // ind, inter

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
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, cim.</div>
            <div className="areas">
                <div 
                className={`area ${showAreaFlights === "ind" ? "selected" : ""}`} 
                onClick={() => {setShowAreaFlights("ind"); setToRight(false)}}
                >Domestic</div>
                <div 
                className={`area ${showAreaFlights === "inter" ? "selected" : ""}`}
                onClick={() => {setShowAreaFlights("inter"); setToRight(false)}}
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
                    <span class="material-symbols-rounded">chevron_left</span>
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
                    <span class="material-symbols-rounded">chevron_right</span>
                </button>
            }
            <div className="flight-container">
                <div className={`flight-list ${toRight ? "to-right" : ""} ${toRight2 ? "to-right-2" : ""}`}>
                    {
                        arrayFlight.map((flight, index) => {
                            return (
                                <div className="flight" key={index} >
                                    <img src={flight.img} alt={flight.route[1]} />
                                    <div className="flight-info">
                                        <h4 className="flight-routes">
                                            <span className="route-1">{flight.route[0]}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l14 0"></path>
                                                <path d="M15 16l4 -4"></path>
                                                <path d="M15 8l4 4"></path>
                                            </svg>
                                            <span className="route-2">{flight.route[1]}</span>
                                        </h4>
                                        <div className="flight-date">{`${flight.date} 2023`}</div>
                                        <div className="flight-seat">{flight.seat}</div>
                                        <div className="flight-price">{`IDR ${flight.price}`}</div>
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

function WhyBookHere(){

    const whys = [
        {
            img: require ("../images/why-book-here/service.png"),
            title: "Service You Can Trust",
            text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, vitae.`
        },
        {
            img: require ("../images/why-book-here/payment.png"),
            title: "Various Payment Options",
            text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, asperiores.`
        },
        {
            img: require ("../images/why-book-here/secure.png"),
            title: "Secure Transaction Guaranteed",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quo.`
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

function DownloadOurApp(){
    return (
        <section className="download-our-app">
            <div className="left">
                <div className="header">Download our app to get most out of it</div>
                <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ea necessitatibus, itaque molestias accusantium unde voluptatibus doloribus perspiciatis commodi, labore natus ad iusto.</div>
                <div className="store">
                    <div className="playstore">
                        <img src={require ("../images/play-store.png")} alt="Play Store" />
                        <img src={require ("../images/app-store.png")} alt="App Store" />
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={require ("../images/home-mobile.png")} alt="Mobile" />
            </div>
        </section>
    )
}

export default Home