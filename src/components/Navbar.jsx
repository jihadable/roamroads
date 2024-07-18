import { IconBookmark, IconBuildingSkyscraper, IconHome, IconLogin, IconLogout, IconMenu2, IconPlaneDeparture, IconUserCircle } from "@tabler/icons-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import roamRoadsLogo from "../assets/roam-roads-logo.jpg"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Navbar.scss"
import goTop from "../utils/goTop"

function Navbar(){

    const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext)

    const links = [
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

    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const accountBtn = useRef(null)
    const accountMenu = useRef(null)

    const [showMobileLink, setShowMobileLink] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const mobileLink = useRef(null)
    const mobileMenuBtn = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!mobileLink.current?.contains(e.target) && !mobileMenuBtn.current?.contains(e.target)){
                setShowMobileLink(false)
            }
            if (!accountMenu.current?.contains(e.target) && !accountBtn.current?.contains(e.target)){
                setShowAccountMenu(false)
            }
        }

        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
            setShowMobileLink(false)
            setShowAccountMenu(false)
        }

        document.addEventListener("click", handleClickOutside)
        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener("click", handleClickOutside)
            document.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const navigate = useNavigate()

    const handleLogout = () => {
        setIsLogin(false)
        setUser(null)

        localStorage.removeItem("token")
        localStorage.removeItem("savedHotels")
        localStorage.removeItem("savedFlights")

        navigate("/")
    }

    return (
        <nav className={`navbar ${isScrolled ? "white" : ""}`}>
            <Link to="/" onClick={goTop} className="navbar-logo">
                <img src={roamRoadsLogo} alt="Logo" />
            </Link>
            <div className="navbar-link">
                <Link to="/" onClick={goTop} className="link">Beranda</Link>
                <Link to={"/hotels"} className="link">Hotel</Link>
                <Link to={"/flights"} className="link">Tiket pesawat</Link>
            </div>
            <div className="navbar-extra">
            {
                isLogin === true &&
                <div className="account">
                    <div className="account-btn" onClick={() => setShowAccountMenu(!showAccountMenu)} ref={accountBtn}>
                        <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${user.name}`} alt="User" />
                    </div>
                    <div className={`account-menu ${showAccountMenu ? "active" : ""}`} ref={accountMenu}>
                        <Link to={"/account"}>
                            <IconUserCircle stroke={1.5} />
                            <span>Akun</span>
                        </Link>
                        <Link to={"/saved"}>
                            <IconBookmark stroke={1.5} />
                            <span>Simpanan</span>
                        </Link>
                        <button type="button" onClick={handleLogout}>
                            <IconLogout stroke={1.5} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            }
            {
                isLogin === false &&
                <>
                <Link to="/login" onClick={goTop} className="login-btn">Login</Link>
                <Link to="/signup" onClick={goTop} className="signup-btn">Daftar</Link>
                </>
            }
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
                    <span>Beranda</span>
                </Link>
                <div className="line"></div>
                {
                    
                    links.map((trip, index) => (
                        <Link to={`/${trip.link}`} onClick={goTop} key={index}>
                            {trip.svg}
                            <span>{trip.name}</span>
                        </Link>
                    ))
                
                }
                {
                    isLogin ?
                    <>
                    <div className="line"></div>
                    <Link to={"/account"} onClick={goTop}>
                        <IconUserCircle stroke={1.5} />
                        <span>Akun</span>
                    </Link>
                    <Link to={"/saved"} onClick={goTop}>
                        <IconBookmark stroke={1.5} />
                        <span>Simpanan</span>
                    </Link>
                    <div className="line"></div>
                    <button type="button" onClick={handleLogout}>
                        <IconLogout stroke={1.5} />
                        <span>Logout</span>
                    </button>
                    </> :
                    <>
                    <div className="line"></div>
                    <Link to="/login" onClick={goTop}>
                        <IconLogin stroke={1.5} />
                        <span>Login</span>
                    </Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar