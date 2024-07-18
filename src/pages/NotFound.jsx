import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import notFound from "../assets/not-found.png"
import "../style/NotFound.scss"

export default function NotFound(){
    return (
        <section className="not-found">
            <img src={notFound} alt="Not Found" />
            <h1>NOT FOUND</h1>
            <h3>404</h3>
            <Link to={"/"}>
                <IconArrowLeft stroke={1.5} />
                <span>Kembali ke Beranda</span>
            </Link>
        </section>
    )
}