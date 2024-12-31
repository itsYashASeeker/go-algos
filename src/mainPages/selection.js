import FNavbar from "../components/FNavbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ASelection() {

    // selection sort main page
    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg">
                <h1>Aim: Selection Sort</h1>
            </div>
            <Footer />
        </>
    )
}