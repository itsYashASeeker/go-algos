import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";
import iLcs1 from "../img/lcs/1.png";
import iLcs2 from "../img/lcs/2.png";
import iLcs3 from "../img/lcs/3.png";
import iLcs4 from "../img/lcs/4.png";
import iLcs5 from "../img/lcs/5.png";
import iLcsMatch from "../img/lcs/match.png";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";

export default function TLcs() {

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
                            <b className="hightText1">LCS</b> the Longest Common Subsequence that is common to all the given sequences, provided that the elements of subsequence need not be in consecutive positions.
                        </p>
                        <button className="goToSim mUpL" onClick={() => { naviTo(expR[currE[0]][currE[1]][1]) }}>Go to Simulator</button>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Algorithm for LCS</b>
                            <ol className=" algorithm f1-3 mUpM">
                                <li>
                                    <b>1. </b>Input two Sequence as <b>A</b> and <b>B</b>
                                </li>
                                <li className="mUpS">
                                    <b>2. </b>Create a 2D-matrix,<b>LCS[][]</b> of length A.length x B.length
                                </li>
                                <li className="mUpS">
                                    <b>3. </b>Make the first row and first column {"<-"} 0
                                </li>
                                <li className="mUpS">
                                    <b>4. </b>Repeat Step 5 to 8, from i=1,j=1 until all rows, and columns are traversed
                                </li>
                                <li className="mUpS">
                                    <b>5. </b>If(A[i]==B[j]) then do Step6:
                                </li>
                                <li className="mUpS">
                                    <b>6. </b>LCS[i][j] {"<-"} LCS[i-1][j-1]+1
                                </li>
                                <li className="mUpS">
                                    <b>7. </b>Else do Step8:
                                </li>
                                <li className="mUpS">
                                    <b>8. </b>LCS[i][j] {"<-"} max{"{"}LCS[i-1][j], LCS[i][j-1]{"}"}
                                </li>
                            </ol>
                        </div>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Where should dynamic programming be used?</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    Dynamic programming is used when one can break a problem into more minor issues that they can break down even further, into even more minor problems
                                </li>
                            </ol>
                        </p>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Example</b>
                            <div className="mUpL mLeS">
                                <p className="f1-3">
                                    Let's take two Strings: "AUTREQ" and "OUEM"
                                </p>
                                <ul className="mUpM f1-2">
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 1: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p><b>Create Matrix: </b></p>
                                            <img className="im1 mUpM kim1" src={iLcs1}></img>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 2: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p><b>Check for LCS[1][1]: </b></p>
                                            <img className="im1 mUpM kim1" src={iLcs2}></img>
                                            <p className="mUpS hightText">Letters don't match, so maximum(up,left) is selected</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 3: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p><b>Similarly, we do it for row1: </b></p>
                                            <img className="im1 mUpM kim1" src={iLcs3}></img>
                                            <p className="mUpS hightText">Letters don't match, so maximum(up,left) is selected</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 4: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p><b>In Row2, "U" matches</b></p>
                                            <img className="im1 mUpM kim1" src={iLcsMatch}></img>
                                            <p className="mUpS hightText">so LCS[i][j] {"<-"} LCS[i-1][j-1]+1</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 5: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p><b>Similarly, we do it for every index</b></p>
                                            <img className="im1 mUpM kim1" src={iLcs4}></img>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 6: </b>
                                        </div>
                                        <div className="mLeS">
                                            <p><b>We trace the matrix from last index</b></p>
                                            <img className="im1 mUpM kim1" src={iLcs5}></img>
                                            <p className="mUpS hightText">If, direction points diagonal, Letter is selected</p>
                                            <p className="mUpM"><b className="hightText3 f1-5">Thus, LCS: "UE"</b></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
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