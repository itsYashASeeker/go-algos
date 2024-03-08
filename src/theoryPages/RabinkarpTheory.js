import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { motion } from "framer-motion";
import Footer from "../components/Footer.js";
import rkp1 from "../img/rabinkarp/rkp1.jpeg"
import rkp2 from "../img/rabinkarp/rkp2.jpeg"
import rkp3 from "../img/rabinkarp/rkp3.jpeg"
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";

export default function RabinkarpTheory() {

    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink + "/simulator");
    }

    const { cuE, algoT } = AppState();

    const [currE, setCE] = cuE;

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg fullbgHOME dcontainer">
                <section className="sectionsT mUpL">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">String Maching Algorithms</b>have greatly influenced computer science and play an essential role in various real-world problems. It helps in performing time-efficient tasks in multiple domains. These algorithms are useful in the case of searching a string within another string.
                        </p>
                        <button className="goToSim mUpL" onClick={() => { naviTo(expR[currE[0]][currE[1]][1]) }}>Go to Simulator</button>
                        <p className="mUpM f1-5 hightText"><b>Algorithm for Rabinkarp</b></p>
                        <div className="algorithm mUpM">
                            <p>
                                Step 1. n ← length [T] <br></br>
                                Step 2. m ← length [P] <br></br>
                                Step 3. h ← d m-1 mod q <br></br>
                                Step 4. p ← 0 <br></br>
                                Step 5. t 0 ← 0 <br></br>
                                Step 6. for i ← 1 to m <br></br>
                                Step 7. do p ← (dp + P[i]) mod q <br></br>
                                Step 8. t 0 ← (dt 0 +T [i]) mod q <br></br>
                                Step 9. for s ← 0 to n-m <br></br>
                                Step 10. do if p = t s <br></br>
                                Step 11. then if P [1.....m] = T [s+1.....s + m] <br></br>
                                Step 12. then &quot;Pattern occurs with shift&quot; s <br />
                                Step 13. If s &lt; n-m<br />
                                Step 14. then t s+1 ← (d (t s -T [s+1]h)+T [s+m+1])mod q <br />

                            </p>
                        </div>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Theory</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <div className="mUpL"></div>

                                    <p className="mUpM">Comparing numbers is easier and cheaper than comparing strings. Rabin Karp
                                        algorithm represents strings in numbers.</p>
                                    <p className="mUpM">
                                        This algorithm calculates a hash value
                                        for the pattern, as well as for each M-character sub-sequences of text to be
                                        compared. If the hash values are unequal, the algorithm will determine the hash
                                        value for next M-character sequence. If the hash values are equal, the algorithm
                                        will analyze the pattern and the M-character sequence. </p>

                                    <div className="f1">
                                        <p className="mUpM">
                                            In this way, there is only
                                            one comparison per text subsequence, and character matching is only required
                                            when the hash values match. </p>
                                        {/* <img className="navImg" src={Fst2}></img> */}
                                        <p className="mUpM">rabinkarp/
                                            Means if the hash values match then only it starts
                                            matching individual characters.</p>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >

                                            <img className="navImg" style={{ width: "55vw" }} src={rkp1}></img>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >

                                            <img className="navImg" style={{ width: "55vw" }} src={rkp2}></img>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >

                                            <img className="navImg" style={{ width: "55vw" }} src={rkp3}></img>
                                        </div>

                                    </div>



                                </li>

                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Time Complexity</b>
                                    <p className="mUpM">The average and best-case running time of the Rabin-Karp algorithm is O(n+m),
                                        but its worst-case time is O(nm). The worst case of the Rabin-Karp algorithm
                                        occurs when all characters of pattern and text are the same as the hash values of
                                        all the substrings of txt match with the hash value of pattern. Also worst case can
                                        happen when prime number used for hashing is very small.</p>



                                </li>
                            </ol>

                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of Rabinkarp Algorithm</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                    For pattern matching
                                </li>
                                <li>
                                    For searching string in a bigger text

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