import React, { useEffect, useState } from "react";
import jobSdata from "../data/jobsch";
import "../css/JobSched.css";
import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function JobSched() {

    const [procs, setProcs] = useState(jobSdata);
    const [testing, setTesting] = useState([{ "name": "Yash" }]);
    const [allDeads, setAllDeads] = useState();
    const [showChart, setShChart] = useState(0);
    const [currNo, setCurrNo] = useState(1);
    const [slotG, setSlotG] = useState([]);
    const [doneAlg, setDA] = useState(0);
    const [openEdit, setEdit] = useState(0);
    const [newProf, setNewProf] = useState();
    const [newDead, setNewDead] = useState();
    const [newProcs, setNewProcs] = useState();
    // const [isEdited, setIsEdited] = useState(0);

    useEffect(() => {
        setProcs(procs);
        setNewProcs(newProcs);
        setTesting([{ "name": "Yoo" }]);
    }, [procs, newProcs])

    const timer = ms => new Promise(res => setTimeout(res, ms));

    function addNewProc() {
        var currNum, nnewPro = [];
        if (!newProcs) {
            currNum = 1;
        }
        else {
            currNum = newProcs.length + 1;
            nnewPro = newProcs;
        }
        const data = {
            "no": currNum,
            "profit": newProf,
            "deadline": newDead
        }
        nnewPro.push(data);
        setNewProcs(nnewPro);
        setTesting([{ "name": "Yash" }]);
    }

    async function sortProfits(e) {

        // ----For deadline
        var maxDD = procs[0].deadline;
        for (var i = 0; i < procs.length; i++) {
            if (procs[i].deadline > maxDD) {
                maxDD = procs[i].deadline;
            }
        }
        var allDeads = [];
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

        // Sorting starts
        var maxP = 0;
        var temp1;
        var ELproc = document.querySelectorAll("#allRP");
        document.getElementById("sortButton").disabled = true;

        for (var i = 0; i < procs.length; i++) {
            await timer(800);
            maxP = i;
            ELproc[i].classList.add("selectedBox");
            await timer(800);
            for (var j = i + 1; j < procs.length; j++) {
                ELproc[j].classList.add("goBox");
                if (procs[maxP].profit < procs[j].profit) {
                    maxP = j;
                    await timer(500);
                    ELproc[j].classList.add("matchBox");
                }
                await timer(800);
                ELproc[j].classList.remove("goBox", "matchBox");
            }
            await timer(800);
            ELproc[i].classList.remove("selectedBox");
            ELproc[i].classList.add("matchBox");
            ELproc[maxP].classList.add("matchBox");

            temp1 = procs[i];
            procs[i] = procs[maxP];
            procs[maxP] = temp1;
            await timer(1000);

            setProcs(procs);
            setTesting([{ "name": "Yoo" }]);
            ELproc[i].classList.remove("matchBox");
            ELproc[maxP].classList.remove("matchBox");

        }


        // Sorting done, now show the gantt chart
        setShChart(1);

    }

    function scheduleNext() {
        var slotArr = slotG;
        var isSelect = 0;
        for (var j = Math.min(procs.length, procs[currNo - 1].deadline) - 1; j >= 0; j--) {
            if (slotArr[j] == 0) {
                slotArr[j] = 1;
                setSlotG(slotArr);
                var jIndex = j + 1;
                document.getElementById(jIndex + "Bx").innerHTML = "P" + procs[currNo - 1].no;
                isSelect = 1;
                break;
            }
        }
        if (isSelect == 0) {
            window.alert(`There is no place left for process P${procs[currNo - 1].no} :(`);
        }
        var isFull = 1;
        for (var i = 0; i < slotG.length; i++) {
            if (slotG[i] == 0) {
                isFull = 0;
                break;
            }
        }
        if (isFull == 1 || currNo === allDeads.length) {
            setDA(1);
        }
        setCurrNo(currNo + 1);
    }

    function saveChanges() {
        setProcs(newProcs);
        setEdit(0);
        setShChart(0);
        setAllDeads([]);
        setSlotG([]);
        setCurrNo(1);
        setDA(0);
    }

    const navigate = useNavigate();

    return (
        <>

            <motion.div className="fullbg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="navbar">
                    <button className="navHome" onClick={() => { navigate("/") }}>Home</button>
                    <h1 className="title">Job Scheduling</h1>
                    <button className="play" onClick={() => { setEdit(1) }}>New</button>
                </div>
                <motion.table className="procsTable"
                    initial={{ x: -90 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <tbody>
                        <tr>
                            <th>Process</th>
                            <th>Profit</th>
                            <th>Deadline</th>
                        </tr>
                        {procs && procs.map((proc) => {
                            return (
                                <tr id="allRP" accessKey={proc.no + "rP"} className="allRowP">
                                    <motion.td>{proc.no}</motion.td>
                                    <motion.td>{proc.profit}</motion.td>
                                    <motion.td>{proc.deadline}</motion.td>
                                </tr>
                            )
                        }
                        )
                        }

                    </tbody>
                </motion.table>
                <motion.div className="right-side"
                    initial={{ x: 90 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {(showChart == 0) ?
                        <>
                            <div className="theory-content">
                                <p>First, we sort the process on decreasing order of profits!</p>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={sortProfits}
                                    id="sortButton"
                                >Sort the Processes</motion.button>
                            </div>
                        </>
                        :
                        <motion.div className="ganttChart"
                            initial={{ opacity: 0.5, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="theory-content">

                                {(doneAlg == 0) ?
                                    <>
                                        <p>Now, we place the jobs based on their deadlines...</p>
                                        <motion.button onClick={scheduleNext}
                                            whileHover={{ scale: 1.1 }}
                                        >Next</motion.button>
                                    </>
                                    : <>
                                        <motion.p
                                            initial={{ x: 180 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >You did it, Congrats!</motion.p>
                                    </>
                                }

                            </div>
                            <div className="Boxes">
                                {allDeads.map((inP) => {
                                    var uniqueKeys = inP + "Bx";
                                    return <div id={uniqueKeys} accessKey={uniqueKeys} className="Box"></div>
                                })}
                            </div>
                            <div className="deadlinesBoxes">
                                <div className="dBox" key="0Dead">0</div>
                                {allDeads.map((inD) => {
                                    var uniqueKeys = inD + "Bx";
                                    return <div className="dBox" accessKey={uniqueKeys}>{inD}</div>
                                })}
                            </div>
                        </motion.div>
                    }
                </motion.div>
                {(openEdit === 1) ?
                    <motion.div className="mod"
                        initial={{ opacity: 0, x: 300, y: -150, scale: 0.5 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="cancel" onClick={() => { setEdit(0) }}>x</button>
                        <motion.div className="playIns">
                            <h1 className="title">Add the values:</h1>
                            <motion.div className="adds">
                                <input placeholder="Profit" onChange={(e) => { setNewProf(e.target.value) }}></input>
                                <input placeholder="Deadline" onChange={(e) => { setNewDead(e.target.value) }}></input>
                                <button onClick={addNewProc}>Add</button>
                            </motion.div>
                            <motion.div className="showArr">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Process</th>
                                            <th>Profit</th>
                                            <th>Deadline</th>
                                        </tr>
                                        {newProcs && newProcs.map((proc) => {
                                            var uniqueKeys = proc.no + "nRP";
                                            return (
                                                <tr id={uniqueKeys} key={uniqueKeys}>
                                                    <motion.td>{proc.no}</motion.td>
                                                    <motion.td>{proc.profit}</motion.td>
                                                    <motion.td>{proc.deadline}</motion.td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </motion.div>
                            <button className="save-changes"
                                onClick={saveChanges}
                            >Save</button>
                        </motion.div>
                    </motion.div>
                    :
                    <></>
                }
            </motion.div>

        </>

    );
}

export default JobSched;