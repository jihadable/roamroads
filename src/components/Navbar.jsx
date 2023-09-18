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
import { Link } from "react-router-dom"
import goTop from "./goTop"

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
            <Link to="/" onClick={goTop} className="navbar-logo">
                <img src={roamRoadsLogo} alt="Logo" />
            </Link>
            <div className="navbar-link">
                <Link to="/" onClick={goTop} className="link home-btn">Home</Link>
                <div className="link">
                    <span>
                        Book now <IconChevronDown stroke={1.5} />
                    </span>
                    <div className="booknow-popup">
                        {
                            trips.map((trip, index) => {
                                return (
                                    <Link to={`/${trip.link}`} onClick={goTop} key={index} className="popup-link">
                                        {trip.svg}
                                        <span>{trip.name}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
                <Link to={"/saved"} onClick={goTop} className="link">Saved</Link>
            </div>
            <div className="navbar-extra">
                <Link to="/login" onClick={goTop} className="login-btn">Login</Link>
                <Link to="/signup" onClick={goTop} className="signup-btn">Signup</Link>
            </div>

            {/* mobile */}
            <div className="mobile-menu">
                <div className="humberger-menu" onClick={() => {setShowMobileLink(!showMobileLink)}} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </div>
            </div>
            <div className={`mobile-link ${showMobileLink ? "active" : ""}`} ref={mobileLink}>
                <Link to="/" onClick={goTop}>
                    <IconHome stroke={1.5} />
                    <span>Home</span>
                </Link>
                <div className="line"></div>
                {
                    
                    trips.map((trip, index) => {
                        return (
                            <Link to={`/${trip.link}`} onClick={goTop} key={index}>
                                {trip.svg}
                                <span>{trip.name}</span>
                            </Link>
                        )
                    })
                
                }
                <div className="line"></div>
                <Link to={"/saved"} onClick={goTop}>
                    <IconBookmark stroke={1.5} />
                    <span>Saved</span>
                </Link>
                <div className="line"></div>
                <Link to="/login" onClick={goTop}>
                    <IconLogin stroke={1.5} />
                    <span>Login</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar