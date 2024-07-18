import { useContext } from "react";
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

    const { user } = useContext(AuthContext)

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
                        <div className="value">{user?.name}</div>
                    </div>
                    <div className="email">
                        <div className="label">Email</div>
                        <div className="value">{user?.email}</div>
                    </div>
                    <div className="phone">
                        <div className="label">No HP</div>
                        <div className="value">{user?.phone}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}