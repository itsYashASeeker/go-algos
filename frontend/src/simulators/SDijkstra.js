import React, { useEffect, useState } from "react";

import { animate, delay, motion, useScroll } from "framer-motion";
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


function SDijkstra() {
    const [stepC, setStepC] = useState(0);

    const [noNodes, setNoNodes] = useState();
    const [showNE, setShowNE] = useState(false);
    const [node1, setNode1] = useState();
    const [node2, setNode2] = useState();
    const [edgeVal, setEdV] = useState();
    const [edgeMatrix, setEMatrix] = useState([[]]);

    const [gMatrix, setGMatrix] = useState([[]]);

    const [snodes, setNodes] = useState();
    const [sedges, setEdges] = useState();
    // const [nopt, setNOpt] = useState();
    // const [eOpt, setEOpt] = useState();

    const [distanceA, setDistA] = useState([]);
    const [selSet, setSelSet] = useState([]);
    const [edHA, setEdHA] = useState([[]]);
    const [prevsA, setPrevsA] = useState([]);
    const [mU, setMU] = useState(0);
    const [currSI, setCurrSI] = useState([]);
    const [resultS, setResultS] = useState();

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

    useEffect(() => {
        createGraph("mynetwork", gMatrix, false);
    }, gMatrix);

    function createGraph(idname, gmArr, doOpt) {
        if (gmArr[0].length >= 1) {
            var vertices = gmArr.length;
            var dgMatrix = [];
            var disR = distanceA;
            for (var i = 0; i < vertices; i++) {
                dgMatrix[i] = [];
                for (var j = 0; j < vertices; j++) {
                    dgMatrix[i][j] = gmArr[i][j];
                }
            }

            var nodes = new DataSet();
            var edges = new DataSet();
            var asc = 65;
            var nArray = [];
            var eArray = [];
            var w;
            for (var i = 0; i < vertices; i++) {
                if (doOpt) {
                    // var Ndis = String(disR[i]);
                    nArray.push({ id: i + 1, label: String.fromCharCode(asc) + " (" + disR[i] + ")", ...gnodeOptions });
                }
                else {
                    nArray.push({ id: i + 1, label: String.fromCharCode(asc) + " (inf)", ...gnodeOptions });
                }
                asc++;
                for (var j = 0; j < vertices; j++) {
                    w = dgMatrix[i][j];
                    if (w != 0) {
                        eArray.push({ id: `${i + 1}${j + 1}`, from: i + 1, to: j + 1, label: String(w), weight: String(w), ...gedgeOptions });
                    }
                    dgMatrix[i][j] = dgMatrix[j][i] = 0;
                }
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

    // DIjkstra Algorithm

    function minDistance(dist, sptSet) {
        let min = Number.MAX_VALUE;
        let min_index = -1;
        let V = dist.length;
        for (let v = 0; v < V; v++) {
            if (sptSet[v] == false && dist[v] <= min) {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }

    async function nextDij(curM, eT) {


        retElId(eT.id).setAttribute("disabled", "disable");

        var u = curM[0];
        var v = curM[1];
        var dist = distanceA;
        var sptSet = selSet;
        var edH = edHA;
        var graph = gMatrix;
        var prevS = prevsA;
        var V = gMatrix.length;
        var restS = resultS;

        if (!restS) {
            restS = [];
            for (var i = 0; i < graph.length; i++) {
                restS[i] = [];
                for (var j = 0; j < graph.length; j++) {
                    restS[i][j] = 0;
                }
            }
        }

        for (var i = 0; i < V; i++) {
            try {
                snodes.update({
                    id: i + 1,
                    ...gnodeOptions
                });
            }
            catch (err) {
                console.log(err);
            }

        }

        retElId("answerStat").classList.remove("successC");
        retElId("answerStat").classList.remove("dangerC");

        // retElId("edgeStat1").innerHTML = "Current: " + String.fromCharCode(u + 65) + " -> " + String.fromCharCode(v + 65);
        retElId("edgeStat1").innerHTML = "Traverse ";

        var fNode = document.createElement("span");
        fNode.innerHTML = String.fromCharCode(u + 65);
        fNode.id = "fN";
        retElId("edgeStat1").appendChild(fNode);
        fNode = document.createElement("span");
        fNode.innerHTML = "to:";
        retElId("edgeStat1").appendChild(fNode);

        var firstS = true;
        for (let e = 0; e < V; e++) {
            if (graph[u][e] != 0) {
                if (!firstS) {
                    var comma = document.createElement("span");
                    comma.innerHTML = ", ";
                    retElId("edgeStat1").appendChild(comma);
                }
                else {
                    firstS = false;
                }

                var indEdge = document.createElement("span");
                indEdge.innerHTML = String.fromCharCode(e + 65) + "(" + graph[u][e] + ")";
                indEdge.id = e + "N";
                retElId("edgeStat1").appendChild(indEdge);
            }

        }
        retElId("fN").classList.add("selEShow");
        retElId(v + "N").classList.add("selEShow");

        try {
            snodes.update({
                id: u + 1,
                color: {
                    background: '#008000',
                    highlight: {
                        background: "#008011",
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
        }
        var iAsc = 65;

        if (u < v) {
            var fi = u;
            var li = v;
        }
        else {
            var fi = v;
            var li = u;
        }

        if (graph[u][v] != 0 && edH[u][v] < 2) {
            await timer(200);

            try {
                sedges.update({
                    id: `${fi + 1}${li + 1}`,
                    color: "#000000",
                    width: 3,
                });
                edH[u][v] = edH[v][u] = 1;
            } catch (error) {
                console.log(error);
            }
            await timer(400);
        }
        if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Number.MAX_VALUE && Number(dist[u]) + Number(graph[u][v]) < Number(dist[v])) {
            dist[v] = Number(dist[u]) + Number(graph[u][v]);
            retElId("answerStat").classList.add("successC");
            retElId("answerStat").innerHTML = "dist[" + String.fromCharCode(v + 65) + "] > dist[" + String.fromCharCode(u + 65) + "] + cost[" + String.fromCharCode(u + 65) + "][" + String.fromCharCode(v + 65) + "] is satisfied!";
            if (prevS[v][0] != -1 || prevS[v][1] != -1) {
                sedges.update({
                    id: `${prevS[v][0] + 1}${prevS[v][1] + 1}`,
                    color: "#000000",
                    width: 3,
                });

                if (-1 < prevS[v][0] < graph.length && -1 < prevS[v][1] < graph.length) {
                    restS[prevS[v][0]][prevS[v][1]] = 0;
                    restS[prevS[v][1]][prevS[v][0]] = 0;
                }
                prevS[v] = [-1, -1];
            }
            restS[fi][li] = graph[u][v];
            restS[li][fi] = graph[u][v];

            try {
                snodes.update({
                    id: v + 1,
                    color: {
                        background: '#0000ff',
                    },
                    label: String.fromCharCode(iAsc + v) + ` (${dist[v]})`,
                });
                sedges.update({
                    id: `${fi + 1}${li + 1}`,
                    color: "#008000",
                    width: 3,
                });
                prevS[v] = [fi, li];
                await timer(400);
                snodes.update({
                    id: v + 1,
                    ...gnodeOptions
                });
                edH[u][v] = edH[v][u] = 2;
            } catch (error) {
                console.log(error);
            }
        }
        else {
            // restS[fi][li] = 0;
            // restS[li][fi] = 0;
            retElId("answerStat").classList.add("dangerC");
            retElId("answerStat").innerHTML = "dist[" + String.fromCharCode(v + 65) + "] > dist[" + String.fromCharCode(u + 65) + "] + cost[" + String.fromCharCode(u + 65) + "][" + String.fromCharCode(v + 65) + "] not satisfied!";

        }
        iAsc++;
        setDistA(dist);
        setSelSet(sptSet);
        setEdHA(edH);
        setPrevsA(prevS);
        setResultS(restS);
        retElId(eT.id).disabled = false;
    }

    async function dijkstra(graph) {
        let V = graph.length;
        let dist = new Array(V);
        let sptSet = new Array(V);

        for (let i = 0; i < V; i++) {
            dist[i] = Number.MAX_VALUE;
            sptSet[i] = false;
        }
        var edH = [];
        for (var i = 0; i < V; i++) {
            edH[i] = [];
            for (var j = 0; j < V; j++) {
                edH[i][j] = 0;
            }
        }
        var prevS = [];
        for (var i = 0; i < V; i++) {
            prevS[i] = [-1, -1];
        }

        // setDistA(dist);
        setEdHA(edH);
        setPrevsA(prevS);
        setSelSet(sptSet);

        var asc = 65;
        retElId("edgeStat1").innerHTML = "Current: " + String.fromCharCode(asc);
        try {
            snodes.update({
                id: 1,
                label: String.fromCharCode(asc) + ` (0)`,
            });
        }
        catch (err) {
            console.log(err);
        }
        dist[0] = 0;
        setDistA(dist);
        var sA = new Array(2);
        sA = [-1, -1];
        setCurrSI(sA);

        for (var i = 0; i < V; i++) {
            for (var j = 0; j < V; j++) {
                graph[i][j] = Number(graph[i][j])
            }
        }
        setGMatrix(graph);

    }

    function getGraph(eT) {
        document.getElementById(eT.id).setAttribute("disabled", "disable");
        const gm = graphD[0].m;
        setGMatrix(gm);
        setStepC(1);
    }

    function initForELoop() {
        var sptSet = selSet;
        var dist = distanceA;
        let u = minDistance(dist, sptSet);
        sptSet[u] = true;
        // await setMU(u);
        setSelSet(sptSet);
        return u;
    }

    async function goToNextDij(eT) {
        var count = currSI[0];
        var v = currSI[1];
        var cI = count + 1;
        var vI = (v + 1);
        var u = mU;

        var found = true;
        while (found) {
            if (vI === 0) {
                u = initForELoop();
                setMU(u);
            }
            else if (vI < gMatrix.length && cI < gMatrix.length) {
                // you can go ahead
            }
            else if (vI === gMatrix.length && cI < gMatrix.length - 1) {
                vI = 0;
                cI++;
                u = initForELoop();
                setMU(u);
            }
            else if (cI === gMatrix.length || vI === gMatrix.length) {
                retElId(eT.id).setAttribute("disabled", "disable");

                retElId("answerStat").classList.add("successC");
                retElId("answerStat").innerHTML = "We obtained the shortest path from source A to all nodes";
                retElId("edgeStat1").innerHTML = "";
                try {
                    snodes.update({
                        id: u + 1,
                        ...gnodeOptions
                    });
                } catch (error) {
                    console.log(error);
                }
                retElId("divNetw").classList.add("myNetwork");
                retElId("mynetwork").classList.add("smallNet");
                retElId("mynetwork2").classList.add("smallNet");
                retElId("showMstP").classList.remove("dNoneP");
                setStepC(2);
                AlgoPer({ algoName: expR[currE[0]][currE[1]][0] });
                break;
            }

            if (gMatrix[u][vI] && (gMatrix[u][vI] != 0 || gMatrix[vI][u] != 0)) {

                nextDij([u, vI], eT);
                setCurrSI([cI - 1, vI]);

                found = false;
            }
            else {
                vI++;
            }
        }
    }

    function applyDij(eT) {
        document.getElementById(eT.id).setAttribute("disabled", "disable");
        dijkstra(gMatrix);
        // setStepC(2);
        // console.log(gMatrix);
    }

    function retElId(idname) {
        return document.getElementById(idname);
    }

    // async function createMG() {
    //     createGraph("mynetwork2", resultS, true);
    // }

    function createGMat(eT) {
        var gm = [];
        var n = noNodes;
        var edgem = edgeMatrix;
        for (var i = 0; i < n; i++) {
            gm[i] = [];
            for (var j = 0; j < n; j++) {
                gm[i][j] = 0;
            }
        }
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < edgem.length; k++) {
                    if (i === edgem[k][0] && j === edgem[k][1]) {
                        gm[i][j] = edgem[k][2];
                        gm[j][i] = edgem[k][2];
                        break;
                    }
                }
            }

        }
        setGMatrix(gm);
        console.log(gm);
        retElId(eT.id).setAttribute("disabled", "disabled");
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

    console.log(distanceA);

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
                            <div id="idStatCont" className="statContent">
                                <p id="edgeStat1" style={{ fontWeight: 600 }}></p>
                                <p id="answerStat"></p>
                            </div>
                            {distanceA.length > 0 ?
                                <button id="nextEd" className="spec" onClick={(e) => { goToNextDij(e.target) }}>Next</button>
                                : <></>
                            }

                        </div>
                        <div id="divNetw" className="oldNetwork">
                            <div id="mynetwork" className="oldSmNet"></div>
                            <p id="showMstP" className="dNoneP f1-2"><b>Solution {"->"}</b></p>
                            <div id="mynetwork2" className="divf dSolution">
                                <p className="f1-5"><b>Shortest distance from A:</b></p>
                                <div className="mUpL"></div>
                                {distanceA.map((el, index) => {
                                    return (index === 0 ?
                                        <></>
                                        :
                                        <p className="f1-3 mUpS">Distance to {String.fromCharCode(index + 65)} is {el}</p>
                                    )
                                    {/* return () */ }
                                })}
                            </div>
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
                                            <button id="idcreateGraph" className="spec" onClick={(e) => { createGMat(e.target); setStepC(1) }}>Submit</button>
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
                                    <p>First, we start from source A</p>
                                    <div className="inStepDivs1">
                                        <p>Edge Relaxation:</p>
                                        <p><b>If(dist[v] {">"} dist[u]+cost(u,v))</b></p>
                                        <p>Then do: <b>dist[v] {"="} dist[u]+cost(u,v)</b></p>
                                    </div>

                                    <button id="applyDij" className="spec" onClick={(e) => { applyDij(e.target) }}>Apply Dijkstra</button>
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
        </>)
}

export default SDijkstra;