import React from "react"
import RoamRoadsLogo from "../images/roam-roads-logo.jpg"
import "../style/Login-Signup-form.scss"

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
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                                <path d="M3 7l9 6l9 -6"></path>
                            </svg>
                        </label>
                        <input type="text" id="email" placeholder={`${page === "login" ? "Email or phone number" : "Email"}`} />
                    </div>
                    {
                        page === "signup" &&
                        <div className="phone">
                            <label htmlFor="phone">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                </svg>
                            </label>
                            <input type="password" id="phone" placeholder="Phone number" />
                        </div>
                    }
                    <div className="password">
                        <label htmlFor="password">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
                                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                                <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                            </svg>
                        </label>
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    {
                        page === "signup" && 
                        <div className="confirm-password">
                            <label htmlFor="confirm-password">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
                                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
                                    <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
                                </svg>
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