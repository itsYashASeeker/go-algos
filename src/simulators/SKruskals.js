import React, { useEffect, useState } from "react";

import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import "../css/Lcs.css";
import "../css/graph.css";
import graphD from "../data/graphD";
import FNavbar from "../components/FNavbar";
import { goptions, gnodeOptions, gedgeOptions } from "../data/gOptions";
import { AppState } from "../context/appContext";
import { AlgoPer } from "../funcs/AlgoP";
import { expR } from "../data/expRoutes";

function SKruskals() {

    const [stepC, setStepC] = useState(0);

    const [noNodes, setNoNodes] = useState();
    const [showNE, setShowNE] = useState(false);
    const [node1, setNode1] = useState();
    const [node2, setNode2] = useState();
    const [edgeVal, setEdV] = useState();

    const [gMatrix, setGMatrix] = useState([[]]);
    const [edgeMatrix, setEMatrix] = useState([[]]);
    const [parrentA, setPA] = useState([]);
    const [rankA, setRankA] = useState([]);
    const [minCost, setMinCost] = useState(0);

    const [snodes, setNodes] = useState();
    const [sedges, setEdges] = useState();

    const [resultS, setResultS] = useState();

    const [currI, setCurrI] = useState(-1);

    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;

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
        // window.scrollTo(0, 0);
    }, [stepC]);

    function createGraph(idname, edgeM) {
        if (edgeM[0].length >= 1) {
            var nEdges = edgeM.length;
            var nNodes = noNodes;
            var nodes = new DataSet();
            var edges = new DataSet();
            var asc = 65;
            var nArray = [];
            var eArray = [];
            for (var i = 0; i < nNodes; i++) {
                nArray.push({ id: i, label: String.fromCharCode(asc), ...gnodeOptions });
                asc++;
            }
            for (var i = 0; i < nEdges; i++) {
                eArray.push({ id: `i${edgeM[i][0]}j${edgeM[i][1]}`, from: edgeM[i][0], to: edgeM[i][1], label: String(edgeM[i][2]), weight: String(edgeM[i][2]), ...gedgeOptions });
            }
            nodes.add(nArray);
            edges.add(eArray);
            setNodes(nodes);
            setEdges(edges);
            // create a network
            var container = document.getElementById(idname);

            // provide the data in the vis format
            var data = {
                nodes: nodes,
                edges: edges
            };

            const network = new Network(container, data, goptions);
        }

    }

    function showGraph(eT) {
        document.getElementById(eT.id).setAttribute("disabled", "disable");
        // setNOpt(gnodeOptions);
        // setEOpt(gedgeOptions);

        createGraph("mynetwork", edgeMatrix);
        // }, [gMatrix]);
    }

    function retElId(idname) {
        return document.getElementById(idname);
    }

    function getGraph(eT) {
        document.getElementById(eT.id).setAttribute("disabled", "disable");
        const gm = graphD[2].m;
        setGMatrix(gm);
        setStepC(1);
    }

    // Kruskal algorithm 

    function makeSet(parent, rank, n) {
        for (let i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
        setPA(parent);
        setRankA(rank);
    }

    function findParent(parent, component) {
        if (parent[component] == component)
            return component;

        return parent[component] = findParent(parent, parent[component]);
    }

    function unionSet(u, v, parent, rank, n) {
        //this function unions two set on the basis of rank
        //as shown below
        u = findParent(parent, u);
        v = findParent(parent, v);

        if (rank[u] < rank[v]) {
            parent[u] = v;
        }
        else if (rank[u] < rank[v]) {
            parent[v] = u;
        }
        else {
            parent[v] = u;
            rank[u]++;//since the rank increases if the ranks of two sets are same
        }
        setRankA(rank);
        setPA(parent);
    }

    async function nextEdge(i, eT) {
        retElId(eT.id).setAttribute("disabled", "disable");
        var edge = edgeMatrix;
        var parent = parrentA;
        var rank = rankA;
        var n = edge.length;


        let selV1 = edge[i][0];
        let selV2 = edge[i][1];
        // if (selV1 > selV2) {
        //     var temp = selV1;
        //     selV1 = selV2;
        //     selV2 = temp;
        // }
        let v1 = findParent(parent, selV1);
        let v2 = findParent(parent, selV2);
        let wt = edge[i][2];
        let mCost = minCost;
        retElId("answerStat").classList.remove("successC");
        retElId("answerStat").classList.remove("dangerC");
        if (i - 1 >= 0) {
            var prevI = i - 1;
            retElId(prevI + "E").classList.remove("selEShow");
        }
        retElId(i + "E").classList.add("selEShow");


        await timer(300);

        try {
            sedges.update({
                id: `i${selV1}j${selV2}`,
                color: { color: "#000000" },
                width: 3,
            });

            snodes.update({
                id: selV1,
                color: {
                    background: '#a10000',
                    highlight: {
                        background: "#008011",
                    }
                }
            });
            snodes.update({
                id: selV2,
                color: {
                    background: '#a10000',
                    highlight: {
                        background: "#008011",
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }

        await timer(500);
        if (v1 != v2) {
            var resT = [];
            if (resultS) {
                resT = resultS;
            }
            resT.push(edge[i]);
            setResultS(resT);
            retElId("answerStat").classList.add("successC");
            retElId("answerStat").innerHTML = "Loop will not be created, so select edge " + wt;

            await timer(300);
            unionSet(v1, v2, parent, rank, n);
            mCost += wt;
            // document.write(edge[i][0] + " -- " + edge[i][1] + " == " + wt);
            try {
                sedges.update({
                    id: `i${selV1}j${selV2}`,
                    color: { color: "#48ff00" },
                    width: 3,
                });
            } catch (error) {
                console.log(error);
            }
        }
        else {
            retElId("answerStat").classList.add("dangerC");
            retElId("answerStat").innerHTML = "Loop will be created, so discard edge " + wt;

            try {
                sedges.update({
                    id: `i${selV1}j${selV2}`,
                    color: { color: "#ff0000" },
                    width: 3,
                });
                await timer(500);
                sedges.update({
                    id: `i${selV1}j${selV2}`,
                    ...gedgeOptions
                });
            } catch (error) {
                console.log(error);
            }
        }
        await timer(700);
        try {

            snodes.update({
                id: selV1,
                ...gnodeOptions
            });
            snodes.update({
                id: selV2,
                ...gnodeOptions
            });
        } catch (error) {
            console.log(error);
        }
        setMinCost(mCost);
        retElId(eT.id).disabled = false;
    }

    function kruskalAlgo(n, edge) {

        edge.sort((a, b) => {
            return a[2] - b[2];
        })
        // console.log(edgeMatrix);
        // console.log(edge);
        let parent = new Array(n);
        let rank = new Array(n);

        setEMatrix(edge);
        setPA(parent);
        setRankA(rank);

        makeSet(parent, rank, n);

        let minCost = 0;
        let str1 = "";
        // retElId("nextEd").disabled = false;
        retElId("edgeStat").innerHTML = "Sorted edges are: ";
        for (let e = 0; e < n; e++) {

            if (e != 0) {
                var comma = document.createElement("span");
                comma.innerHTML = ", ";
                retElId("edgeStat").appendChild(comma);
            }

            var indEdge = document.createElement("span");
            indEdge.innerHTML = edge[e][2];
            indEdge.id = e + "E";
            retElId("edgeStat").appendChild(indEdge);
        }
        // console.log("started");
    }

    function doKruskals(eT) {
        retElId(eT.id).setAttribute("disabled", "disable");
        kruskalAlgo(edgeMatrix.length, edgeMatrix);
    }

    function goNextEdge(eT) {
        var cI = currI + 1;
        var mCost = minCost;
        if (cI < edgeMatrix.length) {
            console.log(cI);
            nextEdge(cI, eT);
            setCurrI(cI);
        }
        else {
            var i = cI - 1;
            retElId(i + "E").classList.remove("selEShow");
            retElId("answerStat").classList.add("successC");
            retElId("answerStat").innerHTML = "Minimum Cost is " + mCost;
            retElId(eT.id).setAttribute("disabled", "disable");
            retElId("divNetw").classList.add("myNetwork");
            retElId("mynetwork").classList.add("smallNet");
            retElId("mynetwork2").classList.add("smallNet");
            retElId("showMstP").classList.remove("dNoneP");
            createGraph("mynetwork2", resultS);
            setStepC(2);
            AlgoPer({ algoName: expR[currE[0]][currE[1]][0] });
        }
        if (cI === edgeMatrix.length - 1) {
            retElId("nextEd").innerHTML = "Answer";
        }
    }

    // Validations

    function checkIfInt(valNum) {
        if (!valNum) {
            return false;
        }
        const regex = /[^0-9]/;
        if (valNum.search(regex) === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    function checkIfChar(valChar) {
        if (!valChar) {
            return false;
        }
        var n = Number(noNodes);
        var ascNum = Number(valChar.charCodeAt(0));
        var max1 = n + 65;
        var max2 = n + 97;
        if ((ascNum >= 65 && ascNum < max1) || (ascNum >= 97 && ascNum < max2)) {
            return true;
        }
        else {
            return false;
        }
    }

    function retIndexChar(valC) {
        var ascNum = Number(valC.charCodeAt(0));
        if (ascNum >= 97) {
            return ascNum - 97;
        }
        else if (ascNum >= 65) {
            return ascNum - 65;
        }
    }

    function netCheck(val, eT) {
        if (checkIfChar(val)) {
            retElId(eT.id).classList.remove("inValidIn");
        }
        else {
            retElId(eT.id).classList.add("inValidIn");
        }
    }

    function etCheck(val, eT) {
        if (checkIfInt(val)) {
            retElId(eT.id).classList.remove("inValidIn");
        }
        else {
            retElId(eT.id).classList.add("inValidIn");
        }
    }

    function addNEM() {
        var edgeM = edgeMatrix;
        var n1 = retIndexChar(String(node1));
        var n2 = retIndexChar(String(node2));
        var newM = [n1, n2, Number(edgeVal)]
        if (edgeM[0].length === 0) {
            edgeM[0] = newM;
        }
        else {
            edgeM.push(newM);
        }
        setEMatrix(edgeM);
        setNode1("");
        setNode2("");
        setEdV("");
    }


    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="aboveSim"></div>
            <motion.div className="fullbg simbg" id="main">
                <motion.div className="left-side graphLSide">
                    <motion.div
                        className="simulation"
                        initial={{ x: 50 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div id="algoStatus" className="algStat">
                            <div className="statContent">
                                <p id="edgeStat" style={{ fontWeight: 600 }}></p>
                                <p id="answerStat"></p>
                            </div>
                            {parrentA.length > 0 ?
                                <button id="nextEd" className="spec" onClick={(e) => { goNextEdge(e.target) }}>Next</button>
                                : <></>
                            }

                        </div>

                        <div id="divNetw" className="oldNetwork">
                            <div id="mynetwork" className="oldSmNet"></div>
                            <p id="showMstP" className="dNoneP f1-2"><b>MST {"->"}</b></p>
                            <div id="mynetwork2"></div>
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
                                <p>Enter the number of nodes for Graph:</p>
                                <input type="Number" required id="noOfEdge" placeholder="no of Edges" value={noNodes} onChange={(e) => { setNoNodes(e.target.value); etCheck(e.target.value, e.target) }}></input>
                                {noNodes && !showNE ?
                                    <motion.button
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        id="idSveNoEdge"
                                        className={"cbutton"} onClick={() => { setShowNE(true); retElId("noOfEdge").readOnly = true; }}><FontAwesomeIcon className="writeCheck" icon={faSquarePlus} /></motion.button>

                                    : <></>
                                }

                                {showNE && stepC === 0 ?
                                    <>
                                        <p>Enter in format: <b>A, B, 15</b></p>
                                        <div>
                                            <input type="text" maxlength="1" required id="idNode1I" placeholder="Node1" value={node1} onChange={(e) => { setNode1(e.target.value); netCheck(e.target.value, e.target); }}></input>
                                            <input type="text" maxlength="1" required id="idNode2I" placeholder="Node2" value={node2} onChange={(e) => { setNode2(e.target.value); netCheck(e.target.value, e.target); }}></input>
                                            <input required id="idEdgI" placeholder="Edge" value={edgeVal} onChange={(e) => { setEdV(e.target.value); etCheck(e.target.value, e.target) }}></input>
                                            {checkIfChar(node1) && checkIfChar(node2) && checkIfInt(edgeVal) ?
                                                <motion.button
                                                    initial={{ y: 20 }}
                                                    animate={{ y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    id="idAddEdgeM"
                                                    className={"cbutton"} onClick={() => { addNEM() }}><FontAwesomeIcon className="writeCheck" icon={faSquarePlus} /></motion.button>
                                                : <></>
                                            }
                                        </div>

                                        {edgeMatrix[0].length > 0 && edgeMatrix.map((edgeEl) => {
                                            return (
                                                <p>{String.fromCharCode(edgeEl[0] + 65)}{"->"}{String.fromCharCode(edgeEl[1] + 65)}{" "}<b>{edgeEl[2]}</b></p>
                                            )
                                        })}
                                        {edgeMatrix.length >= noNodes ?
                                            <button id="idcreateGraph" className="spec" onClick={(e) => { showGraph(e.target); setStepC(1) }}>Submit</button>
                                            : <p className="dangerC">Enter minimum {noNodes} edges</p>
                                        }
                                    </>
                                    : <></>
                                }

                                {/* <button id="getGraph" className="spec" onClick={(e) => { getGraph(e.target) }}>Get Graph</button> */}
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
                                    <p>We first Sort the edges, and traverse through every edge.</p>
                                    <p>If edge <b>doesn't create loop</b>, it is <b>Selected</b></p>
                                    <p>If edge <b>creates loop</b>, it is <b>Discarded</b></p>
                                    <button id="applyDij" className="spec" onClick={(e) => { doKruskals(e.target) }}>Start Kruskal's Algorithm</button>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                        {stepC >= 2 ?
                            <button className="spec restartb" onClick={() => { window.location.reload() }}>Restart</button>
                            : <></>
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    )
}

export default SKruskals;