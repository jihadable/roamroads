import { IconLock, IconMail } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import RoamRoadsLogo from "../assets/roam-roads-logo.jpg"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Login-Signup-form.scss"
import goTop from "../utils/goTop"

function Login(){

    document.body.classList.add("body-form")

    const [emailElement, passwordElement] = [useRef(null), useRef(null)]
    const [isLoading, setIsLoading] = useState(false)

    const { setIsLogin, setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()

        const [email, password] = [
            emailElement.current.value,
            passwordElement.current.value
        ]

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
            
            const { data } = await axios.post(`${usersAPIEndpoint}/login`, {
                email, password
            })

            localStorage.setItem("token", data.token)
            setIsLogin(true)
            setUser(data.user)
            setIsLoading(false)
            
            navigate("/")
        } catch(error){
            setIsLogin(false)
            setUser(null)
            setIsLoading(false)
            toast.error("Email atau password salah")
        }
    }
    
    return (
        <div className="form-container">
            <div className="form-text">
                <div className="img">
                    <img src={RoamRoadsLogo} alt="Logo" />
                </div>
                <h2>Temukan rencana terbaik untuk petualangan Anda</h2>
            </div>
            <div className="form-side">
                <form className="form" onSubmit={handleLogin}>
                    <h1 className="form-header">Login</h1>
                    <div className="email">
                        <label htmlFor="email">
                            <IconMail stroke={1.5} />
                        </label>
                        <input type="email" id="email" placeholder={"Email"} required ref={emailElement} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">
                            <IconLock stroke={1.5} />
                        </label>
                        <input type="password" id="password" placeholder="Password" required ref={passwordElement} />
                    </div>
                    {
                        isLoading ?
                        <div className="loader">
                            <div className="spinner"></div>
                        </div> :
                        <button type="submit">Login</button>
                    }
                    <div className="move">
                        Belum punya akun? <Link to={"/signup"} onClick={goTop}>Daftar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login