import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import { AppState } from "../context/appContext";

export default function FLcs() {

    const navigate = useNavigate();
    const { userD } = AppState();

    const [uD, setUD] = userD;

    function naviTo(locName) {
        navigate("/" + locName);
    }

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg">
                {uD ?
                    <p>Hello {uD.username}</p>
                    :
                    <>
                        <button onClick={() => { naviTo("login") }}>Login</button>
                        <button onClick={() => { naviTo("register") }}>Register</button>
                    </>

                }

            </div>
        </>
    )
}