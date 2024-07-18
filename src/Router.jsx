import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./contexts/AuthContext";
import FlightProvider from "./contexts/FlightsContext";
import HotelProvider from "./contexts/HotelsContext";
import Account from "./pages/Account";
import Flights from "./pages/Flights";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Saved from "./pages/Saved";
import Signup from "./pages/Signup";

export default function Router(){
    return (
        <BrowserRouter>
            <AuthProvider>
            <HotelProvider>
            <FlightProvider>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="dark" />
            <Routes>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/flights" exact element={<Flights />}></Route>
                <Route path="/hotels" exact element={<Hotels />}></Route>
                <Route path="/account" exact element={<Account />}></Route>
                <Route path="/saved" exact element={<Saved />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </FlightProvider>
            </HotelProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}