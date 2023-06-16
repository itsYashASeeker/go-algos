import FNavbar from "../components/FNavbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Bubble() {
    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg">
                <h1>Aim: Bubble Sort</h1>
            </div>
            <Footer />
        </>
    )
}