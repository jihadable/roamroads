import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../style/Trains.scss"
import { useState, useEffect, useRef } from "react";
import trainsArray from "../components/TrainsData";
import { IconCaretDown } from "@tabler/icons-react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { IconFilter } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { IconOctagonOff } from "@tabler/icons-react";
import { IconTrain } from "@tabler/icons-react";
import { IconBookmark } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";

function Trains(){
    document.title = "RoamRoads | Trains"

    return (
        <>
            <Navbar />
            <TrainSearchContainer />
            <Footer />
        </>
    )
}

function TrainSearchContainer(){
    return (
        <section className="train-search-container">
            <TrainSearchFilter />
        </section>
    )
}

function TrainSearchFilter(){

    const [
        [showStation1, setShowStation1],
        [showStation2, setShowStation2],
        [showFilters, setShowFilters],
        [showSort, setShowSort],
        [showDeparture, setShowDeparture],
        [showClass, setShowClass],
        [showTrain, setShowTrain]
    ] = [
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false),
        useState(false)
    ]

    const stationData = ["All station", "Yogyakarta", "Bandung", "Jakarta", "Surabaya", "Malang", "Solo", "Semarang"]
    const [station1, setStation1] = useState("All station")
    const [station2, setStation2] = useState("All station")

    const station1Btn = useRef()
    const station2Btn = useRef()

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!station1Btn.current.contains(e.target)){
                setShowStation1(false)
            }
            if (!station2Btn.current.contains(e.target)){
                setShowStation2(false)
            }
        })
    }, [])

    const sortData = ["Departue time", "Arrival time", "Lowest price", "Highest price"]
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
    const classData = ["Economy", "Executive"]
    const trainData = ["Crimson Arrow", "Stellar Streak", "Phoenix Fury", "Ironclad Crusader", "Silver Nova"]

    const [filters, setFilters] = useState({
        routes: [station1, station2],
        sort: "All",
        departure: [],
        class: [],
        train: []  
    })

    const addRemoveFilter = (filter, arrayName, title = "", time = "", range = "") => {

        if (arrayName === "departure"){
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

    function checkDeparture(arrayName, title){
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

    function selectAllBtn(arrayName){
        let array
        
        if (arrayName === "departure"){
            array = [...departureData]
        }
        else if (arrayName === "class"){
            array = [...classData]
        }
        else if (arrayName === "train"){
            array = [...trainData]
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

    useEffect(() => {
        setFilters(filters => {
            return {...filters, ["routes"]: [station1, station2]}
        })
    }, [station1, station2])

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
        <div className="train-search-filter">
            <div className="header">
                <div className="routes">
                    <div className="route">
                        <div className="route-result" onClick={() => {setShowStation1(!showStation1)}} ref={station1Btn}>
                            {station1}
                            <IconCaretDown stroke={1.5} width={16} height={16} />
                        </div>
                        <div className={`route-menu ${showStation1 ? "active" : ""}`}>
                            {
                                stationData.map((station, index) => {
                                    return (
                                        <div className="station-option" key={index} onClick={() => {
                                            setStation1(station)
                                            setShowStation1(false)
                                        }}>
                                            {station}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <IconArrowNarrowRight stroke={1.5} />
                    <div className="route">
                        <div className="route-result" onClick={() => {setShowStation2(!showStation2)}} ref={station2Btn}>
                            {station2}
                            <IconCaretDown stroke={1.5} width={16} height={16} />
                        </div>
                        <div className={`route-menu route-menu-2 ${showStation2 ? "active" : ""}`}>
                            {
                                stationData.map((station, index) => {
                                    return (
                                        <div className="station-option" key={index} onClick={() => {
                                            setStation2(station)
                                            setShowStation2(false)
                                        }}>
                                            {station}
                                        </div>
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
            <div className="content">
                <div className="head">
                    <div className="filter-header" onClick={() => {setShowFilters(!showFilters)}}>
                        <IconFilter stroke={1.5} />
                        <span>Filter</span>
                        <IconChevronDown stroke={1.5} className={`chevron ${showFilters ? "rotate" : ""}`} />
                    </div>
                    <div className="reset-filter-btn" onClick={() => {
                        setFilters({
                            routes: [station1, station2],
                            sort: "All",
                            departure: [],
                            class: [],
                            train: []
                        })
                    }}>Reset</div>
                </div>
                <div className={`filters ${showFilters ? "active" : ""}`}>
                    <div className="line"></div>
                    <div className="sort">
                        <h4 className="head" onClick={() => {setShowSort(!showSort)}}>
                            <span>Sort by</span>
                            <IconChevronDown stroke={1.5} className={`${showSort ? "rotate" : ""}`} />
                        </h4>
                        <div className={`menu ${showSort ? "active" : ""}`}>
                            {
                                sortData.map((sort, index) => {
                                    return (
                                        <div className="sort-option" key={index} onClick={() => {
                                            if (filters.sort === sort){
                                                sort = "All"
                                            }

                                            setFilters(filters => {
                                                return {...filters, ["sort"]: sort}
                                            })
                                        }}>
                                            <div className={`circle ${filters.sort === sort ? "selected" : ""}`}></div>
                                            {sort}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="train-name">
                        <h4 className="head" onClick={() => {setShowTrain(!showTrain)}}>
                            <span>Train</span> 
                            <IconChevronDown stroke={1.5} className={`${showTrain ? "rotate" : ""}`} />
                        </h4>
                        <div className={`menu ${showTrain ? "active" : ""}`}>
                            {
                                trainData.map((train, index) => {
                                    return (
                                        <div className="train-name-option" key={index} onClick={() => {addRemoveFilter(train, "train")}}>
                                            <span className={`checkbox ${filters.train.includes(train) ? "checked" : ""}`}>
                                                <IconCheck stroke={1.5} />
                                            </span>
                                            {train}
                                        </div>
                                    )
                                })
                            }
                            <div className="menu-footer">
                                <div className="select-all" onClick={() => {selectAllBtn("train")}}>Select all</div>
                                <div className="reset" onClick={() => {resetBtn("train")}}>Reset</div>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="class">
                        <h4 className="head" onClick={() => {setShowClass(!showClass)}}>
                            <span>Class</span>
                            <IconChevronDown stroke={1.5} className={`${showClass ? "rotate" : ""}`} />
                        </h4>
                        <div className={`menu ${showClass ? "active" : ""}`}>
                            {
                                classData.map((kelas, index) => {
                                    return (
                                        <div className="class-option" key={index} onClick={() => {addRemoveFilter(kelas, "class")}}>
                                            <span className={`checkbox ${filters.class.includes(kelas) ? "checked" : ""}`}>
                                                <IconCheck stroke={1.5} />
                                            </span>
                                            {kelas}
                                        </div>
                                    )
                                })
                            }
                            <div className="menu-footer">
                                <div className="select-all" onClick={() => {selectAllBtn("class")}}>Select all</div>
                                <div className="reset" onClick={() => {resetBtn("class")}}>Reset</div>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="departure">
                        <h4 className="head" onClick={() => {setShowDeparture(!showDeparture)}}>
                            <span>Departue</span>
                            <IconChevronDown stroke={1.5} className={`${showDeparture ? "rotate" : ""}`} />
                        </h4>
                        <div className={`menu ${showDeparture ? "active" : ""}`}>
                            {
                                departureData.map((departure, index) => {
                                    return (
                                        <div className="departure-option" key={index} onClick={() => {addRemoveFilter(departure, "departure", departure.title, departure.time, departure.range)}}>
                                            <span className={`checkbox ${checkDeparture("departure", departure.title) ? "checked" : ""}`}>
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
                            <div className="menu-footer">
                                <div className="select-all" onClick={() => {selectAllBtn("departure")}}>Select all</div>
                                <div className="reset" onClick={() => {resetBtn("departure")}}>Reset</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TrainSearchGrid filters={filters} />
        </>
    )
}

function TrainSearchGrid(props){

    const filters = props.filters

    let arrayTrains = []

    trainsArray.forEach(train => {
        if (
            // routes
            ((filters.routes[0] === "All station" || filters.routes[0] === train.route[0]) && (filters.routes[1] === "All station" || filters.routes[1] === train.route[1])) &&
            // train
            (filters.train.length === 0 || filters.train.includes(train.trainName)) &&
            // seat
            (filters.class.length === 0 || filters.class.includes(train.seat)) &&
            // departure
            (filters.departure.length === 0 || checkDeparture(train.departure))
        ){
            arrayTrains.push(train)
        }
    })

    function checkDeparture(train){
        for (let i = 0 ; i < filters["departure"].length ; i++){
            if (filters["departure"][i].range[0] <= train && filters["departure"][i].range[1] >= train){
                return true
            }
            else {
                if (i === filters["departure"].length - 1){
                    return false
                }
            }
        }
    }

    // sorting trains
    function sortArrayOfObjects(array, key, ascending = true) {
        return array.sort((a, b) => {

            let valueA
            let valueB
            if (key === "departure" || key === "arrival"){
                valueA = a[key];
                valueB = b[key];
            }
            else {
                valueA = changeStrToNum(a[key]);
                valueB = changeStrToNum(b[key]);
            }
        
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
    if (filters.sort === "Departue time"){
        arrayTrains = sortArrayOfObjects(arrayTrains, "departure")
    }
    else if (filters.sort === "Arrival time"){
        arrayTrains = sortArrayOfObjects(arrayTrains, "arrival")
    }
    else if (filters.sort === "Lowest price"){
        arrayTrains = sortArrayOfObjects(arrayTrains, "price")
    }
    else if (filters.sort === "Highest price"){
        arrayTrains = sortArrayOfObjects(arrayTrains, "price", false)
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

    // add to storage
    const [savedTrains, setSavedTrains] = useState(JSON.parse(localStorage.getItem("savedTrains")))

    function addRemoveSaved(item){
        let newSaved = [...savedTrains]

        let index = -1
        newSaved.forEach((saved, i) => {
            if (saved.id === item.id){
                index = i

                return
            }
        })

        if (index > -1){
            newSaved.splice(index, 1)

            setSavedTrains(newSaved)
        }
        else {
            setSavedTrains(saved => {
                return [...saved, item]
            })
        }
    }

    function checkSavedItem(item){
        for (let i = 0 ; i < savedTrains.length ; i++){
            if (savedTrains[i].id === item.id){
                return true
            }
            else if (i === savedTrains.length - 1){
                return false
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("savedTrains", JSON.stringify(savedTrains))
    }, [savedTrains])

    return (
        <div className={`train-grid ${arrayTrains.length === 0 ? "empty-trains" : ""}`}>
            {
                arrayTrains.length === 0 &&
                <div className="no-trains">
                    <IconOctagonOff stroke={1.5} />
                    <div className="text-head">No trains available</div>
                    <div className="text">Lorem ipsum dolor sit amet.</div>
                </div>
            }
            {
                arrayTrains.map((train, index) => {
                    return (
                        <div className="train" key={index}>
                            <div className="train-left">
                                <div className="train-name-seat">
                                    <h4 className="train-name">
                                        <IconTrain stroke={1.5} />
                                        {train.trainName}
                                    </h4>
                                    <div className="train-seat">{train.seat}</div>
                                </div>
                                <div className="train-routes">
                                    <div className="train-route-from">
                                        <div className="from-time">{train.departure < 10 ? `0${train.departure}:00` : `${train.departure}:00`}</div>
                                        <div className="from-city">{train.route[0]}</div>
                                    </div>
                                    <IconArrowNarrowRight stroke={1.5} />
                                    <div className="train-route-to">
                                        <div className="to-time">{train.arrival < 10 ? `0${train.arrival}:00` : `${train.arrival}:00`}</div>
                                        <div className="to-city">{train.route[1]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="train-right">
                                <div className="train-price">IDR {train.price}</div>
                                <div className="save-select">
                                    <div className={`save ${checkSavedItem(train) ? "saved" : ""}`} onClick={() => {addRemoveSaved(train)}}>
                                        <IconBookmark stroke={1.5} />
                                    </div>
                                    <div className="select">Select</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Trains