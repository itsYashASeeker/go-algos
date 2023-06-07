import React, { useEffect, useState } from "react";

import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCheck, faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import "../css/Lcs.css";
import "../css/JobSched.css";
import "../css/Knapsack.css";
import FNavbar from "../components/FNavbar";


function SKnapsack() {

    const [stepC, setStepC] = useState(0);
    const [inProfit, setInProfit] = useState("");
    const [inWeight, setInWeight] = useState("");
    const [inputOk, setInputOk] = useState(0);
    const [pwArrs, setPwArrs] = useState([[]]);
    const [inTotWeight, setInTotWeight] = useState("");
    const [NSacks, setNSacks] = useState(0);
    const [solArr, setSolArr] = useState([[]]);
    const [addPW, setAddPW] = useState(false);
    const [countI, setCountI] = useState(0);
    const [countJ, setCountJ] = useState(0);

    function retElId(idname) {
        return document.getElementById(idname);
    }

    const timer = ms => new Promise(res => setTimeout(res, ms));

    // useEffect(() => {
    //     if () {
    //         if (stepC === 0) {
    //             setAddPW(true);
    //         }
    //         else {
    //             setAddPW(false);
    //         }
    //     }
    //     else {
    //         setAddPW(false);
    //     }
    // }, [inProfit, inWeight]);

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

    // useEffect(()=>{
    //     const regex = /[^0-9]/;
    //     var st1 = "1, 2, 3";
    //     console.log(st1.search(regex));
    // }, [inProfit, inWeight]);

    function checkIfInt(valNum) {
        console.log(valNum);
        const regex = /[^0-9]/;
        if (valNum.search(regex) === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    function addPWs() {
        let refArrs = pwArrs;
        let solA = [];
        let totalWeigths = Number(inTotWeight);
        let wIn = Number(inWeight);
        let pIn = Number(inProfit);
        console.log(pwArrs.length);
        if (pwArrs[0].length === 0) {
            refArrs = [["Profit", "Weight"]];
            refArrs.push([pIn, wIn]);
            setPwArrs(refArrs);
            setInProfit("");
            setInWeight("");
            setNSacks(refArrs.length - 1);
        }
        else {
            refArrs.push([pIn, wIn]);
            setPwArrs(refArrs);
            setInProfit("");
            setInWeight("");
            setNSacks(refArrs.length - 1);
        }
        let iL = refArrs.length + 1;
        let jL = totalWeigths + 1;
        console.log(pwArrs);
        for (var i = 0; i < iL; i++) {
            solA[i] = [];
            for (var j = 0; j < jL; j++) {
                solA[i].push(0);
            }
        }

        setSolArr(solA);
    }

    function saveTotalWeight() {
        retElId("totweightIn").readOnly = true;
        setAddPW(true);
        retElId("idAddTotWeight").style.display = "none";
    }

    async function doKnap(eT) {
        var profits = [];
        var weights = [];
        var TotalW = Number(inTotWeight);
        var pAndWA = pwArrs;
        var n = pAndWA.length;
        var kMatrix = solArr;
        var i = countI;
        var j = countJ;

        for (var k = 1; k < n; k++) {
            profits[k - 1] = Number(pAndWA[k][0]);
            weights[k - 1] = Number(pAndWA[k][1]);
        }

        let jI;
        let pI;
        let findI;
        var totL = TotalW + 1;
        retElId(eT.id).setAttribute("disabled", "disabled");
        // --------------
        if (i % n === 0 || j % totL === 0) {
            i++;
            j = 1;
            retElId(`${i - 1}i${totL - 1}`).classList.remove("animBGY");
            retElId(`P${i}`).classList.add("normAnime");
            retElId(`W${i}`).classList.add("normAnime");

        }
        else {
            retElId(`${i}i${j - 1}`).classList.remove("animBGY");
        }
        var pwI = i - 1;
        retElId(`P${i - 1}`).classList.remove("normAnime");
        retElId(`W${i - 1}`).classList.remove("normAnime");
        await timer(500);
        // --------------------
        jI = "";
        pI = "";
        findI = "";
        retElId(`${i}i${j}`).classList.add("normAnime");
        await timer(500);
        // ----------------------
        if ((i - 1) >= 0 && (j - weights[pwI]) >= 0) {
            retElId("sol1").innerHTML = "Condition is satisfied";
            retElId("sol1").classList.remove("cRed");
            retElId("sol1").classList.add("cGreen");
            var n1 = Number(kMatrix[i - 1][j - weights[pwI]]) + Number(profits[pwI]);
            var n2 = Number(kMatrix[i - 1][j]);

            if (n1 > n2) {
                kMatrix[i][j] = Number(n1);
                jI = "bgRed";
                pI = "bgGreen";
                findI = "bgGreen";
                retElId("sol2").innerHTML = "(" + kMatrix[i - 1][j - weights[pwI]] + " + " + profits[pwI] + " ) > " + kMatrix[i - 1][j];
            }
            else {
                kMatrix[i][j] = Number(n2);
                jI = "bgGreen";
                pI = "bgRed";
                findI = "bgRed";
                retElId("sol2").innerHTML = "(" + kMatrix[i - 1][j - weights[pwI]] + " + " + profits[pwI] + " ) < " + kMatrix[i - 1][j];
            }
            
            retElId(`${i - 1}i${j}`).classList.add(jI);
            retElId(`P${i}`).classList.add(pI);
            retElId(`${i - 1}i${j - weights[pwI]}`).classList.add(findI);

            await timer(500);

            retElId(`${i}i${j}`).innerHTML = kMatrix[i][j];
            retElId(`${i}i${j}`).classList.remove("normAnime");
            retElId(`${i}i${j}`).classList.add("animBGY");

            await timer(500);

            retElId(`${i - 1}i${j}`).classList.remove(jI);
            retElId(`P${i}`).classList.remove(pI);
            retElId(`${i - 1}i${j - weights[pwI]}`).classList.remove(findI);
        }
        else {
            retElId("sol1").classList.add("cRed");
            retElId("sol1").classList.remove("cGreen");
            retElId("sol1").innerHTML = "Condition not satisfied";
            if (Number(weights[pwI]) <= Number(j)) {
                kMatrix[i][j] = Number(weights[pwI]);
                jI = "bgGreen";
                retElId("sol2").innerHTML = weights[pwI]+" is selected";
            }
            else {
                kMatrix[i][j] = Number(kMatrix[i - 1][j]);
                jI = "bgRed";
                retElId(`${i - 1}i${j}`).classList.add("bgGreen");
                retElId("sol2").innerHTML = "Upper element is selected";
            }
            retElId(`j${j}`).classList.add(jI);
            retElId(`W${i}`).classList.add(jI);

            await timer(500);

            retElId(`${i}i${j}`).innerHTML = kMatrix[i][j];
            retElId(`${i}i${j}`).classList.remove("normAnime");
            retElId(`${i}i${j}`).classList.add("animBGY");
            retElId(`W${i}`).classList.remove(jI);
            retElId(`j${j}`).classList.remove(jI);
            retElId(`${i - 1}i${j}`).classList.remove("bgGreen");
        }
        // ---------------------

        if (i === n - 1 && j === TotalW) {
            retElId(`${i}i${j}`).classList.remove("animBGY");
            retElId(`P${i}`).classList.remove("normAnime");
            retElId(`W${i}`).classList.remove("normAnime");
            retElId(eT.id).setAttribute("disabled", "disabled");
            retElId("sol1").innerHTML = "";
            retElId("sol2").innerHTML = "";
        }
        else{
            retElId(eT.id).removeAttribute("disabled", "disabled");
        }
        j++;
        setCountI(i);
        setCountJ(j);
        // }
        setSolArr(kMatrix);
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
                <motion.div className="left-side">
                    <motion.div
                        className="simulation"
                        initial={{ x: 50 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="lcsTable kTable">
                            <div id="1R" className="row krow">
                                <div className="nBox btB blB mainB2 c12"></div>
                                <div className="nBox btB blB mainB2 c12"></div>
                                {solArr.length > 0 && solArr[0].map((val, index2) => {
                                    return (
                                        <>
                                            {pwArrs.length === 0 ?
                                                <div id={`j${Number(index2)}`} className={index2 == solArr[0].length - 1 ? "nBox btB blB  bbB brB mainB1" :
                                                    "nBox btB blB bbB  mainB1"}>{index2}</div>
                                                :
                                                <div id={`j${Number(index2)}`} className={index2 == solArr[0].length - 1 ? "nBox btB blB brB mainB1" :
                                                    "nBox btB blB mainB1"}>{index2}</div>
                                            }
                                        </>

                                    )
                                })}
                            </div>
                            {pwArrs[0].length > 0 && pwArrs.map((el, index) => {
                                var i = index + 2;
                                return (
                                    <div id={i + "R"} className="row krow">

                                        <div id={`P${Number(index)}`} className={index === pwArrs.length - 1 ? "nBox btB blB bbB mainB1 c12" :
                                            "nBox btB blB mainB1 c12"}>{el[0]}</div>
                                        <div id={`W${Number(index)}`} className={index === pwArrs.length - 1 ? "nBox btB blB bbB mainB1 c12" :
                                            "nBox btB blB mainB1 c12"}>{el[1]}</div>

                                        {solArr.length > 0 && solArr[index].map((val, index2) => {
                                            return (
                                                <>
                                                    {index == pwArrs.length - 1 ?
                                                        <div id={`${index}i${index2}`} className={index2 == solArr[index].length - 1 ? "nBox btB blB  bbB brB" :
                                                            "nBox btB blB bbB "}>{val}</div>
                                                        :
                                                        <div id={`${index}i${index2}`} className={index2 == solArr[index].length - 1 ? "nBox btB blB brB" :
                                                            "nBox btB blB"}>{val}</div>

                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                )

                            })}
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
                                <p>Number of sacks: {NSacks}</p>
                                <p>Total weight:
                                    <input id="totweightIn" placeholder="total weight" value={inTotWeight} onChange={(e) => { setInTotWeight(e.target.value); }}></input>

                                    {(stepC == 0 && inTotWeight.length > 0 && checkIfInt(inTotWeight)) ?
                                        <motion.button
                                            initial={{ y: 20 }}
                                            animate={{ y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            id="idAddTotWeight"
                                            className={"cbutton"} onClick={saveTotalWeight}><FontAwesomeIcon className="writeCheck" icon={faSquarePlus} /></motion.button>
                                        : <></>
                                    }
                                </p>

                                {stepC === 0 && addPW ?
                                    <motion.div
                                        initial={{ y: 50 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>Add profits and weights:</p>
                                        <input id="profitIn" placeholder="profit" value={inProfit} onChange={(e) => { setInProfit(e.target.value) }}></input>
                                        <input id="weightIn" placeholder="weight" value={inWeight} onChange={(e) => { setInWeight(e.target.value) }}></input>
                                        {(inProfit.length >= 1 && inWeight.length >= 1 && checkIfInt(inProfit) && checkIfInt(inWeight)) ?
                                            <motion.button
                                                initial={{ y: 20 }}
                                                animate={{ y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="cbutton" style={{ "marginLeft": "1rem" }} onClick={addPWs}>
                                                <FontAwesomeIcon className="writeCheck" icon={faSquarePlus} />
                                            </motion.button>
                                            : <></>
                                        }

                                    </motion.div>

                                    : <></>
                                }
                                {stepC === 0 && pwArrs.length > 1 ?
                                    <motion.button
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        id="getInput" className="spec" onClick={(e) => { setStepC(1) }}>Submit</motion.button>
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
                                    
                                    <div className="inStepDivs1">
                                        <p>Condition: k[i][j]=max((k[i - 1][j - weight] + profit), k[i-1][j])</p>
                                        <p>Note: if <b>k[i - 1][j - weight]</b> doesn't exist then <b>k[i-1][j]</b> is considered</p>
                                    </div>
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 0.3}}
                                     className="solC">
                                        <p id="sol1"></p>
                                        <p id="sol2"></p>
                                    </motion.div>
                                    <button id="solveknap" className="spec" onClick={(e)=>{doKnap(e.target)}}>Solve</button>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />


                            </motion.div>
                            : <></>
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
        </>)
}

export default SKnapsack;