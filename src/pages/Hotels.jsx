import { IconArrowLeft, IconBarbell, IconBookmark, IconCalendarStats, IconCheck, IconChevronDown, IconDisabled, IconElevator, IconFilter, IconHomeOff, IconMapPinFilled, IconParking, IconPool, IconStar, IconStarFilled, IconToolsKitchen2, IconWifi } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AutoCompletInput from "../components/AutoCompleteInput";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { HotelsContext } from "../contexts/HotelsContext";
import "../style/Hotels.scss";
import getIdCurrency from "../utils/getIdCurrency";

function Hotels(){
    document.title = "RoamRoads | Hotel"

    return (
        <>
            <Navbar />
            <HotelSearchContainer />
            <Footer />
        </>
    )
}

function HotelSearchContainer(){

    const cities = ["Kendari", "Jakarta", "Yogyakarta", "Bandung"]

    const [city, setCity] = useState("")
    const [checkinDate, setCheckinDate] = useState("")
    const [checkoutDate, setCheckoutDate] = useState("")

    const [searchParams, setSearchParams] = useSearchParams()
    const getCity = searchParams.get("search")

    const handleSearch = () => {
        const cityValue = city.toLowerCase()

        if (checkinDate === ""){
            toast.warn("Tanggal check in belum diisi")

            return
        }

        if (checkoutDate === ""){
            toast.warn("Tanggal check out belum diisi")

            return
        }

        if (cityValue === ""){
            toast.warn("Silahkan masukkan nama kota")

            return
        }

        setSearchParams({ search: cityValue })
    }

    return (
        <section className="hotel-search-container">
        {
            getCity === null || getCity === "" ?
            <div className="search">
                <div className="title">Dapatkan hotel sesuai dengan keinginan Anda</div>
                <div className="dates">
                    <div className="checkin">
                        <label>Check In</label>
                        <input type="date" value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
                    </div>
                    <div className="checkout">
                        <label>Check Out</label>
                        <input type="date" value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} />
                    </div>
                </div>
                <AutoCompletInput data={cities} label={"Masukkan nama kota"} value={city} setValue={setCity} />
                <button type="button" className="search-btn" onClick={handleSearch}>Cari</button>
            </div> :
            <div className="result">
                <Link to={"/hotels"} className="back">
                    <IconArrowLeft stroke={1.5} />
                    <span>Kembali</span>
                </Link>
                <div className="result-container">
                    <SearchHotels />
                </div>
            </div>
        }
        </section>
    )
}

function SearchHotels(){

    // filter: city, price, star, facilities
    const [filters, setFilters] = useState({
        // price
        sort: "All",
        // star
        star: [],
        // facilities
        facilities: []
    })

    const sortData = ["Harga termahal", "Harga termurah"]
    const starRatingData = [1,2,3,4,5]
    const facilitiesData = [
        {
            title: "Wifi",
            svg: <IconWifi stroke={1.5} />
        },
        {
            title: "Kolam Renang",
            svg: <IconPool stroke={1.5} />
        },
        {
            title: "Parkir",
            svg: <IconParking stroke={1.5} />
        },
        {
            title: "Restoran",
            svg: <IconToolsKitchen2 stroke={1.5} />
        },
        {
            title: "Lift",
            svg: <IconElevator stroke={1.5} />
        },
        {
            title: "Akses Kursi Roda",
            svg: <IconDisabled stroke={1.5} />
        },
        {
            title: "Ruang Fitness",
            svg: <IconBarbell stroke={1.5} />
        },
        {
            title: "Ruang Meeting",
            svg: <IconCalendarStats stroke={1.5} />
        }
    ]
    
    const [
        [showFilter, setShowFilter],   
        [showSort, setShowSort],
        [showStarRating, setShowStarRating],
        [showFacilities, setShowFacilities]
    ] = [
        useState(false),
        useState(false),
        useState(false),
        useState(false)
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
                        price: "All",
                        star: [],
                        facilities: []
                    })
                }}>Reset</div>
            </div>
            <div className={`filter-content ${showFilter ? "active" : ""}`}>
                <div className="line"></div>
                <div className="price">
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
                                <span className={`circle ${filters.sort === sort ? "selected" : ""}`}>
                                </span>
                                {sort}
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className="line"></div>
                <div className="star-rating">
                    <h4 className="head" onClick={() => {setShowStarRating(!showStarRating)}}>
                        <span>Bintang</span>
                        <IconChevronDown stroke={1.5} className={`${showStarRating ? "rotate" : ""}`} />
                    </h4>
                    <div className={`content ${showStarRating ? "active" : ""}`}>
                        {
                            starRatingData.map((star, index) => (
                                <div className="star-item" key={index} onClick={() => {addRemoveFilter(star, "star")}}>
                                    <span className={`checkbox ${filters["star"].includes(star) ? "checked" : ""}`}>
                                        <IconCheck stroke={1.5} />
                                    </span>
                                    <div className="star-sum">
                                    {
                                        getStars(star).map((star, index) => (<span key={index}>{star}</span>))
                                    }
                                    </div>
                                </div>
                            ))
                        }
                        <div className="stars-footer">
                            <div className="select-all-stars" onClick={() => {
                                setFilters(filters => {
                                    return (
                                        {...filters, ["star"]: [1,2,3,4,5]}
                                    )
                                })
                            }}>Pilih semua</div>
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
                        <span>Fasilitas</span>
                        <IconChevronDown stroke={1.5} className={`${showFacilities ? "rotate" : ""}`} />
                    </h4>
                    <div className={`content ${showFacilities ? "active" : ""}`}>
                        {
                            facilitiesData.map((facility, index) => (
                                <div className="facility-option" key={index} onClick={() => {
                                    addRemoveFilter(facility.title, "facilities")
                                }}>
                                    <span className={`checkbox ${filters.facilities.includes(facility.title) ? "checked" : ""}`}>
                                        <IconCheck stroke={1.5} />
                                    </span>
                                    {facility.svg}
                                    <span className="facility-item">{facility.title}</span>
                                </div>
                            ))
                        }
                        <div className="facilities-footer">
                            <div className="select-all-facilities" onClick={() => {
                                setFilters(filters => {
                                    return (
                                        {...filters, ["facilities"]: ["Wifi", "Swimming Pool", "Parking", "Restaurant", "Elevator", "Wheelchair Access", "Fitness Center", "Meeting Facilities"]}
                                    )
                                })
                            }}>Pilih semua</div>
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

function HotelSearchGrid({ filters }){

    const [searchParams] = useSearchParams()

    const { isLogin } = useContext(AuthContext)

    const { hotels } = useContext(HotelsContext)
    const [filteredHotels, setFilteredHotels] = useState(null)

    useEffect(() => {
        setFilteredHotels(hotels)

        if (hotels){
            setFilteredHotels(() => {
                return [...hotels].filter(hotel => {
                    const city = searchParams.get("search")

                    if (// city
                        (hotel.city.toLowerCase() === city.toLowerCase()) &&
                        // star
                        (filters.star.includes(hotel.stars) || filters.star.length === 0) &&
                        // // facilities
                        (filters.facilities.every(filter => hotel.facilities.includes(filter)) || filters.facilities.length === 0)
                    ){
                        return hotel
                    }   
                })
            })
            
            if (filters.sort === "Harga termurah"){
                setFilteredHotels(filteredHotels => (sortArrayOfObjects([...filteredHotels], "price", true)))
            }
            else if (filters.sort === "Harga termahal"){
                setFilteredHotels(filteredHotels => (sortArrayOfObjects([...filteredHotels], "price")))
            }
        }
    }, [hotels, filters])

    // sorting hotels
    function sortArrayOfObjects(array, key, ascending = false) {
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

    const { favorites, setFavorites } = useContext(FavoritesContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleSaveFavorite = async(hotel) => {
        try {
            setIsLoading(true)
            const favoritesAPIEndpoint = import.meta.env.VITE_FAVORITES_API_ENDPOINT
            const token = localStorage.getItem("token")

            const { data } = await axios.post(favoritesAPIEndpoint, 
                {
                    flight_hotel_id: hotel.id,
                    type: "hotel"
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

    const handleDeleteFavorite = async(hotel) => {
        try {
            setIsLoading(true)
            const favoritesAPIEndpoint = import.meta.env.VITE_FAVORITES_API_ENDPOINT
            const token = localStorage.getItem("token")

            await axios.delete(`${favoritesAPIEndpoint}/${hotel.id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            
            setIsLoading(false)
            setFavorites(favorites.filter(favorite => favorite.favorite.id !== hotel.id))
        } catch (error) {
            setIsLoading(false)
            toast.error("Gagal menghapus simpanan")
        }
    }

    const handleClickSaveBtn = (hotel) => {
        const id = hotel.id

        if (checkSaved(id)){
            handleDeleteFavorite(hotel)
        }
        else {
            handleSaveFavorite(hotel)
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

    const getStars = stars => {
        const arr = []

        for (let i = 1; i <= 5; i++){
            if (stars >= i){
                arr.push(<IconStarFilled stroke={1.5} width={20} height={20} className="filled" />)
            }
            else {
                arr.push(<IconStar stroke={1.5} width={20} height={20} />)
            }
        }

        return arr
    }

    const imageAPIEndpoint = import.meta.env.VITE_IMAGES_API_ENDPOINT

    return (
        <div className={`hotel-search-grid ${filteredHotels && filteredHotels.length === 0 ? "empty-hotel" : ""}`}>
            {
                (filteredHotels && filteredHotels.length === 0) &&
                <div className="no-hotels">
                    <IconHomeOff stroke={1.5} />
                    <div className="text-head">Tidak ada hotel yang sesuai</div>
                </div>
            }
            {
                !filteredHotels &&
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map(item => (
                    <HotelSkeleton key={item} />
                ))
            }
            {
                (filteredHotels && filteredHotels.length > 0) &&
                filteredHotels.map((hotel, index) => (
                    <div className="hotel" key={index}>
                        <div className="hotel-left">
                            <img className="hotel-img" src={`${imageAPIEndpoint}/hotels/${hotel.image}`} alt={hotel.name} />
                            <div className="hotel-info">
                                <h4 className="hotel-name">{hotel.name}</h4>
                                <div className="hotel-stars">
                                {
                                    getStars(hotel.stars).map((star, index) => (<span key={index}>{star}</span>))
                                }
                                </div>
                                <div className="hotel-city">
                                    <IconMapPinFilled stroke={1.5} />
                                    {hotel.city}
                                </div>
                            </div>
                        </div>
                        <div className="hotel-right">
                            <div className="hotel-price">{getIdCurrency(hotel.price)}</div>
                        {
                            isLogin && isLoading &&
                            <div className="loader">
                                <div className="spinner"></div>
                            </div> 
                        }
                        {
                            isLogin && !isLoading &&
                            <div className={`save-btn ${checkSaved(hotel.id) ? "saved" : ""}`} onClick={() => handleClickSaveBtn(hotel)}>
                                <IconBookmark stroke={1.5} />
                            </div>
                        }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function HotelSkeleton(){
    return (
        <div className="hotel-skeleton">
            <div className="left">
                <div className="img"></div>
                <div className="info">
                    <div className="thick"></div>
                    <div className="thick"></div>
                    <div className="thick"></div>
                    <div className="thick city"></div>
                </div>
            </div>
            <div className="right">
                <div className="thick"></div>
                <div className="square"></div>
            </div>
        </div>
    )
}

export default Hotels