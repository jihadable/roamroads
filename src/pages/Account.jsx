import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Account.scss";
import NotFound from "./NotFound";

export default function Account(){

    const { isLogin } = useContext(AuthContext)

    if (isLogin === false){
        return <NotFound />
    }
    if (isLogin === true){
        document.title = "RoamRoads | Akun"
        
        return (
            <>
            <Navbar />
            <AccountSection />
            <Footer />
            </>
        )
    }
}

function AccountSection(){

    const { user, setUser } = useContext(AuthContext)

    const [nameElement, phoneElement] = [useRef(null), useRef(null)]
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdateUserProfile = async() => {
        const phonePattern = /^08\d{8,13}$/
        const [name, phone] = [nameElement.current.value, phoneElement.current.value]

        if (!phonePattern.test(phone)){
            toast.error("No HP yang Anda masukkan tidak valid")

            return
        }

        if (name === "" || phone === ""){
            toast.error("Masih ada kolom yang belum diisi!")

            return
        }

        try {
            setIsLoading(true)

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
            const token = localStorage.getItem("token")

            await axios.post(usersAPIEndpoint, 
                { name, phone },
                {
                    params: {
                        "_method": "patch"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            toast.success("Berhasil memperbarui data pengguna")
            setUser({...user, name, phone})
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error("Gagal memperbarui data pengguna")
        }
    }

    return (
        <section className="account-section">
            <div className="title">Akun Saya</div>
            <div className="content">
                <div className="img">
                    <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}name=${user.name}`} alt="User" />
                </div>
                <div className="info">
                    <div className="name">
                        <div className="label">Nama</div>
                        <input type="text" className="value" defaultValue={user.name} ref={nameElement} />
                    </div>
                    <div className="email">
                        <div className="label">Email</div>
                        <div className="value">{user?.email}</div>
                    </div>
                    <div className="phone">
                        <div className="label">No HP</div>
                        <input type="text" className="value" defaultValue={user.phone} ref={phoneElement} />
                    </div>
                {
                    isLoading ?
                    <div className="loader">
                        <div className="spinner"></div>
                    </div> :
                    <button type="button" onClick={handleUpdateUserProfile}>Simpan</button>
                }
                </div>
            </div>
        </section>
    )
}