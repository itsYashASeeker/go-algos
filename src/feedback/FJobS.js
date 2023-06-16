import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";

export default function FJobS() {
    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScGnU7fvnCmcGXkR4M9nt5jRlo_A7FGKRKFPwriCqRXSuDV7g/viewform?embedded=true" className="feedForm" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        </>
    )
}