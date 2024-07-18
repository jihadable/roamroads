import { IconBrandInstagram, IconBrandTiktok, IconBrandTwitter } from "@tabler/icons-react"
import appStore from "../assets/app-store.png"
import playStore from "../assets/play-store.png"
import logo from "../assets/roam-roads-logo.jpg"
import "../style/Footer.scss"

function Footer(){

    const dataSosmed = [
        <IconBrandTwitter key={0} />,
        <IconBrandInstagram key={1} />,
        <IconBrandTiktok key={2} />
    ]

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="links">
                    <div className="link">
                        <div className="item">Tentang</div>
                        <div className="item">Karir</div>
                        <div className="item">Pusat Bantuan</div>
                    </div>
                    <div className="sosmed">
                    {
                        dataSosmed.map((data, index) => (
                            <div className="item" key={index}>{data}</div>
                        ))
                    }
                    </div>
                    <div className="apps">
                        <img src={playStore} alt="Play Store" />
                        <img src={appStore} alt="App Store" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">©2024 RoamRoads</div>
                <div className="privacy-policy">Privacy Policy</div>
            </div>
        </footer>
    )
}

export default Footer