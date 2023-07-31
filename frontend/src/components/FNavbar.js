import React from "react";
import "../css/Home.css";
import "../css/FNavbar.css";
import { useNavigate } from "react-router-dom";
import { animate, delay, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCirclePlay, faCommentDots, faCompass, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";
import { useEffect } from "react";

function FNavbar() {
    const [scrollTop, setScrollTop] = useState(0);
    const [prevST, setPrevST] = useState(0);
    const [hoverF, setHoverF] = useState(false);
    const { cuE, algoT } = AppState();

    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;

    var algoOpt = "";
    if (algoTC === 0) {
        algoOpt = "Theory";
    }
    else if (algoTC === 1) {
        algoOpt = "Simulator";
    }
    else if (algoTC === 2) {
        algoOpt = "Feedback";
    }

    const navigate = useNavigate();
    const algoName = expR[currE[0]][currE[1]][1];

    function retElId(idname) {
        return document.getElementById(idname);
    }

    // useEffect(() => {
    function updateY() {
        var prevscTop = scrollTop;
        var scTop = window.scrollY;
        var winHeight = window.innerHeight;
        setPrevST(prevscTop);
        setScrollTop(window.scrollY);
        if (scTop === 0 || scTop < prevscTop || prevscTop < 20) {
            if (retElId("idFNav")) {
                retElId("idFNav").classList.remove("goUpF");
            }

        }
        else {
            if (retElId("idFNav")) {
                retElId("idFNav").classList.add("goUpF");
            }
        }

    }
    window.addEventListener("scroll", updateY);
    // });

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fnav"
            id="idFNav"
        >
            <h1 className="algoTitle">{expR[currE[0]][currE[1]][0]}</h1>
            {/* <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoverF(true)}
                onMouseLeave={() => setHoverF(false)}
                className="menu">
                {algoOpt}
            </motion.button> */}
            <motion.div
                initial={{
                    clipPath: "circle(1.5% at 50% 50%)"
                }}

                animate={{
                    clipPath: "circle(80% at 50% 50%) "
                }}
                exit={{
                    clipPath: "circle(1.5% at 50% 50%)"
                }}
                transition={{
                    type: "spring",
                    duration: 0.7,
                }}
                // exit={{ scale: 0 }}
                className="fnavmain"
            >
                <button className={"fnB "} onClick={() => { navigate("/") }}><FontAwesomeIcon className="exploreIcon" icon={faHouse} /><span className="hovT">Home</span></button>
                <button className={algoTC === 0 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName) }}><FontAwesomeIcon className="exploreIcon" icon={faBookOpen} /><span className="hovT">Theory</span></button>
                <button className={algoTC === 1 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName + "/simulator") }}><FontAwesomeIcon className="exploreIcon" icon={faCirclePlay} /><span className="hovT">Simulator</span></button>
                <button className={algoTC === 2 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName + "/feedback") }}><FontAwesomeIcon className="exploreIcon" icon={faCommentDots} /><span className="hovT">Feedback</span></button>
            </motion.div>
        </motion.div>
    )
}

export default FNavbar;