import React from "react"
import RoamRoadsLogo from "../assets/roam-roads-logo.jpg"
import "../style/Login-Signup-form.scss"
import { IconMail } from "@tabler/icons-react"
import { IconPhone } from "@tabler/icons-react"
import { IconLock } from "@tabler/icons-react"

function LoginSignupForm(props){

    document.body.classList.add("body-form")

    const page = props.page

    return (
        <div className="form-container">
            <div className="form-text">
                <div className="img">
                    <img src={RoamRoadsLogo} alt="Logo" />
                </div>
                <h2>Help people to find their best roads for amazing trip</h2>
            </div>
            <div className="form-side">
                <form action="" className="form">
                    <h1 className="form-header">{page === "login" ? "Login" : "Sign up"}</h1>
                    <div className="email">
                        <label htmlFor="email">
                            <IconMail stroke={1.5} />
                        </label>
                        <input type="text" id="email" placeholder={`${page === "login" ? "Email or phone number" : "Email"}`} />
                    </div>
                    {
                        page === "signup" &&
                        <div className="phone">
                            <label htmlFor="phone">
                                <IconPhone stroke={1.5} />
                            </label>
                            <input type="password" id="phone" placeholder="Phone number" />
                        </div>
                    }
                    <div className="password">
                        <label htmlFor="password">
                            <IconLock stroke={1.5} />
                        </label>
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    {
                        page === "signup" && 
                        <div className="confirm-password">
                            <label htmlFor="confirm-password">
                                <IconLock stroke={1.5} />
                            </label>
                            <input type="password" id="confirm-password" placeholder="Confirm password" />
                        </div>
                    }
                    <button type="button">{page === "login" ? "Login" : "Sign up"}</button>
                    <div className="move">
                        {page === "login" ? "Don't have an acoount? " : "Already have an account? "} 
                        <a href={page === "login" ? "/signup" : "/login"}>{page === "login" ? "Sign up" : "Login"}</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginSignupForm