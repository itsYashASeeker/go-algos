import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { animate, delay, motion } from "framer-motion";
import "../css/Home.css";
import Navbar from "../components/Navbar";
import algo1 from "../img/algo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faArrowUpShortWide, faAtom, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

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
                    transition={{ duration: 0.3 }}
                >
                    <img className="algoPic" src={algo1}></img>
                    <div className="divTitle">
                        <p className="homeTitle">Welcome to Analysis of Algorithms Virtual Lab
                            <span className="effect"></span>
                        </p>
                    </div>
                </motion.section>
                <motion.section className="homeSect sect2"
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}

                >
                    <div className="box">
                        <button className="cards" name="sorting" onClick={() => { naviTo("sorting") }}>
                            <FontAwesomeIcon icon={faArrowUpShortWide} className="algoIcon" />
                            <p className="algoName">Sorting</p>
                        </button>
                        <button className="cards" name="greedy" onClick={() => { naviTo("greedy") }}>
                            <FontAwesomeIcon icon={faPersonRunning} className="algoIcon" />
                            <p className="algoName">Greedy</p>
                        </button>
                        <button className="cards" name="dynamic-pro" onClick={() => { naviTo("dynamic") }}>
                            <FontAwesomeIcon icon={faAtom} className="algoIcon" />
                            <p className="algoName">Dynamic Programming</p>
                        </button>
                    </div>

                </motion.section>
                {/* <motion.section className="homeSect sect3"
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    id="idsect3"
                >
                    <h1 className="algosN">Sorting</h1>
                    <div className="algos">
                        <button className="sButton">Insertion<span></span></button>
                        <button className="sButton">Selection<span></span></button>
                        <button className="sButton">Bubble<span></span></button>
                    </div>
                </motion.section>
                <motion.section className="homeSect sect3 sect4"
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    id="idsect4"
                >
                    <h1 className="algosN">Greedy</h1>
                    <div className="algos">
                        <button className="sButton" name="job-scheduling" onClick={naviTo}>Job Scheduling<span></span></button>
                        <button className="sButton" name="dijkstra" onClick={naviTo}>Dijkstra<span></span></button>
                        <button className="sButton" name="kruskals" onClick={naviTo}>Kruskal's<span></span></button>
                    </div>
                </motion.section>
                <motion.section className="homeSect sect3 sect5"
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    id="idsect5"
                >
                    <h1 className="algosN">Dynamic Programming</h1>
                    <div className="algos">
                        <button className="sButton" name="lcs" onClick={naviTo}>Lcs<span></span></button>
                        <button className="sButton" name="knapsack" onClick={naviTo}>Knapsack<span></span></button>
                        <button className="sButton" name="rabinkarp" onClick={naviTo}>Rabinkarp<span></span></button>
                        <button className="sButton" name="nqueens" onClick={naviTo}>N-Queens<span></span></button>
                    </div>
                </motion.section> */}

            </motion.div>
            <Footer />
        </>
    );
}

export default Home;