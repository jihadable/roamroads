import { IconBrandTwitter } from "@tabler/icons-react"
import "../style/Footer.scss"
import { IconBrandInstagram } from "@tabler/icons-react"
import { IconBrandTiktok } from "@tabler/icons-react"

function Footer(){

    const dataSosmed = [
        <IconBrandTwitter />,
        <IconBrandInstagram />,
        <IconBrandTiktok />
    ]

    return (
        <footer className="footer">
            <div className="footer-link">
                <div className="link">About</div>
                <div className="link">FAQs</div>
                <div className="link">Help Center</div>
            </div>
            <div className="footer-sosmed">
                {
                    dataSosmed.map((data, index) => {
                        return (
                            <div className="sosmed-link" key={index}>
                                {data}
                            </div>
                        )
                    })
                }
            </div>
            <div className="footer-creator">Create by Umar</div>
        </footer>
    )
}

export default Footer