import React, { useEffect, useState } from "react";

import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import "../css/Home.css";
import "../css/Lcs.css";
import FNavbar from "../components/FNavbar";
import { AppState } from "../context/appContext";
import { AlgoPer } from "../funcs/AlgoP";
import { expR } from "../data/expRoutes";

function SLcs() {
    const navigate = useNavigate();
    const [str1, setStr1] = useState();
    const [str2, setStr2] = useState();
    const [inStr1, setInStr1] = useState("");
    const [inStr2, setInStr2] = useState("");
    const [doneIns, setDoneIns] = useState(false);
    const [stepC, setStepC] = useState(0);
    const [currI, setCurrI] = useState([-1, -1, -1]);
    const [algoPart, setAlgoPart] = useState(0);
    const [finalSeq, setFinalSeq] = useState("");
    const [anDuration, setAnDuration] = useState(800);

    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;

    const timer = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        if (inStr1 && inStr2 && subLcsStrings(inStr1) && subLcsStrings(inStr2)) {
            if (stepC === 0) {
                setDoneIns(true);
            }
            else {
                setDoneIns(false);
            }
        }
        else {
            setDoneIns(false);
        }
    }, [inStr1, inStr2]);

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
        // window.scrollTo(0, 0);
    }, [stepC]);

    useEffect(() => {
        setCurrI(currI);
    }, [currI]);

    function retElId(idname) {
        return document.getElementById(idname);
    }

    function saveIns() {
        setDoneIns(false);
        setStepC(1);
        retElId("0STDN").classList.add("algoDone");
        retElId("0STDN").classList.remove("goanime");
        setStr1(inStr1.toUpperCase().split(""));
        setStr2(inStr2.toUpperCase().split(""));
        retElId("wordIn1").setAttribute("readonly", "readonly");
        retElId("wordIn2").setAttribute("readonly", "readonly");
    }

    function subLcsStrings(val) {
        const regex = /[^A-Za-z ]/;
        if (val.search(regex) === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    async function hightRow(rowNo) {
        for (var j = 1; j <= str1.length; j++) {
            if (retElId(`M${rowNo}${j}`)) {
                retElId(`M${rowNo}${j}`).classList.add("hight");
            }
        }
        await timer(anDuration);
        for (var j = 1; j <= str1.length; j++) {
            if (retElId(`M${rowNo}${j}`)) {
                retElId(`M${rowNo}${j}`).classList.remove("hight");
            }
        }
    }

    async function hightCol(colNo) {
        for (var i = 1; i <= str2.length; i++) {
            if (retElId(`M${i}${colNo}`)) {
                retElId(`M${i}${colNo}`).classList.add("hight");
            }
        }
        await timer(anDuration);
        for (var i = 1; i <= str2.length; i++) {
            if (retElId(`M${i}${colNo}`)) {
                retElId(`M${i}${colNo}`).classList.remove("hight");
            }
        }
    }

    async function hightBox(i, j) {
        if (retElId(`M${i}${j}`)) {
            retElId(`M${i}${j}`).classList.add("hight");
        }
        await timer(anDuration);
        if (retElId(`M${i}${j}`)) {
            retElId(`M${i}${j}`).classList.remove("hight");
        }
    }

    async function hightStr(i, j, res) {
        var glow = "hight";
        if (res == 0) {
            glow = "Fhight";
        }
        if (retElId(`S1M${j}`) && retElId(`S2M${i}`)) {
            retElId(`S1M${j}`).classList.add(glow);
            retElId(`S2M${i}`).classList.add(glow);
            await timer(anDuration);
            retElId(`S1M${j}`).classList.remove(glow);
            retElId(`S2M${i}`).classList.remove(glow);
        }
    }

    async function startAlgo(opt) {
        var li = str2.length + 1;
        var lj = str1.length + 1;
        var i = 1;
        var j = 1;
        var dC = currI;
        if (opt == 1) {
            li = 2;
            lj = 2;
        }
        if (currI[0] == 1 && currI[1] == 1) {
            if (lj >= 2) {
                j += 1;
            }
            else if (li >= 2) {
                i += 1;
            }
            else {
                setAlgoPart(1);
                i = li;
                j = lj;
            }
        }
        for (var x = i; x < li; x++) {
            for (var y = j; y < lj; y++) {

                const st2 = retElId(`S2M${x - 1}`).childNodes[0].innerText;
                const st1 = retElId(`S1M${y - 1}`).childNodes[0].innerText;

                if (st1 === st2) {
                    hightStr(x - 1, y - 1, 1);
                    await timer(anDuration);
                    dC = [x, y, 1];
                    setCurrI(dC);
                    retElId(`M${x}${y}`).childNodes[0].innerText = Number(retElId(`M${x - 1}${y - 1}`).childNodes[0].innerText) + 1;
                    retElId(`M${x}${y}`).childNodes[1].classList.remove("dNone", "upIcons", "diagonalIcons", "leftIcons");
                    retElId(`M${x}${y}`).childNodes[1].classList.add("diagonalIcons");
                }
                else {
                    hightStr(x - 1, y - 1, 0);
                    await timer(anDuration);
                    dC = [x, y, 0];
                    setCurrI(dC);
                    var left = Number(retElId(`M${x}${y - 1}`).childNodes[0].innerText);
                    var top = Number(retElId(`M${x - 1}${y}`).childNodes[0].innerText);
                    if (left > top) {
                        retElId(`M${x}${y}`).childNodes[0].innerText = left;
                        retElId(`M${x}${y}`).childNodes[1].classList.remove("dNone", "upIcons", "diagonalIcons", "leftIcons");
                        retElId(`M${x}${y}`).childNodes[1].classList.add("leftIcons");
                    }
                    else {
                        retElId(`M${x}${y}`).childNodes[0].innerText = top;
                        retElId(`M${x}${y}`).childNodes[1].classList.remove("dNone", "upIcons", "diagonalIcons", "leftIcons");
                        retElId(`M${x}${y}`).childNodes[1].classList.add("upIcons");
                    }
                }
                await timer(100);
            }
            j = 1;
        }
        await timer(1);

        if (dC[0] === str2.length && dC[1] === str1.length) {
            setAlgoPart(1);
            setStepC(3);
        }
    }

    async function restart() {
        setStr1("");
        setStr2("");
        setInStr1("");
        setInStr2("");
        setStepC(0);
        setCurrI([-1, -1, -1]);
        setAlgoPart(0);
        setFinalSeq("");
        retElId("wordIn1").removeAttribute("readonly", "readonly");
        retElId("wordIn2").removeAttribute("readonly", "readonly");
    }

    async function afterAlgo() {
        var go = 1;
        var gx = str2.length;
        var gy = str1.length;
        var seq = "";
        while (go == 1) {
            if (gx === 0 || gy === 0) {
                go = 0;
                break;
            }

            if (retElId(`M${gx}${gy}`).childNodes[1].classList.contains("diagonalIcons")) {
                hightBox(gx, gy);
                await timer(anDuration);
                retElId(`M${gx}${gy}`).classList.add("bStrs");
                seq += retElId(`S2M${gx - 1}`).childNodes[0].innerText;
                gx = gx - 1;
                gy = gy - 1;
            }
            else if (retElId(`M${gx}${gy}`).childNodes[1].classList.contains("leftIcons")) {
                hightBox(gx, gy);
                await timer(anDuration);
                retElId(`M${gx}${gy}`).classList.add("wStrs");

                gy = gy - 1;
            }
            else if (retElId(`M${gx}${gy}`).childNodes[1].classList.contains("upIcons")) {
                hightBox(gx, gy);
                await timer(anDuration);
                retElId(`M${gx}${gy}`).classList.add("wStrs");

                gx = gx - 1;
            }
            else {
                go = 0;
            }
        }
        var sequence = "";
        for (var i = seq.length - 1; i >= 0; i--) {
            sequence += seq[i];
        }
        setStepC(4);
        setAlgoPart(2);
        setFinalSeq(sequence);
        AlgoPer({ algoName: expR[currE[0]][currE[1]][0] });
    }

    function disBut(e) {
        document.getElementById(e.target.id).setAttribute("disabled", true);
    }



    function netCheck(val, eT) {
        if (subLcsStrings(val)) {
            retElId(eT.id).classList.remove("inValidIn");
        }
        else {
            retElId(eT.id).classList.add("inValidIn");
        }
    }

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="aboveSim"></div>
            <motion.div className="fullbg simbg" id="main">
                <motion.div className="left-side">
                    {str1 && str2 && (stepC >= 2) ?
                        <motion.div
                            className="simulation"
                            initial={{ x: 50 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div className="lcsTable">
                                <div id="RowHead" className="row">
                                    <div className="lcsBox"></div>
                                    <div className="lcsBox"></div>
                                    {str1 && str1.map((el, index1) => {
                                        return <div id={`S1M${index1}`} className="lcsBox letter"><p>{el}</p></div>
                                    })}
                                </div>

                                <div id="Row0" className="row">
                                    <div className="lcsBox"></div>
                                    <div id={`M00`} className="lcsBox th2"><p>0</p></div>
                                    {str1 && str1.map((el, index2) => {
                                        return <div id={`M0${index2 + 1}`} className="lcsBox th2"><p>0</p></div>
                                    })}
                                </div>
                                {str2 && str2.map((el, index1) => {
                                    return (
                                        <div id={`Row${index1 + 1}`} className="row">
                                            <div id={`S2M${index1}`} className="lcsBox letter"><p>{el}</p></div>
                                            <div id={`M${index1 + 1}0`} className="lcsBox th2"><p>0</p></div>
                                            {str1 && str1.map((el, index2) => {
                                                return (
                                                    <div id={`M${index1 + 1}${index2 + 1}`} className="lcsBox"><p>0</p><FontAwesomeIcon className="iconsS dNone upIcons" icon={faArrowUp} /></div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </motion.div>
                        </motion.div> : <></>}
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
                                <p className="enHead">Enter two random words</p>
                                <input id="wordIn1" placeholder="String1" value={inStr1} className="insL"
                                    onChange={(e) => { setInStr1(e.target.value); netCheck(e.target.value, e.target) }}>

                                </input>
                                <input id="wordIn2" placeholder="String2" value={inStr2} className="insL"
                                    onChange={(e) => { setInStr2(e.target.value); netCheck(e.target.value, e.target) }}>
                                </input>
                                {doneIns ?
                                    <button className={"cbutton"} onClick={saveIns}><FontAwesomeIcon className="writeCheck" icon={faCheck} /></button>
                                    : <></>
                                }

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
                                    <p>In LCS, A matrix is created whose length is decided based on the lengths of both words.</p>
                                    <p>It is a <i>(n x m) matrix</i></p>
                                    <p>where, <i>n</i> is length of <i>String 1</i></p>
                                    <p>and <i>m</i> is length of <i>String 2</i></p>
                                    <p>Create the <button id="createLCS" className={"spec"} onClick={(e) => { disBut(e); setStepC(2); }}>Lcs Matrix</button></p>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />


                            </motion.div> : <></>
                        }
                        {stepC >= 2 ?
                            <motion.div id="2STDN" className="stepCard"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p id="step2" className="stepH">Step2: </p>
                                <div className="content">
                                    <motion.div
                                        className="inStepDivs1"
                                    >
                                        <p>For matrix LCS[][]. We know, if characters don't match, then do</p>
                                        <p>LCS[x][y] = max(LCS[x-1][y], LCS[x][y-1])</p>
                                    </motion.div>
                                    <motion.div
                                        className="inStepDivs1"
                                    >
                                        <p>If characters match, then do</p>
                                        <p>LCS[x][y] = LCS[x-1][y-1] + 1</p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <p>LCS Algorithm traverses Row wise</p>
                                        <p>Firstly, <button className="cbutton" onClick={() => { hightRow(1) }}>{"{i=1}"}</button>,
                                            <button className="cbutton" onClick={() => { hightCol(1) }}>{" {j=1} "}</button>
                                            {" "}is selected {" => "}
                                            <button className="cbutton" onClick={() => { hightBox(1, 1) }}> (1,1) </button>
                                        </p>
                                        <p>which <button className="cbutton" onClick={() => { hightStr(0, 0, 1) }}>points to</button>
                                            {" "}<b>{str1[0]}</b> and <b>{str2[0]}</b>
                                        </p>
                                        <motion.button
                                            className={"spec"}
                                            id="CheckFirstIndex"
                                            onClick={(e) => { disBut(e); startAlgo(1) }}
                                        >Check for (1,1)</motion.button>
                                        {(currI[0] >= 1 && currI[1] >= 1) ?
                                            <motion.button
                                                id="CheckAll"
                                                initial={{ scale: 0.5 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                                className={"spec"}
                                                onClick={(e) => { disBut(e); startAlgo(0) }}>Similarly, we do for all combination</motion.button> : <></>
                                        }
                                        {algoPart >= 1 ?
                                            <motion.p
                                                className="enHead"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >Thus, all combinations are done!</motion.p> : <></>
                                        }
                                    </motion.div>

                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                        {(stepC >= 3) ?
                            <motion.div id="3STDN" className="stepCard"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p id="step3" className="stepH">Step3: </p>
                                <div className="content">
                                    <p>We find the Longest Common Subsequence, by going backwards from last index</p>
                                    <motion.button id="CalculateLCS" style={{ "display": "block" }} className={"spec"} onClick={(e) => { disBut(e); afterAlgo() }}>Calculate</motion.button>
                                    {(algoPart >= 2) && (finalSeq.length >= 1) ?
                                        <motion.div
                                            initial={{ scale: 0.6 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1 }}
                                        >
                                            <p className="enHead">Longest Common Subsequence is: </p>
                                            <p className="enHead pgreen">{finalSeq}</p>
                                        </motion.div>
                                        : <></>}
                                    {(algoPart >= 2) && (finalSeq.length === 0) ?
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="enHead">There is no Longest Common Subsequence !</p>
                                        </motion.div>

                                        : <></>
                                    }
                                </div>
                                <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                        {(algoPart >= 2) ?
                            <button className="spec restartb" onClick={restart}>Restart</button>
                            : <></>
                        }
                    </motion.div>
                </motion.div>

            </motion.div>
        </>
    );
}

export default SLcs;