import FNavbar from "../components/FNavbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Lcs(){

    // LCS algorithm main page
    return(
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg">
                <h1>Aim: LCS</h1>
            </div>
            <Footer />
        </>
    )
}