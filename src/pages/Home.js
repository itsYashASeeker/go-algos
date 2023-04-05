import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/JobSched.css";
import { animate, delay, motion } from "framer-motion";

function Home() {
    const navigate = useNavigate();

    const naviTo = (e) =>{
        navigate(e.target.name);
    }

    return (
        <>
            <motion.div className="fullbg fullbgH"
                initial={{ opacity: 0, }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
            <h1>Welcome to Go-Algos!</h1>
            <div className="algos">
                    <button name="job-scheduling" onClick={naviTo}>Job Scheduling</button>
                    <button name="kruskals" onClick={naviTo}>Kruskals</button>
                    <button name="lcs" onClick={naviTo}>Lcs</button>
            </div>
            
            </motion.div>
        </>
        
    );
}

export default Home;