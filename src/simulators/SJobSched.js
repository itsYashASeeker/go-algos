import React, { useEffect, useState } from "react";
import jobSdata from "../data/jobsch";

import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import "../css/Lcs.css";
import "../css/Home.css";
import "../css/JobSched.css";
import FNavbar from "../components/FNavbar";
import Footer from "../components/Footer";
import { AppState } from "../context/appContext";
import { AlgoPer } from "../funcs/AlgoP";
import { expR } from "../data/expRoutes";
function SJobSched() {

    const [stepC, setStepC] = useState(0);
    const [procs, setProcs] = useState([]);
    const [allDeads, setAllDeads] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [currNo, setCurrNo] = useState(1);
    const [slotG, setSlotG] = useState([]);
    const [newProf, setNewProf] = useState();
    const [newDead, setNewDead] = useState();
    const [totalProfit, setTotalProfit] = useState(0);
    const [startSolv, setStSol] = useState(false);

    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;

    const timer = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        setProcs(procs);
        // setNewProcs(newProcs);
    }, [procs]);

    async function wait() {
        retElId("idAllSteps").lastChild.scrollIntoView({ behavior: "smooth" });
        await timer(200);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        for (var i = 1; i < stepC; i++) {
            if (retElId(`${i}STDN`) != null) {
                retElId(`${i}STDN`).classList.add("algoDone");
                retElId(`${i}STDN`).classList.remove("goanime");
            }
        }
        if (retElId(`${stepC - 1}STDN`) != null) {

            retElId(`${stepC - 1}STDN`).classList.remove("goanime");
            retElId(`${stepC - 1}STDN`).classList.add("algoDone");
        }
        if (retElId(`${stepC}STDN`) != null) {
            retElId(`${stepC}STDN`).classList.add("goanime");
            retElId(`${stepC}STDN`).classList.remove("algoDone");
        }

        retElId("idAllSteps").lastChild.scrollIntoView({ behavior: "smooth" });
        // wait();

    }, [stepC]);



    function retElId(idname) {
        return document.getElementById(idname);
    }

    function checkIfInt() {
        const regex = /[^0-9]/;
        if (newProf.search(regex) === -1 && newDead.search(regex) === -1) {
            addNewProc();
            setNewProf("");
            setNewDead("");
        }
        else {
            setNewProf("");
            setNewDead("");
            window.alert("Please enter only Integer");
        }
    }

    function addNewProc() {
        const data = {
            "no": Number(currNo),
            "profit": Number(newProf),
            "deadline": Number(newDead)
        }
        var dProc = procs;
        dProc.push(data);
        setProcs(dProc);
        setCurrNo(currNo + 1);
    }

    function refreshSlotDead() {
        // ----For deadline
        var maxDD = procs[0].deadline;
        for (var i = 0; i < procs.length; i++) {
            if (procs[i].deadline > maxDD) {
                maxDD = procs[i].deadline;
            }
        }
        var allDeads = [];
        if (procs.length < maxDD) {
            maxDD = procs.length;
        }
        for (var i = 1; i <= maxDD; i++) {
            allDeads.push(i);
        }
        setAllDeads(allDeads);
        // ----Deadline finish

        // ----For slots
        var slots = [];
        for (var i = 0; i < maxDD; i++) {
            slots.push(0);
        }
        setSlotG(slots);
        // ----Slot finish
    }

    async function sortProfits() {
        refreshSlotDead();

        // Sorting starts
        var maxP = 0;
        var temp1;
        var ELproc = document.querySelectorAll("#allRP");
        var t1 = 300;
        var t2 = 200;
        var dProc = procs;

        for (var i = 0; i < dProc.length; i++) {
            await timer(t1);
            maxP = i;
            ELproc[i].classList.add("selectedBox");
            await timer(t1);
            for (var j = i + 1; j < dProc.length; j++) {
                ELproc[j].classList.add("goBox");
                if (dProc[maxP].profit < dProc[j].profit) {
                    maxP = j;
                    await timer(t2);
                    ELproc[j].classList.add("matchBox");
                }
                await timer(t1);
                ELproc[j].classList.remove("goBox", "matchBox");
            }
            await timer(t1);
            ELproc[i].classList.remove("selectedBox");
            ELproc[i].classList.add("matchBox");
            ELproc[maxP].classList.add("matchBox");
            await timer(t2);
            for (var k = 0; k < 2; k++) {
                temp1 = ELproc[i].childNodes[k].innerText;
                ELproc[i].childNodes[k].innerText = ELproc[maxP].childNodes[k].innerText;
                ELproc[maxP].childNodes[k].innerText = temp1;
            }
            temp1 = dProc[i];
            dProc[i] = dProc[maxP];
            dProc[maxP] = temp1;
            temp1 = ELproc[i].accessKey;
            ELproc[i].accessKey = ELproc[maxP].accessKey;
            ELproc[maxP].accessKey = temp1;
            await timer(t2);

            setProcs(dProc);
            ELproc[i].classList.remove("matchBox");
            ELproc[maxP].classList.remove("matchBox");

        }
        setStepC(2);
        setCurrNo(1);
    }

    async function startSched(eTid) {
        retElId(eTid).setAttribute("disabled", "disabled");
        retElId("procStat").innerHTML = "Sorted Profits: ";
        var n = procs.length;
        for (let e = 0; e < n; e++) {

            if (e != 0) {
                var comma = document.createElement("span");
                comma.innerHTML = ", ";
                retElId("procStat").appendChild(comma);
            }

            var indEdge = document.createElement("span");
            indEdge.innerHTML = "P" + procs[e].no;
            indEdge.id = "P" + e;
            retElId("procStat").appendChild(indEdge);
        }
        setStSol(true);
    }

    async function scheduleNext(eTId) {
        var slotArr = slotG;
        var isSelect = 0;
        var ELproc = document.querySelectorAll("#allRP");
        retElId(eTId).setAttribute("disabled", "disabled");
        if (currNo.length === 1) {
            retElId("sol2").classList.remove("dangerC");
            retElId("sol2").classList.add("successC");
            retElId("sol2").innerHTML = `Thus we obtain the result!`;
            retElId(`P${currNo - 1}`).classList.remove("selEShow");
            ELproc[currNo - 1].classList.remove("bgGreen");
            // console.log(procs.length);
            retElId("procStat").innerHTML = "";
            var sts = stepC + 1;
            setStepC(sts);
            setCurrNo(1);
            document.getElementById("schedNext").setAttribute("disabled", true);
            document.getElementById("nextJ").setAttribute("disabled", true);
            AlgoPer({ algoName: expR[currE[0]][currE[1]][0] });
            // retElId(eTId).removeAttribute("disabled", "disabled");
            return;
        }

        if (currNo > 1) {
            retElId(`P${currNo - 2}`).classList.remove("selEShow");
            ELproc[currNo - 2].classList.remove("bgGreen");
        }
        ELproc[currNo - 1].classList.add("bgGreen");
        retElId(`P${currNo - 1}`).classList.add("selEShow");
        for (var j = Math.min(procs.length, procs[currNo - 1].deadline) - 1; j >= 0; j--) {
            if (slotArr[j] == 0) {
                slotArr[j] = 1;
                setSlotG(slotArr);
                var jIndex = j + 1;
                retElId(jIndex + "Bx").classList.add("bgGreen");
                retElId(jIndex + "Bx").innerHTML = "P" + procs[currNo - 1].no;
                setTotalProfit(Number(totalProfit) + Number(procs[currNo - 1].profit));
                isSelect = 1;
                retElId("sol2").classList.remove("dangerC");
                retElId("sol2").classList.add("successC");
                if (j === Math.min(procs.length, procs[currNo - 1].deadline) - 1) {
                    retElId("sol2").innerHTML = `Process P${procs[currNo - 1].no} takes a Slot(${jIndex})`;
                }
                else {
                    retElId("sol2").innerHTML = `Process P${procs[currNo - 1].no} takes a Slot(${jIndex}), since Slot(${procs[currNo - 1].deadline}) was occupied`;
                }
                await timer(1000);
                retElId(jIndex + "Bx").classList.remove("bgGreen");
                break;
            }
        }
        if (isSelect == 0) {
            retElId("sol2").classList.remove("successC");
            retElId("sol2").innerHTML = `There is no place left for process P${procs[currNo - 1].no} :(`;
            retElId("sol2").classList.add("dangerC");
        }
        var isFull = 1;
        for (var i = 0; i < slotArr.length; i++) {
            if (slotArr[i] == 0) {
                isFull = 0;
                break;
            }
        }
        if (currNo===procs.length || isFull === 1) {
            retElId("nextJ").innerHTML = "Answer";
            setCurrNo([currNo]);
        }
        else {
            setCurrNo(currNo + 1);
        }
        retElId(eTId).removeAttribute("disabled", "disabled");
    }


    function restart() {
        setStepC(0);
        setProcs([]);
        setCurrNo(1);
        setTotalProfit(0);
        setSlotG([]);
        retElId("schedNext").removeAttribute("disabled", "disabled");
        retElId("sol2").classList.remove("successC");
        retElId("sol2").innerHTML = "";
        setStSol(false);
        document.getElementById("nextJ").removeAttribute("disabled", "disabled");
    }

    async function updateStep() {
        setStepC(stepC + 1);
    }

    function disBut(e) {
        document.getElementById(e.target.id).setAttribute("disabled", true);
    }

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="aboveSim"></div>
            <motion.div className="fullbg simbg" id="main">
                {/* {algoStarted ?
                    <button className="goBack" onClick={goBack}>Back</button>
                    : <></>
                } */}
                <motion.div className="left-side">
                    <motion.div
                        className="simulation simPT"
                        initial={{ x: 50 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div id="algoStatus" className="algStat">
                            <div id="idStatCont" className="statContent">
                                <p id="procStat" style={{ fontWeight: 600 }}></p>
                                <p id="sol2" className="f1-4"></p>
                            </div>
                            {startSolv ?
                                <>
                                    <button id="nextJ" className="spec" onClick={(e) => { scheduleNext(e.target.id) }}>Next</button>
                                </>
                                : <></>
                            }
                        </div>
                        <motion.div className="Table"
                            initial={{ x: -90 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div id="RowHead" className="row">
                                <div className="JSBox BTitle">Process</div>
                                <div className="JSBox BTitle">Profit</div>
                                <div className="JSBox BTitle">Deadline</div>
                            </div>
                            {procs && procs.map((proc) => {
                                return (
                                    <div id="allRP" accessKey={proc.no + "rP"} className="row">
                                        <div className="JSBox">{proc.no}</div>
                                        <div className="JSBox">{proc.profit}</div>
                                        <div className="JSBox">{proc.deadline}</div>
                                    </div>
                                )
                            }
                            )
                            }
                        </motion.div>
                        {stepC >= 2 ?
                            <motion.div className="ganttChart"
                                initial={{ opacity: 0.5, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="Boxes">
                                    {allDeads.map((inP) => {
                                        var uniqueKeys = inP + "Bx";
                                        return (inP === 1 ?
                                            (
                                                <div className="BoxContainer">
                                                    <div id={uniqueKeys} accessKey={uniqueKeys} className="Box"></div>
                                                    <div className="dBox zeroDBox" accessKey="0Dead">0</div>
                                                    <div className="dBox" accessKey={uniqueKeys}>{inP}</div>
                                                </div>
                                            )
                                            : <div className="BoxContainer">
                                                <div id={uniqueKeys} accessKey={uniqueKeys} className="Box"></div>
                                                <div className="dBox" accessKey={uniqueKeys}>{inP}</div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </motion.div> : <></>
                        }</motion.div>
                </motion.div>
                <motion.div className="right-side">
                    <motion.div id="idAllSteps" className="allSteps">
                        <motion.div className="stepCard" id="0STDN"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p id="step0" className="stepH">Step0: </p>
                            <div className="content">
                                <p>We Greedily choose the jobs with maximum profit first, by <button className={"cbutton"}>sorting</button> the jobs in decreasing order of their profit. This would help to maximize the total profit as choosing the job with maximum profit for every time slot will eventually maximize the total profit</p>
                                <p className="enHead">Enter jobs and their deadlines</p>
                                {stepC == 0 ?
                                    <>
                                        <input placeholder="Profit" value={newProf} onChange={(e) => { setNewProf(e.target.value) }}></input>
                                        <input placeholder="Deadline" value={newDead} onChange={(e) => { setNewDead(e.target.value) }}></input>
                                    </> : <></>
                                }

                                {(newProf && newDead) ?
                                    <button className="cbutton" style={{ "marginLeft": "1rem" }} onClick={checkIfInt}>Add</button> : <></>
                                }
                                {procs.length >= 3 ?
                                    <motion.button
                                        initial={{ scale: 0.5 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                        className={"spec"}
                                        id="goToStep1" style={{ "display": "block" }} onClick={(e) => { disBut(e); setStepC(1); }}>Next Step</motion.button> : <></>
                                }
                            </div>
                            <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
                        </motion.div>
                        {stepC >= 1 ?
                            <motion.div className="stepCard" id="1STDN"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p id="step1" className="stepH">Step1: </p>
                                <div className="content">
                                    <p>Sorting of processes happens based on their Profit</p>
                                    <p>Here, we have used Selection Sorting</p>
                                    <motion.button id="DoSorting" className="spec" onClick={(e) => { disBut(e); sortProfits() }}>Sort the Processes</motion.button>
                                </div>
                                <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                        {stepC >= 2 ?
                            <motion.div className="stepCard" id="2STDN"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p id="step2" className="stepH">Step2: </p>
                                <div className="content">
                                    <p>We Iterate on jobs in decreasing order of profit.For each job, we do the following :</p>
                                    <p>Find a time slot i, such that slot is empty and i {"<="} deadline and i is greatest.</p>
                                    <p>Put the job in this slot and mark this slot filled.</p>
                                    <p>If no such i exists, then ignore the job. </p>
                                    <button id="schedNext" className="spec" onClick={(e) => { startSched(e.target.id) }}>Schedule</button>
                                    
                                </div>
                                <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                        {stepC >= 3 ?
                            <motion.div className="stepCard" id="3STDN"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p id="step3" className="stepH">Step3: </p>
                                <div className="content">
                                    <p>Total profit is calculated by adding individual profits of each Processes selected in the algorithm</p>
                                    <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        onClick={updateStep}
                                        className="cbutton enHead pgreen">Total Profit: {totalProfit}</motion.button>
                                </div>
                                <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                        {stepC >= 4 ?
                            <button className="spec restartb" onClick={restart}>Restart</button> : <></>
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
            {/* <Footer /> */}
        </>

    );
}

export default SJobSched;