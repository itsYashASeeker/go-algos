import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import "../css/Home.css"
import Footer from "./Footer";

export default function PageNotFound() {
    return (
        <>
            <Navbar />
            <div className="notFound divf divfC">
                <p className="f4">Error: 404</p>
                <FontAwesomeIcon icon={faHeartCrack} className="f6"/>
            </div>
            <Footer />
        </>
    )
}