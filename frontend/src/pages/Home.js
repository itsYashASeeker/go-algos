import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animate, delay, motion } from "framer-motion";
import "../css/Home.css";
import Navbar from "../components/Navbar";
import algo1 from "../img/acLogo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faArrowUpShortWide, faAtom, faBackwardFast, faEquals, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import AboutUs from "../components/aboutus";

function Home() {


    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink);
    }

    function retElId(idname) {
        return document.getElementById(idname);
    }

    function scrollTo(id) {
        // retElId(id).scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <Navbar />
            <motion.div className="fullbg fullbgHOME">
                <motion.section className="homeSect sect1"
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <img className="algoPic" src={algo1}></img>
                    <div className="divTitle">
                        <p className="homeTitle">Welcome to Virtual Lab for Algorithms
                            <span className="effect"></span>
                        </p>
                    </div>
                </motion.section>

                <motion.section className="homeSect sect2">
                    <div className="boxS">
                        <motion.button className="cards" name="sorting" onClick={() => { naviTo("sorting") }}
                            initial={{ y: 100, opacity: 0, }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faArrowUpShortWide} className="algoIcon" />
                            <p className="algoName">Sorting</p>
                        </motion.button>
                        <motion.button className="cards" name="greedy" onClick={() => { naviTo("greedy") }}
                            initial={{ y: 100, opacity: 0, }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faPersonRunning} className="algoIcon" />
                            <p className="algoName">Greedy</p>
                        </motion.button>
                        <motion.button className="cards" name="dynamic-pro" onClick={() => { naviTo("dynamic") }}
                            initial={{ y: 100, opacity: 0, }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faAtom} className="algoIcon" />
                            <p className="algoName">Dynamic Programming</p>
                        </motion.button>
                        <motion.button className="cards" name="dynamic-pro" onClick={() => { naviTo("backtracking") }}
                            initial={{ y: 100, opacity: 0, }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faBackwardFast} className="algoIcon" />
                            <p className="algoName">Backtracking</p>
                        </motion.button>
                        <motion.button className="cards" name="dynamic-pro" onClick={() => { naviTo("string-match") }}
                            initial={{ y: 100, opacity: 0, }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faEquals} className="algoIcon" />
                            <p className="algoName">String Matching</p>
                        </motion.button>
                    </div>

                </motion.section>
                {/* <section className="sectM divf">
                    <div className="divf ddM">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.p
                                className="mt1">Be it a 15 inch Laptop or</motion.p>
                            <motion.p
                                className="mt1">a 6 inch Mobile Phone</motion.p>
                        </motion.div>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="mt2 mUpL">Access the simulators on any device, <span className="hightText">there should be no hindrance to learning!</span></motion.p>
                    </div>

                </section> */}
                <AboutUs />
            </motion.div>

            <Footer />
        </>
    );
}

export default Home;