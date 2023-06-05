import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import somLogo from "../img/kjsieit-logo.svg";
import algo1 from "../img/algo1.jpg";
import { animate, delay, motion, spring } from "framer-motion";
import { faBars, faCancel, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { expR } from "../data/expRoutes";
import { AppState } from "../context/appContext";

function Navbar() {
    const navigate = useNavigate();
    const [hovNl, setHovNl] = useState(false);
    const [hovNG, setHovNG] = useState(false);
    const [hovNS, setHovNS] = useState(false);

    const { cuE, algoT } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [openSide, setOSide] = useState(false);
    // console.log(currE);

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="navbar">
            <img className="somLogo" src={somLogo}></img>
            <div className="head">
                <NavLink to="/" className="headLink">
                    <img className="navImg" src={algo1}></img>
                    <h1 className="title">Algorithm Vlab</h1>
                </NavLink>
            </div>
            <div id="idnavLink" className="naviLinks">
                <div
                    onMouseEnter={() => setHovNS(true)}
                    onMouseLeave={() => setHovNS(false)}
                    id="t0"
                    className="dropNav">
                    <h2 className="nL">Sorting</h2>
                    <span></span>
                    {hovNS ?
                        <motion.div className="drop"
                            initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHovNS(true)}
                            onMouseLeave={() => setHovNS(false)}
                        >
                            <motion.div className="dropItem"
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.1 }}
                            >
                                <Link className="dropLink" >
                                    <p>Insertion Sort</p>
                                </Link>
                            </motion.div>
                            <motion.div className="dropItem"
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.1, delay: 0.1 }}
                            >
                                <Link className="dropLink" >
                                    <p>Selection Sort</p>
                                </Link>
                            </motion.div>
                            <motion.div className="dropItem"
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.1, delay: 0.2 }}
                            >
                                <Link className="dropLink" >
                                    <p>Quick Sort</p>
                                </Link>
                            </motion.div>
                            <motion.div className="dropItem"
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.1, delay: 0.3 }}
                            >
                                <Link className="dropLink" >
                                    <p>Merge Sort</p>
                                </Link>
                            </motion.div>
                            <motion.div className="dropItem"
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.1, delay: 0.4 }}
                            >
                                <Link className="dropLink" >
                                    <p>Bubble Sort</p>
                                </Link>
                            </motion.div>
                        </motion.div>
                        : <></>
                    }
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHovNG(true)}
                    onMouseLeave={() => setHovNG(false)}
                    id="t1"
                    className={currE[0] && currE[0] === 1 ? "chosen dropNav" : "dropNav"}>
                    <h2 className="nL">Greedy</h2>
                    <span></span>
                    {hovNG ?
                        <motion.div className="drop"
                            initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHovNG(true)}
                            onMouseLeave={() => setHovNG(false)}
                        >
                            {expR[1].map((elA) => {
                                return (
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <Link className="dropLink" to={"/" + elA[1]}>
                                            <p className={(elA[1] == expR[currE[0]][currE[1]][1]) ? "chosen" : ""} >{elA[0]}</p>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                        : <></>
                    }
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHovNl(true)}
                    onMouseLeave={() => setHovNl(false)}
                    id="t2"
                    className={currE[0] && currE[0] === 2 ? "chosen dropNav" : "dropNav"}>
                    <h2 className="nL">Dynamic</h2>
                    <span></span>
                    {hovNl ?
                        <motion.div className="drop"
                            initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHovNl(true)}
                            onMouseLeave={() => setHovNl(false)}
                        >
                            {expR[2].map((elA) => {
                                return (
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <Link className="dropLink" to={"/" + elA[1]}>
                                            <p id="1e0" className={(elA[1] == expR[currE[0]][currE[1]][1]) ? "chosen" : ""} >{elA[0]}</p>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                        : <></>
                    }
                </motion.div>

            </div>
            <button id="idcontact" className="contactus"><FontAwesomeIcon icon={faEnvelope} /></button>

            {openSide ?
                <motion.div
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="sideBar">

                    <div className="naviLinks">
                        <div
                            onMouseEnter={() => setHovNS(true)}
                            onMouseLeave={() => setHovNS(false)}
                            id="t0"
                            className="dropNav">
                            <h2 className="nL">Sorting</h2>
                            <span></span>
                            {hovNS ?
                                <motion.div className="drop"
                                    initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                    animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => setHovNS(true)}
                                    onMouseLeave={() => setHovNS(false)}
                                >
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <Link className="dropLink" >
                                            <p>Insertion Sort</p>
                                        </Link>
                                    </motion.div>
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1, delay: 0.1 }}
                                    >
                                        <Link className="dropLink" >
                                            <p>Selection Sort</p>
                                        </Link>
                                    </motion.div>
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1, delay: 0.2 }}
                                    >
                                        <Link className="dropLink" >
                                            <p>Quick Sort</p>
                                        </Link>
                                    </motion.div>
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1, delay: 0.3 }}
                                    >
                                        <Link className="dropLink" >
                                            <p>Merge Sort</p>
                                        </Link>
                                    </motion.div>
                                    <motion.div className="dropItem"
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1, delay: 0.4 }}
                                    >
                                        <Link className="dropLink" >
                                            <p>Bubble Sort</p>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                                : <></>
                            }
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHovNG(true)}
                            onMouseLeave={() => setHovNG(false)}
                            id="t1"
                            className={currE[0] && currE[0] === 1 ? "chosen dropNav" : "dropNav"}>
                            <h2 className="nL">Greedy</h2>
                            <span></span>
                            {hovNG ?
                                <motion.div className="drop"
                                    initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                    animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => setHovNG(true)}
                                    onMouseLeave={() => setHovNG(false)}
                                >
                                    {expR[1].map((elA) => {
                                        return (
                                            <motion.div className="dropItem"
                                                initial={{ y: 80, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.1 }}
                                            >
                                                <Link className="dropLink" to={"/" + elA[1]}>
                                                    <p className={(elA[1] == expR[currE[0]][currE[1]][1]) ? "chosen" : ""} >{elA[0]}</p>
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                                : <></>
                            }
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onMouseEnter={() => setHovNl(true)}
                            onMouseLeave={() => setHovNl(false)}
                            id="t2"
                            className={currE[0] && currE[0] === 2 ? "chosen dropNav" : "dropNav"}>
                            <h2 className="nL">Dynamic</h2>
                            <span></span>
                            {hovNl ?
                                <motion.div className="drop"
                                    initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                    animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => setHovNl(true)}
                                    onMouseLeave={() => setHovNl(false)}
                                >
                                    {expR[2].map((elA) => {
                                        return (
                                            <motion.div className="dropItem"
                                                initial={{ y: 80, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.1 }}
                                            >
                                                <Link className="dropLink" to={"/" + elA[1]}>
                                                    <p id="1e0" className={(elA[1] == expR[currE[0]][currE[1]][1]) ? "chosen" : ""} >{elA[0]}</p>
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                                : <></>
                            }
                        </motion.div>

                    </div>
                    <button className="contactus"><FontAwesomeIcon icon={faEnvelope} /></button>
                    <button className="cancel" onClick={() => { setOSide(false) }}><FontAwesomeIcon icon={faXmark} /></button>
                </motion.div>
                : <button className="menuBar" onClick={() => { setOSide(true) }}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>
            }
            {/* <button className="alButton" onClick={() => { }}>New</button> */}
        </motion.div >
    )
}

export default Navbar;