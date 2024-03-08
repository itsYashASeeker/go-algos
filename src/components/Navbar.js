import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import somLogo from "../img/somaiyaLogo.png";
import kjsitLogo from "../img/kjsit.png";
import algo1 from "../img/acLogo3.png";
import { animate, delay, motion, spring } from "framer-motion";
import { faBars, faCancel, faEnvelope, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { expR } from "../data/expRoutes";
import { AppState } from "../context/appContext";
import SomTrust from "../img/somaiyaTrust.png";
import SomL from "./somL";
import axios from "axios";
import { ErrNoti } from "../funcs/swals";

function Navbar() {
    const navigate = useNavigate();
    const [hovNl, setHovNl] = useState(false);
    const [hovNG, setHovNG] = useState(false);
    const [hovNS, setHovNS] = useState(false);
    const [hovNO, setHovNO] = useState(false);
    const [hovNO1, setHovNO1] = useState(false);
    const [hovNO2, setHovNO2] = useState(false);

    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [uD, setUD] = userD;
    const [openSide, setOSide] = useState(false);

    const [scrollTop, setScrollTop] = useState(0);
    const [prevST, setPrevST] = useState(0);
    const [showUD, setShowUD] = useState(false);

    const logoutUser = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/user/logout`, {}, { withCredentials: true })
            .then((data) => {
                window.location.reload();
            })
            .catch((err) => {
                if (!err.response) {
                    ErrNoti({ errMessage: "Some error occurred, Please try again!" })
                    return;
                }
                const errs = err.response.data.error;
                ErrNoti({ errMessage: errs })
            })
    }

    const currL = useLocation();

    function updateY() {

        var prevscTop = scrollTop;
        var scTop = window.scrollY;
        var winHeight = window.innerHeight;
        setPrevST(prevscTop);
        setScrollTop(window.scrollY);
        var cname = "goUp";
        var currN = currL.pathname.split("/")[1];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < expR[i].length; j++) {
                if (currN === expR[i][j][1]) {
                    cname = "goUpA";
                    break;
                }
            }
        }
        if (scTop === 0 || scTop < prevscTop || prevscTop < 20) {
            retElId("idnavbar").classList.remove(cname);
        }
        else {
            retElId("idnavbar").classList.add(cname);
        }
    }
    window.addEventListener("scroll", updateY);

    useEffect(() => {
        if (openSide === false) {
            document.body.style.overflow = "scroll";
        }
        else {
            document.body.style.overflow = "hidden";
        }
    }, [openSide]);

    // useEffect(() => {
    //     const updateUser = async () => {
    //         await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/user/g`, {
    //             withCredentials: true
    //         })
    //             .then((data) => {
    //                 console.clear();
    //                 setUD(data.data);
    //             })
    //             .catch((err) => {
    //                 setUD(false);
    //                 console.clear();
    //                 var errs = err.response.data.error;
    //                 for (var i = 0; i < errs.length; i++) {
    //                     console.log(errs[i]);
    //                 }
    //             })
    //     }
    //     updateUser();
    // }, [])

    function retElId(idname) {
        return document.getElementById(idname);
    }

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="navbar"
            id="idnavbar"
        >
            <div className="divf navR1">
                <div className="dkjLogo">
                    <img className="somLogo" src={somLogo}></img>
                    <div className="kjsit navSL">
                        <p className="kjhead">K. J. Somaiya Institute of Technology, Sion</p>
                        <p>An Autonomous Institute Permanently Affiliated to the University of Mumbai</p>
                    </div>
                </div>
                <img src={SomTrust} className="somTR navSTR" />
            </div>
            <div className="divf navR2">
                {openSide ?
                    <></>
                    : <button className="menuBar" onClick={() => { setOSide(true) }}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>}
                <div className="head">
                    <NavLink to="/" className="headLink">
                        <img className="navImg" src={algo1}></img>
                        <h1 className="title">Algorithm Vlab</h1>
                    </NavLink>
                </div>
                <div id="idnavLink" className="naviLinks">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setHovNS(true)}
                        onMouseLeave={() => setHovNS(false)}
                        id="t0"
                        className={currE[0] === 0 ? "chosen dropNav" : "dropNav"}
                    >
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
                                {expR[0].map((elA, index) => {
                                    return (
                                        <motion.div className="dropItem"
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.1, delay: index * 0.1 }}
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
                                {expR[1].map((elA, index) => {
                                    return (
                                        <motion.div className="dropItem"
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.1, delay: index * 0.1 }}
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
                                {expR[2].map((elA, index) => {
                                    return (
                                        <motion.div className="dropItem"
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.1, delay: index * 0.1 }}

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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onMouseEnter={() => setHovNO(true)}
                        onMouseLeave={() => setHovNO(false)}
                        id="t0"
                        className={currE[0] && currE[0] === 3 ? "chosen dropNav" : "dropNav"}
                    >
                        <h2 className="nL">Other</h2>
                        <span></span>
                        {hovNO ?
                            <>
                                <motion.div className="drop"
                                    initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                    animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => { setHovNO(true) }}
                                    onMouseLeave={() => { setHovNO(false) }}
                                >
                                    <motion.div className="dropItem "
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1, delay: 0.1 }}
                                        onMouseEnter={() => { setHovNO1(true); setHovNO(true); setHovNO2(false) }}
                                        onMouseLeave={() => { setHovNO1(false) }}
                                    >
                                        {/* <Link className="dropLink" to="/rabinkarp"
                                    > */}
                                        <p className={("rabinkarp" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>String Matching{" >"}</p>
                                        {/* </Link> */}
                                    </motion.div>
                                    <motion.div className="dropItem "
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.1, delay: 0.1 }}
                                        onMouseEnter={() => { setHovNO2(true); setHovNO(true); setHovNO1(false); }}
                                        onMouseLeave={() => { setHovNO2(false); }}
                                    >
                                        {/* <Link className="dropLink" to="/nqueens"
                                    > */}
                                        <p className={("nqueens" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>Backtracking{" >"}</p>
                                        {/* </Link> */}
                                    </motion.div>
                                </motion.div>
                                {hovNO1 ?
                                    <motion.div className="drop nestedDrop"
                                        initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                        animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                        transition={{ duration: 0.3 }}
                                        onMouseEnter={() => { setHovNO1(true); setHovNO(true) }}
                                        onMouseLeave={() => { setHovNO1(false) }}
                                    >
                                        <motion.div className="dropItem "
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.1, delay: 0.1 }}

                                        >
                                            <Link className="dropLink" to="/rabinkarp"
                                            >
                                                <p className={("rabinkarp" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>Rabinkarp</p>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                    : <></>
                                }
                                {hovNO2 ?
                                    <motion.div className="drop nestedDrop nestDD"
                                        initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                        animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                        transition={{ duration: 0.3 }}
                                        onMouseEnter={() => { setHovNO2(true); setHovNO(true) }}
                                        onMouseLeave={() => { setHovNO2(false) }}
                                    >
                                        <motion.div className="dropItem "
                                            initial={{ y: 80, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.1, delay: 0.1 }}

                                        >
                                            <Link className="dropLink" to="/nqueens"
                                            >
                                                <p className={("nqueens" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>N-Queens</p>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                    : <></>
                                }
                            </>
                            : <></>
                        }

                    </motion.div >
                </div >

                {
                    uD ?
                        <div className="posR">
                            <button className="userP"
                                onClick={() => { setShowUD(!showUD) }}
                            >
                                <FontAwesomeIcon icon={faUser} className="uPI" />
                            </button>
                            {showUD ?
                                <motion.div className="userDash"
                                    initial={{ clipPath: "circle(0% at 100% 1%)" }}
                                    animate={{ clipPath: "circle(140.8% at 100% 1%)" }}
                                    exit={{ clipPath: "circle(0% at 100% 1%)" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {uD && uD.isAdmin ?
                                        <p className="uTag hightText">Admin</p>
                                        : <p className="uTag hightText">Student</p>
                                    }
                                    <p className="uname cNavy">{uD.name}</p>
                                    <p className="uemail">{uD.email}</p>
                                    <div className="dividerN"></div>
                                    {uD && uD.isAdmin ?
                                        <button className="exptP" onClick={() => { navigate("/admin") }}>
                                            Dashboard
                                        </button>
                                        :
                                        <>
                                            {
                                                uD.algoPerformed && uD.algoPerformed.length > 0 ?

                                                    <>
                                                        <button className="exptP" onClick={() => { navigate("/user") }}>
                                                            No. of Simulations performed: {uD.algoPerformed.length}
                                                        </button>
                                                    </>
                                                    : <>
                                                        <button className="exptP" onClick={() => { navigate("/user") }}>
                                                            No. of Simulations performed: 0
                                                        </button>
                                                    </>
                                            }
                                        </>

                                    }

                                    <button className="logout" onClick={logoutUser} >Logout</button>
                                </motion.div>
                                : <></>
                            }
                        </div>

                        : <button className="spec" onClick={() => { navigate("/login") }}>Login</button>
                }
            </div>



            {
                openSide ?
                    <>
                        <motion.div
                            initial={{ y: "-100vh" }
                            }
                            animate={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="sideBar" >
                            {/* <div className="dkjLogo dflex backW">
                                <img className="somLogo" src={somLogo}></img>
                                <div className="kjsit">
                                    <p className="kjhead">K. J. Somaiya Institute of Technology, Sion</p>
                                    <p>An Autonomous Institute Permanently Affiliated to the University of Mumbai</p>
                                </div>
                            </div>
                            <img src={SomTrust} className="somTR dflex" /> */}

                            <div className="naviLinks">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => setHovNS(true)}
                                    onMouseLeave={() => setHovNS(false)}
                                    id="t0"
                                    className={currE[0] === 0 ? "chosen dropNav" : "dropNav"}
                                >
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
                                            {expR[0].map((elA, index) => {
                                                return (
                                                    <motion.div className="dropItem"
                                                        initial={{ y: 80, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.1, delay: index * 0.1 }}
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
                                            {expR[1].map((elA, index) => {
                                                return (
                                                    <motion.div className="dropItem"
                                                        initial={{ y: 80, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.1, delay: index * 0.1 }}
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
                                            {expR[2].map((elA, index) => {
                                                return (
                                                    <motion.div className="dropItem"
                                                        initial={{ y: 80, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.1, delay: index * 0.1 }}

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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => setHovNO(true)}
                                    onMouseLeave={() => setHovNO(false)}
                                    id="t0"
                                    className={currE[0] && currE[0] === 3 ? "chosen dropNav" : "dropNav"}
                                >
                                    <h2 className="nL">Other</h2>
                                    <span></span>
                                    {hovNO ?
                                        <>
                                            <motion.div className="drop"
                                                initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                                animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                                transition={{ duration: 0.3 }}
                                                onMouseEnter={() => { setHovNO(true) }}
                                                onMouseLeave={() => { setHovNO(false) }}
                                            >
                                                <motion.div className="dropItem "
                                                    initial={{ y: 80, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ duration: 0.1, delay: 0.1 }}
                                                    onMouseEnter={() => { setHovNO1(true); setHovNO(true); setHovNO2(false) }}
                                                    onMouseLeave={() => { setHovNO1(false) }}
                                                >
                                                    {/* <Link className="dropLink" to="/rabinkarp"
                                    > */}
                                                    <p className={("rabinkarp" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>String Matching{" >"}</p>
                                                    {/* </Link> */}
                                                </motion.div>
                                                <motion.div className="dropItem "
                                                    initial={{ y: 80, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ duration: 0.1, delay: 0.1 }}
                                                    onMouseEnter={() => { setHovNO2(true); setHovNO(true); setHovNO1(false); }}
                                                    onMouseLeave={() => { setHovNO2(false); }}
                                                >
                                                    {/* <Link className="dropLink" to="/nqueens"
                                    > */}
                                                    <p className={("nqueens" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>Backtracking{" >"}</p>
                                                    {/* </Link> */}
                                                </motion.div>
                                            </motion.div>
                                            {hovNO1 ?
                                                <motion.div className="drop nestedDrop"
                                                    initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                                    animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                                    transition={{ duration: 0.3 }}
                                                    onMouseEnter={() => { setHovNO1(true); setHovNO(true) }}
                                                    onMouseLeave={() => { setHovNO1(false) }}
                                                >
                                                    <motion.div className="dropItem "
                                                        initial={{ y: 80, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.1, delay: 0.1 }}

                                                    >
                                                        <Link className="dropLink" to="/rabinkarp"
                                                        >
                                                            <p className={("rabinkarp" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>Rabinkarp</p>
                                                        </Link>
                                                    </motion.div>
                                                </motion.div>
                                                : <></>
                                            }
                                            {hovNO2 ?
                                                <motion.div className="drop nestedDrop nestDD"
                                                    initial={{ clipPath: "polygon(0 0, 100% 0%, 100% 0, 0 0)" }}
                                                    animate={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)" }}
                                                    transition={{ duration: 0.3 }}
                                                    onMouseEnter={() => { setHovNO2(true); setHovNO(true) }}
                                                    onMouseLeave={() => { setHovNO2(false) }}
                                                >
                                                    <motion.div className="dropItem "
                                                        initial={{ y: 80, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.1, delay: 0.1 }}

                                                    >
                                                        <Link className="dropLink" to="/nqueens"
                                                        >
                                                            <p className={("nqueens" == expR[currE[0]][currE[1]][1]) ? "chosen" : ""}>N-Queens</p>
                                                        </Link>
                                                    </motion.div>
                                                </motion.div>
                                                : <></>
                                            }
                                        </>
                                        : <></>
                                    }

                                </motion.div >
                            </div >
                            <button className="contactus"><FontAwesomeIcon icon={faEnvelope} /></button>
                            <button className="cancel" onClick={() => { setOSide(false) }}><FontAwesomeIcon icon={faXmark} /></button>
                        </motion.div >
                        {/* {
                            uD ?
                                <div className="posR">
                                    <button className="userP"
                                        onClick={() => { setShowUD(!showUD) }}
                                    >
                                        <FontAwesomeIcon icon={faUser} className="uPI" />
                                    </button>
                                    {showUD ?
                                        <motion.div className="userDash"
                                            initial={{ clipPath: "circle(0% at 100% 1%)" }}
                                            animate={{ clipPath: "circle(140.8% at 100% 1%)" }}
                                            exit={{ clipPath: "circle(0% at 100% 1%)" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {uD.isAdmin ?
                                                <p className="uTag hightText">Admin</p>
                                                : <p className="uTag hightText">Student</p>
                                            }
                                            <p className="uname">{uD.name}</p>
                                            <p className="uemail">{uD.email}</p>
                                            <div className="dividerN"></div>
                                            {uD.isAdmin ?
                                                <button className="exptP" onClick={() => { navigate("/admin") }}>
                                                    Dashboard
                                                </button>
                                                :
                                                <button className="exptP" onClick={() => { navigate("/user") }}>
                                                    No. of experiments performed: 2
                                                </button>
                                            }

                                            <button className="logout" onClick={logoutUser} >Logout</button>
                                        </motion.div>
                                        : <></>
                                    }
                                </div>

                                : <button className="spec" onClick={() => { navigate("/login") }}>Login</button>
                        } */}
                    </>
                    : <></>
            }
            {/* <button id="idcontact" className="contactus"><FontAwesomeIcon icon={faEnvelope} /></button> */}




        </motion.div >
    )
}

export default Navbar;