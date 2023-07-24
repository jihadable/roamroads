import { useEffect, useState, useRef } from "react"
import roamRoadsLogo from "../images/roam-roads-logo.png"
import "../style/Navbar.scss"

function Navbar(){

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

    const [showMobileLink, setShowMobileLink] = useState(false)

    const mobileLink = useRef()
    const mobileMenuBtn = useRef()

    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!mobileLink.current.contains(e.target) && !mobileMenuBtn.current.contains(e.target)){
                setShowMobileLink(false)
            }
        })
        
        document.addEventListener("scroll", function(){
            setShowMobileLink(false)
        })
    })

    return (
        <nav className="navbar">
            <a href="/" className="navbar-logo">
                <img src={roamRoadsLogo} alt="Logo" />
            </a>
            <div className="navbar-link">
                <a href="/" className="link home-btn">Home</a>
                <div className="link">
                    <span>
                        Book now <span class="material-symbols-rounded">expand_more</span>
                    </span>
                    <div className="booknow-popup">
                        {
                            trips.map((trip, index) => {
                                return (
                                    <a href={`/${trip.link}`} key={index} className="popup-link">
                                        {trip.svg}
                                        <span>{trip.name}</span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
                <a href="saved" className="link">Saved</a>
            </div>
            <div className="navbar-extra">
                <a href="/login" className="login-btn">Login</a>
                <a href="/signup" className="signup-btn">Signup</a>
                <span href="/" className="account-btn">
                    <span class="material-symbols-rounded">account_circle</span>
                </span>
            </div>

            {/* mobile */}
            <div className="mobile-menu">
                <span href="/" className="account-btn-mobile">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                    </svg>
                </span>
                <div className="humberger-menu" onClick={() => {setShowMobileLink(!showMobileLink)}} ref={mobileMenuBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 6l16 0"></path>
                        <path d="M4 12l16 0"></path>
                        <path d="M4 18l16 0"></path>
                    </svg>
                </div>
            </div>
            <div className={`mobile-link ${showMobileLink ? "active" : ""}`} ref={mobileLink}>
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                    </svg>
                    <span>Home</span>
                </a>
                <div className="line"></div>
                {
                    
                    trips.map((trip, index) => {
                        return (
                            <a href={`/${trip.link}`} key={index}>
                                {trip.svg}
                                <span>{trip.name}</span>
                            </a>
                        )
                    })
                
                }
                <div className="line"></div>
                <a href="/saved">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
                    </svg>
                    <span>Saved</span>
                </a>
                <div className="line"></div>
                <a href="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
                    </svg>
                    <span>Login</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar