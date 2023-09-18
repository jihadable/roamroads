import { useEffect, useState, useRef } from "react"
import roamRoadsLogo from "../assets/roam-roads-logo.jpg"
import "../style/Navbar.scss"
import { IconHome2 } from "@tabler/icons-react"
import { IconPlaneDeparture } from "@tabler/icons-react"
import { IconTrain } from "@tabler/icons-react"
import { IconMenu2 } from "@tabler/icons-react"
import { IconHome } from "@tabler/icons-react"
import { IconBookmark } from "@tabler/icons-react"
import { IconLogin } from "@tabler/icons-react"
import { IconChevronDown } from "@tabler/icons-react"

function Navbar(){

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
                        Book now <IconChevronDown stroke={1.5} />
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
            </div>

            {/* mobile */}
            <div className="mobile-menu">
                <div className="humberger-menu" onClick={() => {setShowMobileLink(!showMobileLink)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </div>
            </div>
            <div className={`mobile-link ${showMobileLink ? "active" : ""}`} ref={mobileLink}>
                <a href="/">
                    <IconHome stroke={1.5} />
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
                    <IconBookmark stroke={1.5} />
                    <span>Saved</span>
                </a>
                <div className="line"></div>
                <a href="/login">
                    <IconLogin stroke={1.5} />
                    <span>Login</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar