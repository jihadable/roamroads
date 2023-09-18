import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Flights from "./pages/Flights"
import Hotels from "./pages/Hotels"
import Trains from "./pages/Trains"
import Saved from "./pages/Saved"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function Router(){

    if (!localStorage.getItem("savedHotels")){
        localStorage.setItem("savedHotels", JSON.stringify([]))
    }
    if (!localStorage.getItem("savedFlights")){
        localStorage.setItem("savedFlights", JSON.stringify([]))
    }
    if (!localStorage.getItem("savedTrains")){
        localStorage.setItem("savedTrains", JSON.stringify([]))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/flights" exact element={<Flights />}></Route>
                <Route path="/hotels" exact element={<Hotels />}></Route>
                <Route path="/trains" exact element={<Trains />}></Route>
                <Route path="/saved" exact element={<Saved />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </BrowserRouter>
    )
}