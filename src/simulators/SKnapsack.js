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
        let totalWeigths = inTotWeight;
        let wIn = inWeight;
        let pIn = inProfit;
        console.log(pwArrs.length);
        if (pwArrs[0].length == 0) {
            refArrs = [[pIn, wIn]];
            setPwArrs(refArrs);
            setInProfit("");
            setInWeight("");
            setNSacks(refArrs.length);
        }
        else {
            refArrs.push([pIn, wIn]);
            setPwArrs(refArrs);
            setInProfit("");
            setInWeight("");
            setNSacks(refArrs.length);
        }
        console.log(pwArrs);
        for (var i = 0; i < refArrs.length; i++) {
            solA[i] = [];
            for (var j = 0; j < totalWeigths; j++) {
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
                        <div className="lcsTable">
                            <div id="1R" className="row">
                                <div className="nBox btB blB mainB2 c12">Profit</div>
                                <div className="nBox btB blB mainB2 c12">Weight</div>
                                {solArr.length > 0 && solArr[0].map((val, index2) => {
                                    return (
                                        <>
                                            {pwArrs.length == 0 ?
                                                <>
                                                    {index2 == solArr[0].length - 1 ?
                                                        <div className="nBox btB blB  bbB brB mainB1">{index2 + 1}</div>
                                                        : <div className="nBox btB blB bbB  mainB1">{index2 + 1}</div>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {index2 == solArr[0].length - 1 ?
                                                        <div className="nBox btB blB brB mainB1">{index2 + 1}</div>
                                                        : <div className="nBox btB blB mainB1">{index2 + 1}</div>
                                                    }
                                                </>

                                            }
                                        </>

                                    )
                                })}
                            </div>
                            {pwArrs[0].length > 0 && pwArrs.map((el, index) => {
                                var i = index + 2;
                                return (
                                    <div id={i + "R"} className="row">
                                        {index == pwArrs.length - 1 ?
                                            <>
                                                <div className="nBox btB blB bbB mainB1 c12">{el[0]}</div>
                                                <div className="nBox btB blB bbB mainB1 c12">{el[1]}</div>
                                            </>
                                            :
                                            <>
                                                <div className="nBox btB blB mainB1 c12">{el[0]}</div>
                                                <div className="nBox btB blB mainB1 c12">{el[1]}</div>
                                            </>

                                        }
                                        {solArr.length > 0 && solArr[index].map((val, index2) => {
                                            return (
                                                <>
                                                    {index == pwArrs.length - 1 ?
                                                        <>
                                                            {index2 == solArr[index].length - 1 ?
                                                                <div className="nBox btB blB  bbB brB">{val}</div>
                                                                : <div className="nBox btB blB bbB ">{val}</div>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {index2 == solArr[index].length - 1 ?
                                                                <div className="nBox btB blB brB">{val}</div>
                                                                : <div className="nBox btB blB">{val}</div>
                                                            }
                                                        </>

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
                                
                                {(stepC==0 && inTotWeight.length > 0 && checkIfInt(inTotWeight)) ?
                                    <motion.button
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        id="idAddTotWeight"
                                     className={"cbutton"} onClick={saveTotalWeight}><FontAwesomeIcon className="writeCheck" icon={faSquarePlus} /></motion.button>
                                    : <></>
                                }
                                </p>

                                {stepC===0 && addPW ?
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
                                {stepC === 0 && pwArrs.length>1 ? 
                                    <motion.button
                                        initial={{y: 20}}
                                        animate={{y: 0}}
                                        transition={{duration: 0.3}}
                                     id="getInput" className="spec" onClick={(e) => {setStepC(1)}}>Submit</motion.button>
                                    : <></>
                                }  
                            </div>
                            <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
                        </motion.div>
                        {stepC>=1 ? 
                            <motion.div id="1STDN" className="stepCard"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.5 }}

                            >
                                <p id="step1" className="stepH">Step1: </p>
                                <div className="content">
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                    <p>Calculation</p>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />


                            </motion.div>
                        : <></>
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
            <FNavbar />
        </>)
}

export default SKnapsack;