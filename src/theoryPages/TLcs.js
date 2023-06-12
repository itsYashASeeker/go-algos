import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";

export default function TLcs() {

    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink);
    }

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg fullbgHOME dcontainer">
                <section className="sectionsT mUpL">
                    {/* <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        id="title" className="title1">Dynamic Programming</motion.p> */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">Dynamic Programming</b> is defined as a computer programming technique where an algorithmic problem is first broken down into sub-problems, the results are saved, and then the sub-problems are <b>optimized to find the overall solution</b>.
                        </p>
                        <p className="f1-3 mUpL">
                            <b>Links to:</b>
                            <button name="lcs" className="sButton " onClick={() => { naviTo("lcs") }}>LCS<span></span></button>
                            <button name="knapsack" className="sButton " onClick={() => { naviTo("knapsack") }}>Knapsack<span></span></button>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Where should dynamic programming be used?</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    Dynamic programming is used when one can break a problem into more minor issues that they can break down even further, into even more minor problems
                                </li>
                            </ol>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Dynamic programming can be achieved using two approaches:</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <div className="mUpL"></div>
                                    <b>Top-down approach</b>
                                    <p className="mUpM">The top-down approach follows the strategy of memorization. The memoization process is equivalent to adding the recursion and caching steps. The difference between recursion and caching is that recursion requires calling the function directly, whereas caching requires preserving the intermediate results.</p>
                                    <div className="mUpM">
                                        <b>Benefits:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                The top-down approach is easy to understand and implement.
                                            </li>
                                            <li>
                                                It allows for subproblems to be solved upon request.
                                            </li>
                                            <li>
                                                It is also easier to debug.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mUpM">
                                        <b>Disadvantages:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                The top-down approach uses the recursion technique, which occupies more memory in the call stack. This leads to reduced overall performance. Additionally, when the recursion is too deep, a stack overflow occurs.
                                            </li>
                                        </ul>
                                    </div>

                                </li>
                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Bottom-up approach</b>
                                    <p className="mUpM">
                                        In the bottom-up method, once a solution to a problem is written in terms of its subproblems in a way that loops back on itself, users can rewrite the problem by solving the smaller subproblems first and then using their solutions to solve the larger subproblems.
                                    </p>
                                    <div className="mUpM">
                                        <b>Advantages:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                It makes decisions about small reusable subproblems and then decides how they will be put together to create a large problem.
                                            </li>
                                            <li>
                                                It removes recursion, thus promoting the efficient use of memory space. Additionally, this also leads to a reduction in timing complexity.
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ol>

                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of Dynamic Programming</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                    Graph theory
                                </li>
                                <li>
                                    Game theory
                                </li>
                                <li>
                                    AI and machine learning
                                </li>
                                <li>
                                    Bioinformatics
                                </li>
                                <li>
                                    Calculation of the shortest path, which is used in GPS.
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