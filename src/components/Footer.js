import { Link } from "react-router-dom";
import "../css/Footer.css";
import kjsitLogo from "../img/kjsit.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import githubL from "../img/github.svg";
import linkedinL from "../img/linkedin.svg";
import instagramL from "../img/instagram.svg";
import somaiyaTrust from "../img/somaiyaTrust.png";

function Footer() {

    const [showL, setShowL] = useState(0);

    const showLinks = () => {
        console.log("hello");
    }

    return (
        <div className="footer"
            onClick={() => { setShowL(0) }}
        >
            <div className="row">
                {/* <img src={kjsitLogo} className="fkjLogo"></img>
                <img src={somaiyaTrust} className="trustLogo"></img> */}
                <p className="dev1"><Link className="compLink" target="blank" to="https://kjsit.somaiya.edu.in/en/programme/computer-engineering">Department of Computer Engineering</Link></p>
            </div>
            {/* <div className="divider"></div> */}
            <div className="row">
                <p className="dev1">Developed by:
                    <button
                        className="dev2"
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowL(1) }}>
                        {showL === 1 ?
                            <div className="links">
                                <Link className="linkL" to="https://github.com/itsYashASeeker" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={githubL} /></Link>
                                <Link className="linkL" to="https://www.linkedin.com/in/yash-chauhan-180031203/" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={linkedinL} /></Link>
                                <Link className="linkL" to="https://www.instagram.com/yashck.iso/" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={instagramL} /></Link>
                            </div>
                            : <></>
                        }Yash K Chauhan</button>
                    <button
                        className="dev2"
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowL(2) }}>
                        {showL === 2 ?
                            <div className="links">
                                <Link className="linkL" to="https://github.com/yashAPro1" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={githubL} /></Link>
                                <Link className="linkL" to="https://www.linkedin.com/in/yashkumar-dubey-716933222" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={linkedinL} /></Link>
                                <Link className="linkL" to="https://www.instagram.com/dubeyyash758/" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={instagramL} /></Link>
                            </div>
                            : <></>
                        }Yashkumar S Dubey</button>
                    <button
                        className="dev2"
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setShowL(3) }}>
                        {showL === 3 ?
                            <div className="links">
                                <Link className="linkL" to="https://github.com/kushalharsora" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={githubL} /></Link>
                                <Link className="linkL" to="https://www.linkedin.com/in/kushal-harsora" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={linkedinL} /></Link>
                                <Link className="linkL" to="https://www.instagram.com/kushal_harsora/" target="_blank" onClick={(e) => { e.stopPropagation(); }}><img src={instagramL} /></Link>
                            </div>
                            : <></>
                        }Kushal C Harsora</button>
                </p>
            </div>
            <div className="row">
                <p className="dev1">Under guidance of: <Link className="dev2" to="https://kjsit.somaiya.edu.in/en/view-member/220066?type=faculty" target="blank">Prof. Mrunali Desai</Link></p>
            </div>
        </div>
    )
}

export default Footer;