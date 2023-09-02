const indonesiaFlightList = [
    {
        id: 1,
        img: require ("../images/flight/indonesia/kendari.jpg"),
        route: ["Jakarta", "Kendari"],
        area: "Domestic",
        date: "Sep",
        airline: "Quantum Air",
        transitNumber: 1,
        transitDuration: 2,
        transitCity: ["Makassar"],
        transitTime: [6, 8],
        departure: 4,
        arrival: 9,
        seat: "Economy",
        price: "1.345.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal"]
    },
    {
        id: 2,
        img: require ("../images/flight/indonesia/yogyakarta.jpg"),
        route: ["Jakarta", "Yogyakarta"],
        area: "Domestic",
        date: "Sep",
        airline: "Nebula Airways",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 12,
        arrival: 13,
        seat: "Business",
        price: "2.675.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 3,
        img: require ("../images/flight/indonesia/bandung.jpg"),
        route: ["Jakarta", "Bandung"],
        area: "Domestic",
        date: "Oct",
        airline: "Nebula Airways",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 11,
        arrival: 12,
        seat: "Economy",
        price: "1.254.000",
        list: "flights",
        facilities: ["Baggage", "Wifi"]
    },
    {
        id: 4,
        img: require ("../images/flight/indonesia/denpasar.jpg"),
        route: ["Jakarta", "Bali"],
        area: "Domestic",
        date: "Aug",
        airline: "Quantum Air",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 14,
        arrival: 16,
        seat: "Economy",
        price: "1.095.000",
        list: "flights",
        facilities: ["Baggage", "Power/USB Port"]
    },
    {
        id: 5,
        img: require ("../images/flight/indonesia/makassar.jpg"),
        route: ["Yogyakarta", "Makassar"],
        area: "Domestic",
        date: "Dec",
        airline: "Stellar Airlines",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 13,
        arrival: 15,
        seat: "Economy",
        price: "1.285.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal"]
    },
    {
        id: 6,
        img: require ("../images/flight/indonesia/bandung.jpg"),
        route: ["Palembang", "Bandung"],
        area: "Domestic",
        date: "Nov",
        airline: "SkyWing",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 9,
        arrival: 11,
        seat: "Business",
        price: "2.265.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 7,
        img: require ("../images/flight/indonesia/surabaya.jpg"),
        route: ["Jakarta", "Surabaya"],
        area: "Domestic",
        date: "Nov",
        airline: "SkyWing",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 19,
        arrival: 20,
        seat: "Business",
        price: "2.054.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 8,
        img: require ("../images/flight/indonesia/malang.jpg"),
        route: ["Surabaya", "Malang"],
        area: "Domestic",
        date: "Sep",
        airline: "Thunderbird",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 21,
        arrival: 22,
        seat: "Economy",
        price: "1.065.000",
        list: "flights",
        facilities: ["Baggage", "Wifi"]
    },
    {
        id: 9,
        img: require ("../images/flight/indonesia/lombok.jpg"),
        route: ["Jakarta", "Lombok"],
        area: "Domestic",
        date: "Oct",
        airline: "Quantum Air",
        transitNumber: 1,
        transitDuration: 3,
        transitCity: ["Makassar"],
        transitTime: [7, 10],
        departure: 5,
        arrival: 11,
        seat: "Economy",
        price: "965.000",
        list: "flights",
        facilities: ["Baggage", "Power/USB Port"]
    },
    {
        id: 10,
        img: require ("../images/flight/indonesia/yogyakarta.jpg"),
        route: ["Denpasar", "Yogyakarta"],
        area: "Domestic",
        date: "Dec",
        airline: "SkyWing",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 7,
        arrival: 12,
        seat: "Business",
        price: "2.675.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    }
]

const internationalFlightList = [
    {
        id: 11,
        img: require ("../images/flight/international/amsterdam.jpg"),
        route: ["Jakarta", "Amsterdam"],
        area: "International",
        date: "Dec",
        airline: "SkyWing",
        transitNumber: 1,
        transitDuration: 3,
        transitCity: ["Bangkok"],
        transitTime: [8, 11],
        departure: 4,
        arrival: 22,
        seat: "Business",
        price: "5.565.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 12,
        img: require ("../images/flight/international/tokyo.jpg"),
        route: ["Jakarta", "Tokyo"],
        area: "International",
        date: "Dec",
        airline: "Nebula Airways",
        transitNumber: 1,
        transitDuration: 3,
        transitCity: ["Kuala Lumpur"],
        transitTime: [10, 13],
        departure: 8,
        arrival: 16,
        seat: "Business",
        price: "5.765.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 13,
        img: require ("../images/flight/international/seoul.jpg"),
        route: ["Jakarta", "Seoul"],
        area: "International",
        date: "Nov",
        airline: "Stellar Airlines",
        transitNumber: 1,
        transitDuration: 6,
        transitCity: ["Kuala Lumpur"],
        transitTime: [14, 20],
        departure: 12,
        arrival: 23,
        seat: "Economy",
        price: "3.345.000",
        list: "flights",
        facilities: ["Baggage", "Wifi", "Power/USB Port"]
    },
    {
        id: 14,
        img: require ("../images/flight/international/singapore.jpg"),
        route: ["Denpasar", "Singapore"],
        area: "International",
        date: "Aug",
        airline: "Stellar Airlines",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 9,
        arrival: 11,
        seat: "Economy",
        price: "3.245.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Power/USB Port"]
    },
    {
        id: 15,
        img: require ("../images/flight/international/kuala-lumpur.jpg"),
        route: ["Jakarta", "Kuala Lumpur"],
        area: "International",
        date: "Oct",
        airline: "Elysian Airways",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 19,
        arrival: 21,
        seat: "Business",
        price: "5.124.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 16,
        img: require ("../images/flight/international/osaka.jpg"),
        route: ["Jakarta", "Osaka"],
        area: "International",
        date: "Sep",
        airline: "Nebula Airways",
        transitNumber: 1,
        transitDuration: 3,
        transitCity: ["Singapore"],
        transitTime: [20, 23],
        departure: 19,
        arrival: 1,
        seat: "Economy",
        price: "3.421.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi"]
    },
    {
        id: 17,
        img: require ("../images/flight/international/singapore.jpg"),
        route: ["Yogyakarta", "Singapore"],
        area: "International",
        date: "Aug",
        airline: "SkyWing",
        transitNumber: "Direct",
        transitDuration: 0,
        departure: 4,
        arrival: 6,
        seat: "Economy",
        price: "3.114.000",
        list: "flights",
        facilities: ["Baggage", "Wifi", "Power/USB Port"]
    },
    {
        id: 18,
        img: require ("../images/flight/international/shanghai.jpg"),
        route: ["Jakarta", "Shanghai"],
        area: "International",
        date: "Nov",
        airline: "Thunderbird",
        transitNumber: 1,
        transitDuration: 7,
        transitCity: ["Guangzhou"],
        transitTime: [8, 15],
        departure: 4,
        arrival: 16,
        seat: "Economy",
        price: "3.098.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Power/USB Port"]
    },
    {
        id: 19,
        img: require ("../images/flight/international/melbourne.jpg"),
        route: ["Jakarta", "Melbourne"],
        area: "International",
        date: "Dec",
        airline: "Elysian Airways",
        transitNumber: 1,
        transitDuration: 4,
        transitCity: ["Denpasar"],
        transitTime: [20, 0],
        departure: 19,
        arrival: 3,
        seat: "Business",
        price: "5.876.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi", "Power/USB Port"]
    },
    {
        id: 20,
        img: require ("../images/flight/international/sydney.jpg"),
        route: ["Jakarta", "Sydney"],
        area: "International",
        date: "Dec",
        airline: "Thunderbird",
        transitNumber: 1,
        transitDuration: 5,
        transitCity: ["Kuala Lumpur"],
        transitTime: [15, 20],
        departure: 15,
        arrival: 23,
        seat: "Economy",
        price: "3.212.000",
        list: "flights",
        facilities: ["Baggage", "In-flight meal", "Wifi"]
    }
]

let flightsArray = [...indonesiaFlightList, ...internationalFlightList]

export { indonesiaFlightList, internationalFlightList, flightsArray }