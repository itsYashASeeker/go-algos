import React, { useEffect, useState } from "react";

import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../css/Lcs.css";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Lcs() {
    const navigate = useNavigate();
    const [str1, setStr1] = useState();
    const [str2, setStr2] = useState();
    const [inStr1, setInStr1] = useState("");
    const [inStr2, setInStr2] = useState("");
    const [stepC, setStepC] = useState(0);
    const [currI, setCurrI] = useState([-1, -1, -1]);
    const [algoPart, setAlgoPart] = useState(0);
    const [finalSeq, setFinalSeq] = useState("");
    const timer = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        if (inStr1 && inStr2) {

            setStepC(1);
            retElId("0STDN").classList.add("algoDone");
            retElId("0STDN").classList.remove("goanime");
        }


    }, [inStr1, inStr2, str1, str2]);

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

    useEffect(() => {
        setCurrI(currI);
    }, [currI]);

    function retElId(idname) {
        return document.getElementById(idname);
    }

    function subLcsStrings() {
        const regex = /[^A-Za-z ]/;
        if (inStr1.search(regex) === -1 && inStr2.search(regex) === -1) {
            setStr1(inStr1.toUpperCase().split(""));
            setStr2(inStr2.toUpperCase().split(""));
            setInStr1("");
            setInStr2("");
            setStepC(2);
        }
        else {
            setInStr1("");
            setInStr2("");
            window.alert("Please enter valid String");
        }
    }

    async function hightRow(rowNo) {
        for (var j = 1; j <= str1.length; j++) {
            if (retElId(`M${rowNo}${j}`)) {
                retElId(`M${rowNo}${j}`).classList.add("hight");
            }
        }
        await timer(1000);
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
        await timer(1000);
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
        await timer(1000);
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
            await timer(1000);
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
                    await timer(1000);
                    dC = [x, y, 1];
                    setCurrI(dC);
                    retElId(`M${x}${y}`).childNodes[0].innerText = Number(retElId(`M${x - 1}${y - 1}`).childNodes[0].innerText) + 1;
                    retElId(`M${x}${y}`).childNodes[1].classList.remove("dNone", "upIcons", "diagonalIcons", "leftIcons");
                    retElId(`M${x}${y}`).childNodes[1].classList.add("diagonalIcons");
                }
                else {
                    hightStr(x - 1, y - 1, 0);
                    await timer(1000);
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
            }
            j = 1;
        }
        await timer(1);

        if (dC[0] === str2.length && dC[1] === str1.length) {
            console.log("Done")
            setAlgoPart(1);
            setStepC(3);
        }
    }

    async function restart() {
        setStr1("");
        setInStr2("");
        setStepC(0);
        setCurrI([-1, -1, -1]);
        setAlgoPart(0);
        setFinalSeq("");
    }

    async function afterAlgo() {
        var go = 1;
        var gx = str2.length;
        var gy = str1.length;
        var seq = "";
        console.log(gx + " " + gy);
        while (go == 1) {
            if (gx === 0 || gy === 0) {
                go = 0;
                break;
            }

            if (retElId(`M${gx}${gy}`).childNodes[1].classList.contains("diagonalIcons")) {
                hightBox(gx, gy);
                await timer(1000);
                retElId(`M${gx}${gy}`).classList.add("bStrs");
                seq += retElId(`S2M${gx - 1}`).childNodes[0].innerText;
                gx = gx - 1;
                gy = gy - 1;
            }
            else if (retElId(`M${gx}${gy}`).childNodes[1].classList.contains("leftIcons")) {
                hightBox(gx, gy);
                await timer(1000);
                gy = gy - 1;
            }
            else if (retElId(`M${gx}${gy}`).childNodes[1].classList.contains("upIcons")) {
                hightBox(gx, gy);
                await timer(1000);
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
    }

    function disBut(e) {
        document.getElementById(e.target.id).setAttribute("disabled", true);
    }

    return (
        <>
            <Navbar />
            <motion.div className="fullbg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div className="left-side">
                    {str1 && str2 ?
                        <motion.div className="lcsTable"
                            initial={{ x: 50 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div id="RowHead" className="row">
                                <div className="lcsBox"></div>
                                <div className="lcsBox"></div>
                                {str1 && str1.map((el, index1) => {
                                    return <div id={`S1M${index1}`} className="lcsBox"><p>{el}</p></div>
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
                                        <div id={`S2M${index1}`} className="lcsBox"><p>{el}</p></div>
                                        <div id={`M${index1 + 1}0`} className="lcsBox th2"><p>0</p></div>
                                        {str1 && str1.map((el, index2) => {
                                            return (
                                                <div id={`M${index1 + 1}${index2 + 1}`} className="lcsBox"><p>0</p><FontAwesomeIcon className="iconsS dNone upIcons" icon={faArrowUp} /></div>
                                            )
                                        })}
                                    </div>
                                )
                            })}

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
                                <input placeholder="String1" value={inStr1}
                                    onChange={(e) => { setInStr1(e.target.value) }}>

                                </input>
                                <input placeholder="String2" value={inStr2}
                                    onChange={(e) => { setInStr2(e.target.value) }}>
                                </input>
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
                                    <p>Create the <button id="createLCS" className={"spec"} onClick={(e) => { disBut(e); subLcsStrings() }}>Lcs Matrix</button></p>
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
                                        <p>Firstly, <button onClick={() => { hightRow(1) }}>{"{i=1}"}</button>,
                                            <button onClick={() => { hightCol(1) }}>{" {j=1} "}</button>
                                            {" "}is selected {" => "}
                                            <button onClick={() => { hightBox(1, 1) }}> (1,1) </button>
                                        </p>
                                        <p>which <button onClick={() => { hightStr(0, 0, 1) }}>points to</button>
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
                                    {(algoPart >= 2) ?
                                        <motion.div
                                            initial={{ scale: 0.3 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1 }}
                                        >
                                            <p className="enHead"
                                            // style={{ "display": "inline-flex" }}
                                            >Longest Common Subsequence is: </p>
                                            <p className="enHead pgreen"
                                            // style={{ "display": "inline-flex" }}
                                            >
                                                {finalSeq}
                                            </p>
                                        </motion.div>
                                        : <></>
                                    }
                                </div>
                            </motion.div> : <></>
                        }
                        {(algoPart >= 2) ?
                            <motion.button onClick={restart}>Restart</motion.button> : <></>
                        }
                    </motion.div>
                </motion.div>

            </motion.div>
        </>
    );
}

export default Lcs;