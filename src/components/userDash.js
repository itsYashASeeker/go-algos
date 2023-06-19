import { useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

export default function UserDash() {
    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [uD, setUD] = userD;
    const [feedD, setFeedD] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!uD || uD.isAdmin === true) {
            navigate("/");
        }
    }, uD);



    return (
        <>
            <Navbar />
            <div className="divf loginBG">
                {uD ?
                    <section>
                        <h1>
                            Welcome {uD.name}
                        </h1>
                    </section>
                    
                    : 
                    <></>
                }
            </div>

        </>

    );
}