import { IconLock, IconMail, IconPhone, IconUser } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import RoamRoadsLogo from "../assets/roam-roads-logo.jpg"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Login-Signup-form.scss"
import goTop from "../utils/goTop"

function Signup(){

    document.body.classList.add("body-form")

    const [
        nameElement, emailElement, phoneElement, passwordElement, confirmPasswordElement
    ] = [
        useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
    ]

    const [isLoading, setIsLoading] = useState(false)

    const { setIsLogin, setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSignUp = async(e) => {
        e.preventDefault()

        const phonePattern = /^08\d{8,13}$/
        const [name, email, phone, password, confirmPassword] = [
            nameElement.current.value,
            emailElement.current.value,
            phoneElement.current.value,
            passwordElement.current.value,
            confirmPasswordElement.current.value
        ]

        if (!phonePattern.test(phone)){
            toast.error("No HP tidak valid")

            return
        }

        if (password !== confirmPassword){
            toast.error("Konfirmasi password tidak sesuai")

            return
        }

        if (password.length < 8){
            toast.error("Password harus memiliki minimal 8 karakter")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
            
            const { data } = await axios.post(`${usersAPIEndpoint}/register`, {
                name, email, phone, password
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
            toast.error("Gagal melakukan pendaftaran")
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
                <form className="form" onSubmit={handleSignUp}>
                    <h1 className="form-header">Daftar</h1>
                    <div className="name">
                        <label htmlFor="name">
                            <IconUser stroke={1.5} />
                        </label>
                        <input type="text" id="name" placeholder={"Nama"} required ref={nameElement} />
                    </div>
                    <div className="email">
                        <label htmlFor="email">
                            <IconMail stroke={1.5} />
                        </label>
                        <input type="email" id="email" placeholder={"Email"} required ref={emailElement} />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">
                            <IconPhone stroke={1.5} />
                        </label>
                        <input type="text" id="phone" placeholder="No HP" required ref={phoneElement} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">
                            <IconLock stroke={1.5} />
                        </label>
                        <input type="password" id="password" placeholder="Password" required ref={passwordElement} />
                    </div>
                    <div className="confirm-password">
                        <label htmlFor="confirm-password">
                            <IconLock stroke={1.5} />
                        </label>
                        <input type="password" id="confirm-password" placeholder="Konfirmasi password" required ref={confirmPasswordElement} />
                    </div>
                    {
                        isLoading ?
                        <div className="loader">
                            <div className="spinner"></div>
                        </div> :
                        <button type="submit">Daftar</button>
                    }
                    <div className="move">
                        Sudah punya akun? <Link to={"/login"} onClick={goTop}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup