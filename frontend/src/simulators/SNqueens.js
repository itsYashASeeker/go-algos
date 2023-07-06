import React, { useEffect, useState } from "react";

import "../css/Nqueens.css";
import { delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import "../css/Home.css";
import "../css/Lcs.css";
import FNavbar from "../components/FNavbar.js"
import { AppState } from "../context/appContext";
import { AlgoPer } from "../funcs/AlgoP";
import { expR } from "../data/expRoutes";


function SNQueens() {
    const [sel, setSel] = useState("");
    const [stepC, setStepC] = useState(0);
    const [o, seto] = useState(0);
    const [simSp, setSimSp] = useState(300);
    const [startA, setStA] = useState(false);
    const [algoDone, setAlgD] = useState(99);
    const timer = ms => new Promise(res => setTimeout(res, ms));
    const navigate = useNavigate();

    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;

    let option = [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];


    let option1 = [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];

    let option2 = [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]];


    useEffect(() => {
        if (algoDone === 0) {
            AlgoPer({ algoName: expR[currE[0]][currE[1]][0] });
            setAlgD(false);
        }

    }, [algoDone]);


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
    }, [stepC]);



    function retElId(idname) {
        return document.getElementById(idname);
    }


    async function restart() {
        seto(0);
        setSel("");
        setStepC(0);
        retElId("sol1").innerHTML = "";
        retElId("sol2").innerHTML = "";
        // retElId("wordIn1").removeAttribute("readonly", "readonly");
        // retElId("wordIn2").removeAttribute("readonly", "readonly");
        retElId("chSpeedid").classList.remove("dNone");
        retElId("createLCS").removeAttribute("disabled", "disabled");
        retElId("btn4Q").removeAttribute("disabled", "disabled");
        retElId("btn8Q").removeAttribute("disabled", "disabled");
    }


    function disBut(e) {
        retElId(e.target.id).setAttribute("disabled", true);
    }

    async function remBgs(tarrs, selB, t) {
        if (!selB) {
            for (var i = 0; i < tarrs.length; i++) {
                retElId(`Ci${tarrs[i][0]}j${tarrs[i][1]}`).classList.remove("bgGreen");
                retElId(`Ci${tarrs[i][0]}j${tarrs[i][1]}`).classList.add("bgRed");
            }
            await timer(t);
        }

        for (var i = 0; i < tarrs.length; i++) {
            retElId(`Ci${tarrs[i][0]}j${tarrs[i][1]}`).classList.remove("bgGreen", "bgRed");
        }
    }

    async function checkQueensPositions(option, row, col, n, t) {
        retElId(`i${row}j${col}`).innerHTML = "♛";
        for (let i = 0; i < col; i++) {
            if (option[row][i] === 1) {
                if (i > 0) {
                    retElId(`Ci${row}j${i}`).classList.add("bgRed");
                    retElId(`Ci${row}j${col}`).classList.add("bgRed");
                    await timer(t);
                    retElId(`i${row}j${col}`).innerHTML = "";
                    retElId(`Ci${row}j${i}`).classList.remove("bgRed");
                    retElId(`Ci${row}j${col}`).classList.remove("bgRed");
                }
                return false;
            }
        }

        var tarr = [];
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {

            if (option[i][j] === 1) {
                tarr.push([i, j]);
                await timer(t / 2);
                await remBgs(tarr, false, t);
                return false;
            }
            else {

                retElId(`Ci${i}j${j}`).classList.add("bgGreen");
                tarr.push([i, j]);
                await timer(t / 2);
            }

        }
        for (let i = row, j = col; j >= 0 && i < n; i++, j--) {

            if (option[i][j] === 1) {
                tarr.push([i, j]);
                await timer(t / 2);
                await remBgs(tarr, false, t);
                return false;
            }
            else {
                retElId(`Ci${i}j${j}`).classList.add("bgGreen");
                tarr.push([i, j]);
                await timer(t / 2);
            }
        }
        await timer(t / 2);
        await remBgs(tarr, true, t);
        return true
    }

    function showCurrStat(col, n) {
        for (var i = 0; i < n; i++) {
            if (i <= col) {
                retElId(`iL${Number(i + 1)}`).classList.add("NqDone");
                retElId(`iL${Number(i + 1)}`).classList.remove("NgCurr");
                if (i === col) {
                    retElId(`iL${Number(i + 1)}`).classList.add("NgCurr");
                    // break;
                }
            }
            else {
                retElId(`iL${Number(i + 1)}`).classList.remove("NqDone", "NgCurr");
            }
        }
    }

    async function nQueenssolve(option, col, n, t) {


        if (col >= n)
            return true
        // await delay(5000);
        retElId("sol1").innerHTML = "Current Counter: " + Number(col + 1);

        for (let i = 0; i < n; i++) {
            // await timer(t);
            let resQ = await checkQueensPositions(option, i, col, n, t);
            showCurrStat(Number(col), n);
            if (resQ === true) {
                await timer(t);
                option[i][col] = 1;
                retElId("sol2").classList.remove("dangerC");
                retElId("sol2").classList.add("successC");
                retElId("sol2").innerHTML = "Queen" + Number(col + 1) + " is placed on " + "(" + Number(i + 1) + ", " + Number(col + 1) + ")"
                retElId(`i${i}j${col}`).innerHTML = "♛";
                retElId(`Ci${i}j${col}`).classList.add("bgGreen");
                await timer(t);
                retElId(`Ci${i}j${col}`).classList.remove("bgGreen");
                if (await nQueenssolve(option, col + 1, n, t) == true) {
                    retElId("sol1").innerHTML = "";
                    retElId("sol2").innerHTML = "Solution found!";
                    retElId(`iL${Number(col + 1)}`).classList.remove("NgCurr");
                    retElId(`Ci${i}j${col}`).classList.add("bgGreen");
                    setStepC(2);
                    // console.log(col);
                    setAlgD(col);
                    return true;
                }
                option[i][col] = 0;
                retElId(`i${i}j${col}`).innerHTML = null;
            }
            else {
                await timer(t);
                retElId("sol2").classList.remove("successC");
                retElId("sol2").classList.add("dangerC");
                retElId("sol2").innerHTML = `Queen goes forward to (${Number(i + 1)}, ${Number(col + 1)})`;
                // await timer(100);
            }
            retElId(`i${i}j${col}`).innerHTML = null;


        }
        retElId("sol2").classList.remove("successC");
        retElId("sol2").classList.add("dangerC");
        retElId("sol2").innerHTML = `Backtracking happens`;
        return false
    }

    async function checknqueens(n, option) {
        // console.log(simSp);
        if (await nQueenssolve(option, 0, n, simSp) === false) {

            return false
        }


    }

    function queen() {
        if (sel === "4Queens") {
            checknqueens(4, option1);
        }
        else if (sel === "8Queens") {
            checknqueens(8, option2);

        }
    }


    function showQ(n) {
        retElId("btn4Q").setAttribute("disabled", "disabled");
        retElId("btn8Q").setAttribute("disabled", "disabled");
        setSel(n + "Queens");
        setStepC(1);
    }


    return (

        <>
            <Navbar />
            <FNavbar />
            <motion.div className="fullbg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div className="left-side nqLS">
                    <motion.div className="simulation simPT">
                        <div id="algoStatus" className="algStat">
                            <div id="idStatCont" className="statContent">
                                <p id="sol1" style={{ fontWeight: 600 }}></p>
                                <p id="sol2"></p>
                            </div>
                        </div>
                        <div className="nqD">
                            {sel === "4Queens" ?
                                <div id="cellContainer4" className="nqT">
                                    <div id="iL1" className="cell noCell" cellindex="l1">1</div>
                                    <div id="iL2" className="cell noCell" cellindex="l2">2</div>
                                    <div id="iL3" className="cell noCell" cellindex="l3">3</div>
                                    <div id="iL4" className="cell noCell" cellindex="l4">4</div>

                                    {option1[0].map((el, index) => {

                                        var addI = index * 4;
                                        return (
                                            <>
                                                <div id={"Ci" + index + "j0"} className="cell" cellindex={Number(addI + 0)}><h3 id={"i" + index + "j0"}></h3></div>
                                                <div id={"Ci" + index + "j1"} className="cell" cellindex={Number(addI + 1)}><h3 id={"i" + index + "j1"}></h3></div>
                                                <div id={"Ci" + index + "j2"} className="cell" cellindex={Number(addI + 2)}><h3 id={"i" + index + "j2"}></h3></div>
                                                <div id={"Ci" + index + "j3"} className="cell" cellindex={Number(addI + 3)}><h3 id={"i" + index + "j3"}></h3></div>
                                            </>
                                        )
                                    })}


                                </div>
                                : <></>}


                            {sel === "8Queens" ?
                                <div id="cellContainer8" className="nqT">
                                    <div id="iL1" className="cell noCell" cellindex="l1">1</div>
                                    <div id="iL2" className="cell noCell" cellindex="l2">2</div>
                                    <div id="iL3" className="cell noCell" cellindex="l3">3</div>
                                    <div id="iL4" className="cell noCell" cellindex="l4">4</div>
                                    <div id="iL5" className="cell noCell" cellindex="l5">5</div>
                                    <div id="iL6" className="cell noCell" cellindex="l6">6</div>
                                    <div id="iL7" className="cell noCell" cellindex="17">7</div>
                                    <div id="iL8" className="cell noCell" cellindex="l8">8</div>
                                    {option2[0].map((el, index) => {

                                        var addI = index * 8;
                                        return (
                                            <>
                                                <div id={"Ci" + index + "j0"} className="cell " cellindex={Number(addI + 0)}><h3 id={"i" + index + "j0"}></h3></div>
                                                <div id={"Ci" + index + "j1"} className="cell " cellindex={Number(addI + 1)}><h3 id={"i" + index + "j1"}></h3></div>
                                                <div id={"Ci" + index + "j2"} className="cell " cellindex={Number(addI + 2)}><h3 id={"i" + index + "j2"}></h3></div>
                                                <div id={"Ci" + index + "j3"} className="cell " cellindex={Number(addI + 3)}><h3 id={"i" + index + "j3"}></h3></div>
                                                <div id={"Ci" + index + "j4"} className="cell " cellindex={Number(addI + 4)}><h3 id={"i" + index + "j4"}></h3></div>
                                                <div id={"Ci" + index + "j5"} className="cell " cellindex={Number(addI + 5)}><h3 id={"i" + index + "j5"}></h3></div>
                                                <div id={"Ci" + index + "j6"} className="cell " cellindex={Number(addI + 6)}><h3 id={"i" + index + "j6"}></h3></div>
                                                <div id={"Ci" + index + "j7"} className="cell" cellindex={Number(addI + 7)}><h3 id={"i" + index + "j7"}></h3></div>
                                            </>
                                        )
                                    })}


                                </div>


                                : <></>
                            }
                        </div>
                    </motion.div>
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
                                <p className="enHead">Select the no. of Queens</p>
                                <div className="btn">

                                    <button id="btn4Q" className="spec" style={{ border: "none", marginRight: '1em' }} onClick={(e) => { showQ(4) }}>4Queens</button>
                                    <button id="btn8Q" className="spec" onClick={(e) => { showQ(8) }}>8Queens</button>

                                </div>

                            </div>
                            <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />

                        </motion.div>
                        {stepC >= 1 ?
                            <motion.div id="1STDN" className="stepCard"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}

                            >
                                <p id="step1" className="stepH">Step1: </p>
                                <div className="content">
                                    <p>The N Queen is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other.</p>
                                    <p>Mainly Nqueens Problem is Shown using <i>4x4 </i> and <i>8x8 </i> chessboard</p>
                                    <div id="chSpeedid">
                                        <p className="f1-2"><b>Choose speed:</b></p>
                                        <input className="rangeI" type="range" id="simSpeed" name="speedS" min="100" max="400" onChange={(e) => { setSimSp(400 - Number(e.target.value)) }}></input>
                                    </div>

                                    <p><b className="f1-5">Start</b> <button id="createLCS" className={"spec"} onClick={(e) => { retElId("chSpeedid").classList.add("dNone"); disBut(e); queen(); }}>N-Queens</button></p>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />


                            </motion.div> : <></>
                        }
                        {stepC >= 2 ?
                            <button id="CheckFirstIndex" className="spec restartb" onClick={(e) => { restart() }}>Restart</button>
                            : <></>
                        }
                    </motion.div>
                </motion.div>

            </motion.div>
        </>



    );
}

export default SNQueens;
