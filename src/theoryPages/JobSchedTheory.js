import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { motion } from "framer-motion";
import Footer from "../components/Footer.js";
import jss1 from "../img/Jobschedimg/jss1.jpeg"
import jss2 from "../img/Jobschedimg/jss2.jpeg"
import jss3 from "../img/Jobschedimg/jss3.jpeg"
import jss4 from "../img/Jobschedimg/jss4.jpeg"
import jss5 from "../img/Jobschedimg/jss5.jpeg"
import jss6 from "../img/Jobschedimg/jss6.jpeg"
import jss7 from "../img/Jobschedimg/jss7.jpeg"
import jss8 from "../img/Jobschedimg/jss8.jpeg"
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";


export default function JobSchedTheory() {

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
                            <b className="hightText1">Job scheduling</b> is the problem of scheduling jobs out of a set of N jobs on a single processor which maximizes profit as much as possible.
                        </p>
                        <button className="goToSim mUpL" onClick={() => { naviTo(expR[currE[0]][currE[1]][1]) }}>Go to Simulator</button>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Algorithm for Job Scheduling</b>
                            <ul className=" algorithm intro f1-3 mUpM">
                                <li>
                                    <b>Step 1. </b>Sort the jobs based on decreasing order of profits
                                </li>
                                <li className="mUpS">
                                    <b>Step 2. </b>Create a Gantt chart of Size: minimum(no. of jobs, maximum deadline)
                                </li>
                                <li className="mUpS">
                                    <b>Step 3. </b>Repeat Step 4 to 7 for every Job:
                                </li>
                                <li className="mUpS">
                                    <b>Step 4. </b>Copy, j {"<-"} current Deadline
                                </li>
                                <li className="mUpS">
                                    <b>Step 5. </b>Repeat Step 6 until j{">="}0 AND (gantt[deadline] is occupied):
                                </li>
                                <li className="mUpS">
                                    <b>Step 6. </b>j--
                                </li>
                                <li className="mUpS">
                                    <b>Step 7. </b>if(gantt[deadline] is empty):
                                </li>
                                <li className="mUpS">
                                    <b>Step 7. </b>gantt[deadline] {"<-"} current Job
                                </li>
                            </ul>
                        </div>

                        <p className="f1-5 mUpL">
                            <b className="hightText">Theory</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <div className="mUpL"></div>

                                    <p className="mUpM">The greedy approach of the job scheduling algorithm states that, “Given ‘n’ number of jobs with a starting time and ending time, they need to be scheduled in such a way that maximum profit is received within the maximum deadline”.</p>
                                    <p className="mUpM">
                                        Set of jobs with deadlines and profits are taken as an input with the job scheduling algorithm and scheduled subset of jobs with maximum profit are obtained as the final output. </p>

                                    <div className="f1">
                                        <p className="mUpM" style={{ marginLeft: "2rem" }}>
                                            <ul>
                                                &nbsp;<li>Find the maximum deadline value from the input set of jobs.</li>
                                                &nbsp;<li>Once, the deadline is decided, arrange the jobs in descending order of their profits.</li>
                                                &nbsp;<li>Selects the jobs with highest profits, their time periods not exceeding the maximum deadline.</li>
                                                &nbsp;<li>The selected set of jobs are the output.</li>
                                            </ul></p>


                                        <p className="mUpM">Examples</p>
                                        <p className="mUpM">Given the jobs, their deadlines and associated profits as shown-</p>


                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss1}></img>
                                        </div>
                                        <p className="mUpM">Step 1</p>
                                        <p className="mUpM">Sort all the given jobs in decreasing order of their profit-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss2}></img>
                                        </div>
                                        <p className="mUpM">Step 2</p>
                                        <p className="mUpM">Value of maximum deadline = 5.<br />
                                            So, draw a Gantt chart with maximum time on Gantt chart = 5 units as shown-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss3}></img>
                                        </div>
                                        <p className="mUpM">Now,<br />
                                            take each job one by one in the order they appear in Step-01.<br />
                                            We place the job on Gantt chart as far as possible from 0.</p>

                                        <p className="mUpM">Step-03:<br />
                                            We take job J4.<br />
                                            Since its deadline is 2, so we place it in the first empty cell before deadline 2 as-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss4}></img>
                                        </div>

                                        <p className="mUpM">Step-04:<br />
                                            take job J1.<br />
                                            Since its deadline is 5, so we place it in the first empty cell before deadline 5 as-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss5}></img>
                                        </div>

                                        <p className="mUpM">Step-05:<br />
                                            take job J3.<br />
                                            Since its deadline is 3, so we place it in the first empty cell before deadline 3 as-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss6}></img>
                                        </div>

                                        <p className="mUpM">Step-06:<br />
                                            Now, we take job J5.<br />
                                            Since its deadline is 4, so we place it in the first empty cell before deadline 4 as-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss7}></img>
                                        </div>

                                        <p className="mUpM">Step-07:<br />
                                            take job J2.<br />
                                            Since its deadline is 3, so we place it in the first empty cell before deadline 3.<br />
                                            Since the second and third cells are already filled, so we place job J2 in the first cell as-</p>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5em" }} >
                                            <img className="navImg" style={{ width: "35vw" }} src={jss8}></img>
                                        </div>

                                        <p className="mUpM">Now,<br />
                                            The only job left is job J6 whose deadline is 2. All the slots before deadline 2 are already
                                            occupied. Thus, job J6 can not be completed.<br />
                                            Maximum earned profit<br />
                                            = Sum of profit of all the jobs in optimal schedule<br />
                                            = Profit of job J2 + Profit of job J4 + Profit of job J3 + Profit of job J5 + Profit of job J1<br />
                                            = 180 + 300 + 190 + 120 + 200<br />
                                            = 990 units
                                        </p>


                                    </div>



                                </li>


                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Time Complexity</b>
                                    <p className="mUpM">The time complexity for the job scheduling algorithm is O(n 2 ) in the worst case when we willlook for all the slots in the Gantt chart for a given job id.</p>



                                </li>
                            </ol>

                        </p>
                        {/* <b className="f1-5 mUpL">Time Complexity: O(N<sup>2</sup>)</b>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of Dynamic Programming</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                For pattern matching
                                </li>
                                <li>
                                For searching string in a bigger text

                                </li>
                               
                            </ul>
                        </p> */}
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    );
}
