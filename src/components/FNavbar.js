import React from "react";
import "../css/FNavbar.css";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { animate, delay, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCirclePlay, faCommentDots, faCompass, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";

function FNavbar() {

    const [hoverF, setHoverF] = useState(false);
    const { cuE, algoT } = AppState();

    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;

    var algoOpt = "";
    if (algoTC===0) {
        algoOpt="Home";
    }
    else if (algoTC === 1) {
        algoOpt="Theory";
    }
    else if (algoTC === 2) {
        algoOpt="Simulator";
    }
    else if (algoTC === 3) {
        algoOpt="Feedback";
    }

    const navigate = useNavigate();
    const algoName = expR[currE[0]][currE[1]][1];
    return (
        <div className="fnav">
            <h1 className="algoTitle">{expR[currE[0]][currE[1]][0]}</h1>
            {hoverF ?
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
                    onMouseEnter={() => setHoverF(true)}
                    onMouseLeave={() => setHoverF(false)}
                >
                    <button className={algoTC === 0 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName) }}><FontAwesomeIcon className="exploreIcon" icon={faHouse} /></button>
                    <button className={algoTC === 1 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName + "/theory") }}><FontAwesomeIcon className="exploreIcon" icon={faBookOpen} /></button>
                    <button className={algoTC === 2 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName + "/simulator") }}><FontAwesomeIcon className="exploreIcon" icon={faCirclePlay} /></button>
                    <button className={algoTC === 3 ? "fnB explore" : "fnB "} onClick={() => { navigate("/" + algoName + "/feedback") }}><FontAwesomeIcon className="exploreIcon" icon={faCommentDots} /></button>
                </motion.div>
                :
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoverF(true)}
                    onMouseLeave={() => setHoverF(false)}
                    className="menu">
                    {/* <FontAwesomeIcon className="exploreIcon" icon={faCompass} /> */}
                    {algoOpt}
                </motion.button>

            }


        </div>
    )
}

export default FNavbar;