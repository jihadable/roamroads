import { IconArrowNarrowRight, IconBuildingSkyscraper, IconChevronLeft, IconChevronRight, IconPlaneDeparture, IconSearch, IconStar, IconStarFilled } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import payment from "../assets/payment.png"
import secure from "../assets/secure.png"
import service from "../assets/service.png"
import travel from "../assets/travel.png"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { indonesiaTrendingList } from "../components/TrendingNow"
import { FlightsContext } from "../contexts/FlightsContext"
import { HotelsContext } from "../contexts/HotelsContext"
import "../style/Home.scss"
import getIdCurrency from "../utils/getIdCurrency"
import goTop from "../utils/goTop"

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
            <Footer />
        </>
    )
}

function HomeHeader(){

    const trips = [
        {
            name: "Hotel",
            svg: <IconBuildingSkyscraper stroke={1.5} />,
            link: "hotels"
        },
        {
            name: "Tiket pesawat",
            svg: <IconPlaneDeparture stroke={1.5} />,
            link: "flights"
        }
    ]

    return (
        <header className="home-header">
            <div className="tagline">
                <div className="header-input">
                    <label htmlFor="header-search">
                        <IconSearch stroke={1.5} />
                    </label>
                    <input type="text" id="header-search" placeholder="Temukan perjalan terbaik Anda" />
                </div>
                <div className="trips">
                {
                    trips.map((trip, index) => (
                        <Link to={trip.link} onClick={goTop} className="trip" key={index}>
                            {trip.svg}
                            <div className="trip-name">{trip.name}</div>
                        </Link>
                    ))
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
            <h2 className="header">Wisata trending minggu ini</h2>
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
                    indonesiaTrendingList.map((trending, index) => (
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
                                <div className="trending-price">{getIdCurrency(trending.price)}</div>
                            </div>
                        </div>
                    ))
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
                <div className="text-text">Temukan penawaran luar biasa dan promo eksklusif di bagian Travel Fair kami. Dari tarif diskon hingga promosi spesial, RoamRoads memastikan Anda mendapatkan nilai terbaik dari anggaran perjalanan Anda. Jelajahi dan raih peluang terbaik untuk petualangan Anda berikutnya.</div>
            </div>
        </section>
    )
}

function BookFlights(){
    const [toRight, setToRight] = useState(false)
    const [toRight2, setToRight2] = useState(false)
    const tablet = window.matchMedia("screen and (max-width: 1023px)").matches

    const [selectedType, setSelectedType] = useState("Domestic")

    const { flights } = useContext(FlightsContext)
    const [filteredFlights, setFilteredFlights] = useState(null)

    useEffect(() => {
        setFilteredFlights(flights)

        if (flights){
            if (selectedType === "Domestic"){
                setFilteredFlights([...flights].filter(flight => flight.type === "Domestic"))
            }   
            else if (selectedType === "International"){
                setFilteredFlights([...flights].filter(flight => flight.type === "International"))
            }
        }
    }, [flights, selectedType])

    const imagesAPIEndpoint = import.meta.env.VITE_IMAGES_API_ENDPOINT

    return (
        <section className="book-flights">
            <h2 className="header">Pilih harga terbaik untuk penerbangan Anda</h2>
            <div className="areas">
                <div 
                className={`area ${selectedType === "Domestic" ? "selected" : ""}`} 
                onClick={() => setSelectedType("Domestic")}
                >Domestic</div>
                <div 
                className={`area ${selectedType === "International" ? "selected" : ""}`}
                onClick={() => setSelectedType("International")}
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
                        !filteredFlights &&
                        [1,2,3,4,5,6,7,8,9,10].map(item => (
                            <BookFlightsSkeleton key={item} />
                        ))
                    }
                    {
                        filteredFlights &&
                        filteredFlights.map((flight, index) => {
                            return (
                                <Link to="/flights" onClick={goTop} className="flight" key={index} >
                                    <img src={`${imagesAPIEndpoint}/cities/${flight.arrival_city === "Kuala Lumpur" ? "kuala-lumpur.jpg" : flight.arrival_city.toLowerCase() + ".jpg"}`} alt="" />
                                    <div className="flight-info">
                                        <h4 className="flight-routes">
                                            <span className="route-1">{flight.departure_city}</span>
                                            <IconArrowNarrowRight stroke={1.5} />
                                            <span className="route-2">{flight.arrival_city}</span>
                                        </h4>
                                        <div className="flight-seat">{flight.seat}</div>
                                        <div className="flight-price">{getIdCurrency(flight.price)}</div>
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

function BookFlightsSkeleton(){
    return (
        <div className="flight-skeleton">
            <div className="img"></div>
            <div className="info">
                <div className="route"></div>
                <div className="date"></div>
                <div className="seat"></div>
                <div className="price"></div>
            </div>
        </div>
    )
}

function BookHotels(){

    const [toRight, setToRight] = useState(false)
    const [toRight2, setToRight2] = useState(false)
    const tablet = window.matchMedia("screen and (max-width: 1023px)").matches

    const { hotels } = useContext(HotelsContext)
    const [filteredHotels, setFilteredHotels] = useState(null)
    
    const countriesData = ["Kendari", "Yogyakarta", "Bandung", "Jakarta"]
    const [selectedCountry, setSelectedCountry] = useState("Kendari")
    
    useEffect(() => {
        setFilteredHotels(hotels)
        
        if (hotels){
            if (selectedCountry === "Kendari"){
                setFilteredHotels([...hotels].filter(hotel => hotel.city === "Kendari"))
            }
            else if (selectedCountry === "Yogyakarta"){
                setFilteredHotels([...hotels].filter(hotel => hotel.city === "Yogyakarta"))
            }
            else if (selectedCountry === "Bandung"){
                setFilteredHotels([...hotels].filter(hotel => hotel.city === "Bandung"))
            }
            else if (selectedCountry === "Jakarta"){
                setFilteredHotels([...hotels].filter(hotel => hotel.city === "Jakarta"))
            }
        }
    }, [hotels, selectedCountry])

    const getStars = stars => {
        const arr = []

        for (let i = 1; i <= 5; i++){
            if (stars >= i){
                arr.push(<IconStarFilled key={i} stroke={1.5} width={20} height={20} className="filled" />)
            }
            else {
                arr.push(<IconStar key={i} stroke={1.5} width={20} height={20} />)
            }
        }

        return arr
    }

    const imagesAPIEndpoint = import.meta.env.VITE_IMAGES_API_ENDPOINT

    return (
        <section className="book-hotels">
            <h2 className="header">Pesan hotel sekarang</h2>
            <div className="countries">
            {countriesData.map((item, index) => (
                <div 
                className={`country ${selectedCountry === item ? "selected" : ""}`} onClick={() => setSelectedCountry(item)} key={index}
                >{item}</div>
            ))}
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
                        !filteredHotels &&
                        [1,2,3,4,5,6,7,8,9,10].map(item => (
                            <BookHotelsSkeleton key={item} />
                        ))
                    }
                    {
                        filteredHotels &&
                        filteredHotels.map((hotel, index) => {
                            return (
                                <Link to="/hotels" onClick={goTop} className="hotel" key={index} >
                                    <img src={`${imagesAPIEndpoint}/hotels/${hotel.image}`} alt={hotel.name} />
                                    <div className="hotel-info">
                                        <h4 className="hotel-name">{hotel.name}</h4>
                                        <div className="hotel-stars">
                                    {
                                        getStars(hotel.stars).map((star, index) => (<span key={index}>{star}</span>))
                                    }
                                        </div>
                                        <div className="hotel-price">{getIdCurrency(hotel.price)}</div>
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

function BookHotelsSkeleton(){
    return (
        <div className="hotel-skeleton">
            <div className="img"></div>
            <div className="info">
                <div className="name"></div>
                <div className="stars"></div>
                <div className="review"></div>
                <div className="price"></div>
            </div>
        </div>
    )
}

function WhyBookHere(){

    const whys = [
        {
            img: service,
            title: "Pelayanan Terpercaya",
            text: "Kami bangga bisa memberikan layanan yang andal dan berkualitas tinggi. Komitmen kami untuk menyediakan informasi yang akurat, pengalaman pemesanan yang mulus, dan dukungan pelanggan yang responsif. Demi memastikan bahwa Anda dapat mempercayai kami untuk membuat rencana perjalanan menjadi mudah dan menyenangkan."
        },
        {
            img: payment,
            title: "Pembayaran bervariasi",
            text: "Kami memahami bahwa fleksibilitas adalah kunci dalam hal pembayaran. Itulah sebabnya RoamRoads menawarkan berbagai pilihan pembayaran, termasuk kartu kredit, dompet digital, dan transfer bank. Pilih metode yang paling sesuai dengan Anda untuk proses pemesanan tanpa repot."
        },
        {
            img: secure,
            title: "Transaksi Aman",
            text: "Ketenangan Anda adalah prioritas kami. RoamRoads menerapkan langkah-langkah keamanan canggih untuk melindungi transaksi Anda. Yakinlah bahwa informasi pribadi dan pembayaran Anda terlindungi, sehingga pemesanan online Anda dengan kami aman dan bebas dari kekhawatiran."
        }
    ]

    return (
        <section className="why-book-here">
            <div className="header">Kenapa Memilih RoamRoads</div>
            <div className="content">
            {
                whys.map((why, index) => (
                    <div className="item" key={index}>
                        <img src={why.img} alt="Image" />
                        <div className="title">{why.title}</div>
                        <div className="text">{why.text}</div>
                    </div>
                ))
            }
            </div>
        </section>
    )
}

export default Home