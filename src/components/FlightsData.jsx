import kendari from "../assets/kendari.jpg"
import yogyakarta from "../assets/yogyakarta.jpg"
import bandung from "../assets/bandung.jpg"
import denpasar from "../assets/denpasar.jpg"
import makassar from "../assets/makassar.jpg"
import surabaya from "../assets/surabaya.jpg"
import malang from "../assets/malang.jpg"
import lombok from "../assets/lombok.jpg"
import amsterdam from "../assets/amsterdam.jpg"
import tokyo from "../assets/tokyo.jpg"
import seoul from "../assets/seoul.jpg"
import singapore from "../assets/singapore.jpg"
import kualaLumpur from "../assets/kuala-lumpur.jpg"
import osaka from "../assets/osaka.jpg"
import shanghai from "../assets/shanghai.jpg"
import melbourne from "../assets/melbourne.jpg"
import sydney from "../assets/sydney.jpg"

const indonesiaFlightList = [
    {
        id: 1,
        img: kendari,
        route: ["Jakarta", "Kendari"],
        month: "Sep",
        airline: "Quantum Air",
        transit_number: 1,
        transit_duration: 2,
        transit_city: ["Makassar"],
        transit_time: [6, 8],
        departure: 4,
        arrival: 9,
        seat: "Economy",
        price: "1.345.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal"]
    },
    {
        id: 2,
        img: yogyakarta,
        route: ["Jakarta", "Yogyakarta"],
        month: "Sep",
        airline: "Nebula Airways",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 12,
        arrival: 13,
        seat: "Business",
        price: "2.675.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 3,
        img: bandung,
        route: ["Jakarta", "Bandung"],
        month: "Oct",
        airline: "Nebula Airways",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 11,
        arrival: 12,
        seat: "Economy",
        price: "1.254.000",
        category: "flights",
        facilities: ["Baggage", "Wifi"]
    },
    {
        id: 4,
        img: denpasar,
        route: ["Jakarta", "Bali"],
        month: "Aug",
        airline: "Quantum Air",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 14,
        arrival: 16,
        seat: "Economy",
        price: "1.095.000",
        category: "flights",
        facilities: ["Baggage", "Power/USB Port"]
    },
    {
        id: 5,
        img: makassar,
        route: ["Yogyakarta", "Makassar"],
        month: "Dec",
        airline: "Stellar Airlines",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 13,
        arrival: 15,
        seat: "Economy",
        price: "1.285.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal"]
    },
    {
        id: 6,
        img: bandung,
        route: ["Palembang", "Bandung"],
        month: "Nov",
        airline: "SkyWing",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 9,
        arrival: 11,
        seat: "Business",
        price: "2.265.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 7,
        img: surabaya,
        route: ["Jakarta", "Surabaya"],
        month: "Nov",
        airline: "SkyWing",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 19,
        arrival: 20,
        seat: "Business",
        price: "2.054.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 8,
        img: malang,
        route: ["Surabaya", "Malang"],
        month: "Sep",
        airline: "Thunderbird",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 21,
        arrival: 22,
        seat: "Economy",
        price: "1.065.000",
        category: "flights",
        facilities: ["Baggage", "Wifi"]
    },
    {
        id: 9,
        img: lombok,
        route: ["Jakarta", "Lombok"],
        month: "Oct",
        airline: "Quantum Air",
        transit_number: 1,
        transit_duration: 3,
        transit_city: ["Makassar"],
        transit_time: [7, 10],
        departure: 5,
        arrival: 11,
        seat: "Economy",
        price: "965.000",
        category: "flights",
        facilities: ["Baggage", "Power/USB Port"]
    },
    {
        id: 10,
        img: yogyakarta,
        route: ["Denpasar", "Yogyakarta"],
        month: "Dec",
        airline: "SkyWing",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 7,
        arrival: 12,
        seat: "Business",
        price: "2.675.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    }
]

const internationalFlightList = [
    {
        id: 11,
        img: amsterdam,
        route: ["Jakarta", "Amsterdam"],
        month: "Dec",
        airline: "SkyWing",
        transit_number: 1,
        transit_duration: 3,
        transit_city: ["Bangkok"],
        transit_time: [8, 11],
        departure: 4,
        arrival: 22,
        seat: "Business",
        price: "5.565.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 12,
        img: tokyo,
        route: ["Jakarta", "Tokyo"],
        month: "Dec",
        airline: "Nebula Airways",
        transit_number: 1,
        transit_duration: 3,
        transit_city: ["Kuala Lumpur"],
        transit_time: [10, 13],
        departure: 8,
        arrival: 16,
        seat: "Business",
        price: "5.765.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 13,
        img: seoul,
        route: ["Jakarta", "Seoul"],
        month: "Nov",
        airline: "Stellar Airlines",
        transit_number: 1,
        transit_duration: 6,
        transit_city: ["Kuala Lumpur"],
        transit_time: [14, 20],
        departure: 12,
        arrival: 23,
        seat: "Economy",
        price: "3.345.000",
        category: "flights",
        facilities: ["Baggage", "Wifi", "Power/USB Port"]
    },
    {
        id: 14,
        img: singapore,
        route: ["Denpasar", "Singapore"],
        month: "Aug",
        airline: "Stellar Airlines",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 9,
        arrival: 11,
        seat: "Economy",
        price: "3.245.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Power/USB Port"]
    },
    {
        id: 15,
        img: kualaLumpur,
        route: ["Jakarta", "Kuala Lumpur"],
        month: "Oct",
        airline: "Elysian Airways",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 19,
        arrival: 21,
        seat: "Business",
        price: "5.124.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 16,
        img: osaka,
        route: ["Jakarta", "Osaka"],
        month: "Sep",
        airline: "Nebula Airways",
        transit_number: 1,
        transit_duration: 3,
        transit_city: ["Singapore"],
        transit_time: [20, 23],
        departure: 19,
        arrival: 1,
        seat: "Economy",
        price: "3.421.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi"]
    },
    {
        id: 17,
        img: singapore,
        route: ["Yogyakarta", "Singapore"],
        month: "Aug",
        airline: "SkyWing",
        transit_number: "Direct",
        transit_duration: 0,
        departure: 4,
        arrival: 6,
        seat: "Economy",
        price: "3.114.000",
        category: "flights",
        facilities: ["Baggage", "Wifi", "Power/USB Port"]
    },
    {
        id: 18,
        img: shanghai,
        route: ["Jakarta", "Shanghai"],
        month: "Nov",
        airline: "Thunderbird",
        transit_number: 1,
        transit_duration: 7,
        transit_city: ["Guangzhou"],
        transit_time: [8, 15],
        departure: 4,
        arrival: 16,
        seat: "Economy",
        price: "3.098.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Power/USB Port"]
    },
    {
        id: 19,
        img: melbourne,
        route: ["Jakarta", "Melbourne"],
        month: "Dec",
        airline: "Elysian Airways",
        transit_number: 1,
        transit_duration: 4,
        transit_city: ["Denpasar"],
        transit_time: [20, 0],
        departure: 19,
        arrival: 3,
        seat: "Business",
        price: "5.876.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 20,
        img: sydney,
        route: ["Jakarta", "Sydney"],
        month: "Dec",
        airline: "Thunderbird",
        transit_number: 1,
        transit_duration: 5,
        transit_city: ["Kuala Lumpur"],
        transit_time: [15, 20],
        departure: 15,
        arrival: 23,
        seat: "Economy",
        price: "3.212.000",
        category: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi"]
    }
]

let flightsArray = [...indonesiaFlightList, ...internationalFlightList]

export { indonesiaFlightList, internationalFlightList, flightsArray }