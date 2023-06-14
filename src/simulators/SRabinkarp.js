
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import "../css/Home.css";
import "../css/Lcs.css";
import "../css/Rabinkarp.css";
import FNavbar from "../components/FNavbar.js"

function SRabinkarp() {
    const [text, settext] = useState("");
    const [found, setFound] = useState(0);
    const [pattern, setpattern] = useState("");
    const [hashp, setHashP] = useState(0);
    const [hasht, setHashT] = useState(0);
    const [stepC, setStepC] = useState(0);
    const [o, seto] = useState(0);
    const [anDuration, setAnDuration] = useState(800);
    const timer = ms => new Promise(res => setTimeout(res, ms));
    



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

    function saveIns() {
        // setDoneIns(false);
        setStepC(1);
        retElId("0STDN").classList.add("algoDone");
        retElId("0STDN").classList.remove("goanime");
        settext(text.toUpperCase().split(""));
        setpattern(pattern.toUpperCase().split(""));
        retElId("wordIn1").setAttribute("readonly", "readonly");
        retElId("wordIn2").setAttribute("readonly", "readonly");
    }

    let d = 256;
 
    
    async function rabin(pat, txt, q)
    {
        let M = pat.length;
        let N = txt.length;
        let i, j;
        var k = 0;
        let h = 1;
        for(i = 0; i < M - 1; i++)
            h = (h * d) % q;

        for(i = 0; i < M; i++)
        {
            k = (d * hashp + pat[i].charCodeAt()) % q;
        }
        setHashP(k);
     
        for(i = 0; i <= N - M; i++)
        {

            let s = hashp;
            let g = hasht;
           
            if (s === g)
            {
                
                 
                for(j = 0; j < M; j++)
                {
                    if (txt[i+j] !== pat[j])
                    
                    break;
                }
                
                hightRow(i,0);
                await timer(1000);
                
                
                if (j === M){
                    hightRow(i,1);
                    await timer(1000);
                    console.log(i);
                    setFound(1);
                    seto(i);
                    break;
                    
                }
            }
      
            
            if (i<= N - M)
            {
                let z = 0;
                console.log(text[i+M]);
                let s  = "";
                for(j =i;j <=i+M-1;j++){
                    
                    z = (d * z + txt[j].charCodeAt()) % q;
                    s += txt[j];
                    }

                    
                console.log(s);
                console.log(z)
                setHashT(z);
                await timer(1000);
                
                
            }
            }
            
    }
        
    

    async function hightRow(i,k) {
        if(k===1) {
            for (let j = i+1; j <=   pattern.length+i; j++) {
                if (retElId(`S1M${j}`)) {
                    retElId(`S1M${j}`).classList.add("Bhight");    
                }
            }
            for (let j = 0; j <= pattern.length; j++) {
                if (retElId(`S2M${j}`)) {
                   
                    retElId(`S2M${j}`).classList.add("Bhight");
                    
                } 
            }
            await timer(anDuration);
            for (var j = i+1; j <=   pattern.length+i; j++) {
                if (retElId(`S1M${j}`)) {
                    retElId(`S1M${j}`).classList.remove("Bhight");}}
            for (var j = 0; j <= pattern.length; j++) {
                if (retElId(`S2M${j}`)) {
                   retElId(`S2M${j}`).classList.remove("Bhight");
                    }}
        }
        else{

            for (var j = i+1; j <=   pattern.length+i; j++) {
                if (retElId(`S1M${j}`)) {
                    retElId(`S1M${j}`).classList.add("hight");    
                }
            }
            for (var j = 0; j <= pattern.length; j++) {
                if (retElId(`S2M${j}`)) {
                   
                    retElId(`S2M${j}`).classList.add("hight");
                    
                } 
            }
            await timer(anDuration);
            for (var j = i+1; j <=   pattern.length+i; j++) {
                if (retElId(`S1M${j}`)) {
                    retElId(`S1M${j}`).classList.remove("hight");}}
            for (var j = 0; j <= pattern.length; j++) {
                if (retElId(`S2M${j}`)) {
                   retElId(`S2M${j}`).classList.remove("hight");
                    }}
        }
    }



    
    async function restart() {
        settext("");
        setpattern("");
        setFound(0);
        seto(0);
        setStepC(0);
        setHashP(0);
        setHashT(0);
        
        // setFinalSeq("");
        retElId("wordIn1").removeAttribute("readonly", "readonly");
        retElId("wordIn2").removeAttribute("readonly", "readonly");
    }

    
    function disBut(e) {
        document.getElementById(e.target.id).setAttribute("disabled", true);
    }

    

    return (
        <>
            <Navbar />
            <FNavbar/>
            <motion.div className="fullbg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div className="left-side">
                    {text && pattern && (stepC >= 2) ?
                        <motion.div
                            className="simulation"
                            initial={{ x: 50 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                        <motion.div id="div">

                        </motion.div>
                        <div id="Row0" className="row">
                                
                                <div style={{padding:'3px',background:'none',color:'red',border:"none"}} id={`MMM`} className="lcsBox th2"><p>Hash Value: {hasht}</p></div>
                                
                            </div>
                        <motion.div className="lcsTable">
                            <div id="RowHead" className="row">
                               
                                <div className="lcsBox"></div>
                                {text && text.map((el, index1) => {
                                   
                                    return <div id={`M0${index1}`} className="lcsBox letter"><p>{index1}</p></div>
                                    
                                })}
                                
                                
                            </div>

                            <div id="Row0" className="row">
                                
                                <div style={{padding:'3px',background:'none',color:'red',border:"none"}} id={`M00`} className="lcsBox th2"><p>ASCII</p></div>
                                {text && text.map((el, index2) => {
                                    
                                    return <div id={`S1M${index2+1}`} className="lcsBox th2"><p>{el}</p></div>
                                })}
                            </div>
                            
                           
                            <div id="RowHead" className="row">
                               
                                <div className="lcsBox 2 "></div>
                                {pattern && pattern.map((el, index1) => {
                                    return <div id={`M1${index1} `} style={{padding:'3px',background:'none',border:"none"}} className="lcsBox letter"><p>{index1}</p></div>
                                })}
                            </div>

                            <div id="Row0" className="row">
                                
                                <div style={{padding:'3px',background:'none',border:"none"}} id={`M00`} className="lcsBox th2"><p>ASCII</p></div>
                                {pattern && pattern.map((el, index2) => {

                                    return <div  id={`S2M${index2+1}`} className="lcsBox th2"><p>{el}</p></div>

                                })}
                            </div>

                            </motion.div>
                            <div id="Row0" className="row">
                                
                                <div style={{padding:'3px',background:'none',color:'red',border:"none"}} id={`MMM`} className="lcsBox th2"><p>Hash Value: {hashp}</p></div>
                                
                            </div>
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
                                <p className="enHead">Enter two Text Pattern</p>
                                <input id="wordIn1" placeholder="String1" value={text}
                                    onChange={(e) => {let z =e.target.value;  settext(z); }}>

                                </input>
                                
                                
                                    
                                <input id="wordIn2" placeholder="String2" value={pattern}
                                    onChange={(e) => { setpattern(e.target.value) }}>
                                </input>
                               
                                <button className={"cbutton"} onClick={saveIns}><FontAwesomeIcon className="writeCheck" icon={faCheck} /></button>

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
                                    <p>Rabin-Karp algorithm is an algorithm used for searching/matching patterns in the text </p>
                                    <p>Using  <i>Hash functionx</i></p>
                                   
                                    <p>Create the <button id="createLCS" className={"spec"} onClick={(e) => { disBut(e); setStepC(2);}}>Text Arrays</button></p>
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
                                        <p id='result'>Hash function: d * hash of pattern + pattern[i].charCodeAt() % q</p>
                                        
                                        <p>Text[ASCII] Pattern[ASCII]</p>
                                    </motion.div>
                                   
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        <p>RabinKarp Algorithm traverses array wise and finds the pattern using hash function</p>
                                        {found === 1?
                                        <>
                                        
                                        <motion.div
                                            initial={{ scale: 0.6 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1 }}
                                        >
                                            <p className="enHead">Pattern is Found at index:  </p>
                                            <p className="enHead pgreen">{o}</p>
                                        </motion.div>
                                        <motion.button className="cbutton" onClick={restart}>Restart</motion.button>
                                        </>
                                        
                                        :<>
                                        <motion.button
                                            className={"spec"}
                                            id="CheckFirstIndex"
                                            onClick={(e) => { disBut(e);rabin(pattern,text,101);}}
                                        >Check for Pattern</motion.button>
                                        
                                        </>}
                                        
                                    </motion.div>

                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }

                        
                        

                        
                    </motion.div>
                </motion.div>

            </motion.div>
        </>
    );
}

export default SRabinkarp;