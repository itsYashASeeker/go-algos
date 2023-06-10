import React from "react";
import { useNavigate } from "react-router-dom";

import { animate, delay, motion } from "framer-motion";
import "../css/Home.css";
import Navbar from "../components/Navbar";

function Home() {
    const navigate = useNavigate();

    const naviTo = (e) => {
        navigate("/" + e.target.name);
    }

    return (
        <>
            <Navbar />
            <motion.div className="fullbg fullbgHOME"
                initial={{ opacity: 0, }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div>
                    <h1>Welcome to Go-Algos!</h1>
                    <div className="algos">
                        <button name="job-scheduling" onClick={naviTo}>Job Scheduling</button>
                        <button name="lcs" onClick={naviTo}>Lcs</button>
                        <button name="dijkstra" onClick={naviTo}>Dijkstra</button>
                        <button name="nqueens" onClick={naviTo}>N-Queens</button>
                        <button name="kruskals" onClick={naviTo}>Kruskal's</button>
                        <button name="knapsack" onClick={naviTo}>Knapsack</button>
                        <button name="insert" onClick={naviTo}>Insertion Sort</button>
                    </div>
                </div>


            </motion.div>
        </>
    );
}

export default Home;