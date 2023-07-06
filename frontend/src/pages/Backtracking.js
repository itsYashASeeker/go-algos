import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import backImg from "../img/backtracking.webp";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Backtracking() {
    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink);
    }

    return (
        <>
            <Navbar />
            <div className="fullbg fullbgHOME dcontainer">
                <section className="sectionsT">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        id="title" className="title1">Backtracking</motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">Backtracking</b>is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point in time (by time, here, is referred to the time elapsed till reaching any level of the search tree).
                        </p>
                        <p className="f1-3 mUpL">
                            <b>Links to:</b>
                            <button name="insertion" className="sButton " onClick={() => { naviTo("nqueens") }}>N-Queens<span></span></button>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">There are three types of problems in backtracking:</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <b>Decision Problem:</b> In this, we search for a feasible solution.
                                </li>
                                <li>
                                    <b>Optimization Problem:</b> In this, we search for the best solution.
                                </li>
                                <li>
                                    <b>Enumeration Problem:</b> In this, we find all feasible solutions.
                                </li>
                            </ol>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">How to determine if a problem can be solved using Backtracking?</b>
                            <p className="mLeS mUpS f1-3">
                                Generally, every constraint satisfaction problem which has clear and well-defined constraints on any objective solution, that incrementally builds candidate to the solution and abandons a candidate (“backtracks”) as soon as it determines that the candidate cannot possibly be completed to a valid solution, can be solved by Backtracking.
                            </p>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Example</b>
                            <p className="mLeS mUpS f1-3">
                                Consider a situation that you have three boxes in front of you and only one of them has a gold coin in it but you do not know which one.
                            </p>
                            <p className="mLeS  f1-3">
                                So, in order to get the coin, you will have to open all of the boxes one by one.
                            </p>
                            <p className="mLeS  f1-3">
                                You will first check the first box, if it does not contain the coin, you will have to close it and check the second box and so on until you find the coin.
                            </p>
                            <p className="mLeS  f1-3">
                                This is what backtracking is, that is solving all sub-problems one by one in order to reach the best possible solution. 
                            </p>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">State Space Tree</b>
                            <p className="mLeS mUpS f1-3">
                                A space state tree is a tree representing all the possible states (solution or nonsolution) of the problem from the root as an initial state to the leaf as a terminal state.
                            </p>
                        </p>
                        <div className="divf mUpM">
                            <img src={backImg} className="im2" />
                        </div>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of Backtracking Algorithm</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                    To find all Hamiltonian Paths present in a graph.
                                </li>
                                <li>
                                    To solve the N Queen problem.
                                </li>
                                <li>
                                    Maze solving problem.
                                </li>
                                <li>
                                    The Knight's tour problem.
                                </li>
                            </ul>
                        </p>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    )
}