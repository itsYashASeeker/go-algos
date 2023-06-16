import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";
import IDijkstraG from "../img/dijkstra/graph.png";
import IDijkstra1 from "../img/dijkstra/1.png";
import IDijkstra2 from "../img/dijkstra/2.png";
import IDijkstra3 from "../img/dijkstra/3.png";
import IDijkstra4 from "../img/dijkstra/4.png";
import IDijkstra5 from "../img/dijkstra/5.png";
import IDijkstra6 from "../img/dijkstra/6.png";

export default function TDijkstra() {
    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink + "/simulator");
    };

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
                            <b className="hightText1">Dijkstra's Algorithm</b> is the Algorithm which uses the <b>Greedy Approach</b> to find the <b>shortest path</b> from <b>source</b> to every <b>vertice in graph</b>.
                        </p>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Algorithm for Dijkstra's Algorithm</b>
                            <ul className=" algorithm intro f1-3 mUpM">
                                <li>
                                    <b>Step 1. </b>Mark the source node with a current distance of 0 and the rest with infinity.
                                </li>
                                <li className="mUpS">
                                    <b>Step 2. </b>Set the non-visited node with the smallest current distance as the current node, lets say C.
                                </li>
                                <li className="mUpS">
                                    <b>Step 3. </b>For each neighbour N of the current node C: add the current distance of C with the weight of the edge connecting C-N. If it is smaller than the current distance of N, set it as the new current distance of N.
                                </li>
                                <li className="mUpS">
                                    <b>Step 4. </b>Mark the current node C as visited.
                                </li>
                                <li className="mUpS">
                                    <b>Step 5. </b>Go to step 2 if there are any nodes are unvisited.
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
                                    <img src={IDijkstraG} className="im2 kim1" />
                                </div>
                                <ul className="mUpM f1-3">
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 1: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p>We take A as source, so its distance is assigned 0</p>
                                            <div className="divf">
                                                <img src={IDijkstra1} className="im2 kim1" />

                                            </div>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 2: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p>Keeping the Source as A, we traverse to B</p>
                                            <div className="divf">
                                                <img src={IDijkstra2} className="im2 kim1" />

                                            </div>
                                            <p className="mUpS hightText">Relaxation formula is applied, </p>
                                            <p className="mUpS hightText">d[v] {">"} d[u] + cost[u,v]</p>
                                            <p className="mUpS hightText3">Do, d[v] {"="} d[u] + cost[u,v]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 3: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Similarly, we traverse to H</b>
                                            <div className="divf">
                                                <img src={IDijkstra3} className="im2 kim1" />

                                            </div>
                                            <p className="mUpS hightText">Relaxation formula is applied, </p>
                                            <p className="mUpS hightText">d[v] {">"} d[u] + cost[u,v]</p>
                                            <p className="mUpS hightText3">Do, d[v] {"="} d[u] + cost[u,v]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 4: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Traverse from B to H</b>
                                            <div className="divf">
                                                <img src={IDijkstra4} className="im2 kim1" />
                                            </div>
                                            <p className="mUpS hightText">Relaxation formula is not satsified, </p>
                                            <p className="mUpS hightText">d[v] {">"} d[u] + cost[u,v]</p>

                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 5: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b>Similarly, we travel throgh every node, and find the shortest distance from Source A</b>
                                            <div className="divf">
                                                <img src={IDijkstra6} className="im2 kim1" />
                                            </div>
                                            <div className="note mUpM">
                                                <p><b>Note: </b>The nodes whose distance is non infinity, are sorted and traversing happens from shortest nodes only once.</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Application of Dijkstra's Algorithm</b>
                            <ol className="mUpM f1-3 ols">
                                <li className="mUpM">
                                    To find the shortest path in a network from some source point
                                </li>
                                <li className="mUpM">
                                    In Social Networking Application
                                </li>
                                <li className="mUpM">
                                    To find Locations in a Map
                                </li>
                            </ol>
                        </div>
                        <div className="mUpL">
                            <b className="f1-5 hightText">Time Complexity: O(E LogV)</b>
                        </div>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    );
}
