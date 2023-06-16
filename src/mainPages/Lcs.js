import FNavbar from "../components/FNavbar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Lcs(){
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