import { IconBrandTwitter } from "@tabler/icons-react"
import "../style/Footer.scss"
import { IconBrandInstagram } from "@tabler/icons-react"
import { IconBrandTiktok } from "@tabler/icons-react"
import logo from "../assets/roam-roads-logo.jpg"

function Footer(){

    const dataSosmed = [
        <IconBrandTwitter />,
        <IconBrandInstagram />,
        <IconBrandTiktok />
    ]

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="links">
                    <div className="link">
                        <div className="item">About</div>
                        <div className="item">FAQs</div>
                        <div className="item">Help Center</div>
                    </div>
                    <div className="sosmed">
                    {
                        dataSosmed.map((data, index) => {
                            return (
                                <div className="item" key={index}>
                                    {data}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">©2023 RoamRoads</div>
                <div className="privacy-policy">Privacy Policy</div>
            </div>
        </footer>
    )
}

export default Footer