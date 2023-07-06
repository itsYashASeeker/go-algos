import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";
import Kruskal1 from "../img/kruskals/1.png";
import Kruskal2 from "../img/kruskals/2.png";
import Kruskal3 from "../img/kruskals/3.png";
import Kruskal4 from "../img/kruskals/4.png";
import Kruskal5 from "../img/kruskals/5.png";
import Kruskal6 from "../img/kruskals/6.png";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";

export default function TKruskals() {
    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink + "/simulator");
    };

    const { cuE, algoT } = AppState();

    const [currE, setCE] = cuE;

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg fullbgHOME dcontainer ">
                <section className="sectionsT mUpL">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">Kruskal's Algorithm</b> is the Algorithm which uses the <b>Greedy Approach</b> to find the <b>Minimum Spanning Tree</b> by <b>traversing</b> through every <b>edge</b>.
                        </p>
                        <button className="goToSim mUpL" onClick={() => { naviTo(expR[currE[0]][currE[1]][1]) }}>Go to Simulator</button>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Algorithm for Kruskal's Algorithm</b>
                            <ul className=" algorithm intro f1-3 mUpM">
                                <li>
                                    <b>Step 1. </b>Sort the edges in increasing order
                                </li>
                                <li className="mUpS">
                                    <b>Step 2. </b>Repeat steps 3 to 4 until all edges are traversed
                                </li>
                                <li className="mUpS">
                                    <b>Step 3. </b>if(loop is not formed by the current edge in spanning tree) then do Step 4:
                                </li>
                                <li className="mUpS">
                                    <b>Step 4. </b>Include the edge
                                </li>
                            </ul>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Example</b>
                            <div className="mUpL mLeS">
                                <b className="f1-3">
                                    Let's say we have this Graph:
                                </b>
                                <div className="divf">
                                    <img src={Kruskal1} className="im1" />
                                </div>
                                <ul className="mUpM f1-3">
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 1: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p>Sort all the edges</p>
                                            <p className="mUpS">Sorted edges: [4, 5, 6, 10, 15]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 2: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Edge 4 is selected</b>
                                            <div className="divf">
                                                <img src={Kruskal2} className="im1 kim1" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 3: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Edge 5 is selected</b>
                                            <div className="divf">
                                                <img src={Kruskal3} className="im1 kim1" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 4: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Edge 6 is not selected, since it creates loop</b>
                                            <div className="divf">
                                                <img src={Kruskal4} className="im1 kim1" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 5: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Edge 10 is selected</b>
                                            <div className="divf">
                                                <img src={Kruskal5} className="im1 kim1" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 7: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Edge 15 is not selected, since it creates loop</b>
                                            <div className="divf">
                                                <img src={Kruskal6} className="im1 kim1" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Advantages of Kruskal's Algorithm</b>
                            <ol className="mUpM f1-3 ols">
                                <li className="mUpM">
                                    Easy to implement, used to find the Minimum Spanning Tree.
                                </li>
                                <li className="mUpM">
                                    Kruskal’s algorithm maintains all the vertices in the graph in the optimal solution.
                                </li>
                            </ol>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Disadvantages of Kruskal's Algorithm</b>
                            <ol className="mUpM ols f1-3 ">
                                <li className="mUpM">
                                    It does not produce the same number of possible paths as the other algorithms.
                                </li>
                                <li className="mUpM">
                                    It requires a quadratic number of function evaluations.
                                </li>
                            </ol>
                        </div>
                        <div className="mUpL">
                            <b className="f1-5">Time Complexity: O(E * logE) or O(E * logV)</b>
                        </div>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    );
}
