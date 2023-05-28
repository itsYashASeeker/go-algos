import React, { useEffect, useState } from "react";

import { animate, delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import "../css/Lcs.css";
import "../css/graph.css";
import graphD from "../data/graphD";


function Dijkstra() {
    const [stepC, setStepC] = useState(0);

    const [gMatrix, setGMatrix] = useState([[]]);

    const [snodes, setNodes] = useState();
    const [sedges, setEdges] = useState();
    const [nopt, setNOpt] = useState();
    const [eOpt, setEOpt] = useState();

    const [distanceA, setDistA] = useState([]);
    const [selSet, setSelSet] = useState([]);
    const [edHA, setEdHA] = useState([[]]);
    const [prevsA, setPrevsA] = useState([]);
    const [mU, setMU] = useState(0);
    const [currSI, setCurrSI] = useState([]);

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


    useEffect(() => {
        const options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            locale: 'en',
            interaction: {
                dragNodes: true,
                dragView: true,
                hideEdgesOnDrag: false,
                hideEdgesOnZoom: false,
                hideNodesOnDrag: false,
                // hover: true,
                hoverConnectedEdges: true,
                keyboard: {
                    enabled: false,
                    speed: { x: 10, y: 10, zoom: 0.02 },
                    bindToWindow: true,
                    autoFocus: true,
                },
                multiselect: false,
                navigationButtons: true,
                selectable: true,
                selectConnectedEdges: false,
                tooltipDelay: 300,
                zoomSpeed: 1,
                zoomView: true,

            },
            physics: {
                stabilization: true,
                // solver: "forceAtlas2Based",
                enabled: true,
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                clusterThreshold: 150,
                hierarchical: {
                    enabled: false,
                    levelSeparation: 150,
                    nodeSpacing: 100,
                    // edgeSpacing: 150,
                    treeSpacing: 100,
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: true,
                    direction: 'DU',        // UD, DU, LR, RL
                    sortMethod: 'directed',  // hubsize, directed
                    shakeTowards: 'leaves'  // roots, leaves
                }
            }
        };
        const nodeOptions = {
            borderWidth: 2,
            borderWidthSelected: 3,
            color: {
                background: '#01052b',
                border: '#000000',
                highlight: {
                    background: '#2F3E46',
                    border: "#000000",
                },
            },
            font: {
                color: "#ffffff",
                size: 15, // px
                face: 'arial',
                highlight: {
                    color: "#000000",
                }
            },
            physics: true
        }
        const edgeOptions = {
            color: {
                color: "#00fff2",
            },
            font: {
                color: '#000000',
                size: 18, // px
                face: 'arial',
                background: 'none',
                strokeWidth: 5, // px
                strokeColor: '#ffffff',

            },
            width: 2,
        }
        setNOpt(nodeOptions);
        setEOpt(edgeOptions);
        if (gMatrix[0].length >= 1) {
            var vertices = gMatrix.length;
            var dgMatrix = [];
            for (var i = 0; i < vertices; i++) {
                dgMatrix[i] = [];
                for (var j = 0; j < vertices; j++) {
                    dgMatrix[i][j] = gMatrix[i][j];
                }
            }

            var nodes = new DataSet();
            var edges = new DataSet();
            var asc = 65;
            var nArray = [];
            var eArray = [];
            var w;
            for (var i = 0; i < vertices; i++) {
                nArray.push({ id: i + 1, label: String.fromCharCode(asc) + " (inf)", ...nopt });
                asc++;
                for (var j = 0; j < vertices; j++) {
                    w = dgMatrix[i][j];
                    if (w != 0) {
                        eArray.push({ id: `${i + 1}${j + 1}`, from: i + 1, to: j + 1, label: String(w), weight: String(w), ...eOpt });
                    }
                    dgMatrix[i][j] = dgMatrix[j][i] = 0;
                }
            }
            nodes.add(nArray);
            edges.add(eArray);
            setNodes(nodes);
            setEdges(edges);
            // create a network
            var container = document.getElementById('mynetwork');

            // provide the data in the vis format
            var data = {
                nodes: nodes,
                edges: edges
            };

            const network = new Network(container, data, options);
        }
    }, [gMatrix]);

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

        var count = curM[0];
        var u = mU;
        var v = curM[1];
        var dist = distanceA;
        var sptSet = selSet;
        var edH = edHA;
        var graph = gMatrix;
        var prevS = prevsA;
        var V = gMatrix.length;

        // console.log(graph[u][v]);

        for (var i = 0; i < V; i++) {
            try {
                snodes.update({
                    id: i + 1,
                    ...nopt
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
        fNode.id =  "fN";
        retElId("edgeStat1").appendChild(fNode);
        fNode = document.createElement("span");
        fNode.innerHTML = "to:";
        retElId("edgeStat1").appendChild(fNode);

        var firstS=true;
        for (let e = 0; e < V; e++) {
            if(graph[u][e]!=0){
                if (!firstS) {
                    var comma = document.createElement("span");
                    comma.innerHTML = ", ";
                    retElId("edgeStat1").appendChild(comma);
                }
                else{
                    firstS=false;
                }

                var indEdge = document.createElement("span");
                indEdge.innerHTML = String.fromCharCode(e + 65) + "(" + graph[u][e] + ")";
                indEdge.id = e + "N";
                retElId("edgeStat1").appendChild(indEdge);
            }
            
        }
        retElId("fN").classList.add("selEShow");
        retElId(v+"N").classList.add("selEShow");

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
                prevS[v] = [-1, -1];
            }

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
                    ...nopt
                });
                edH[u][v] = edH[v][u] = 2;
            } catch (error) {
                console.log(error);
            }
        }
        else {
            retElId("answerStat").classList.add("dangerC");
            retElId("answerStat").innerHTML = "dist[" + String.fromCharCode(v + 65) + "] > dist[" + String.fromCharCode(u + 65) + "] + cost[" + String.fromCharCode(u + 65) + "][" + String.fromCharCode(v + 65) + "] not satisfied!";

        }
        iAsc++;
        if (u == V - 1) {
            try {
                snodes.update({
                    id: v + 1,
                    ...nopt
                });
            } catch (error) {
                console.log(error);
            }
        }
        // }
        setDistA(dist);
        setSelSet(sptSet);
        setEdHA(edH);
        setPrevsA(prevS);

        retElId(eT.id).disabled = false;
        console.log(edH);
        console.log(prevS);
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

    function retElId(idname) {
        return document.getElementById(idname);
    }

    async function initForELoop() {
        var sptSet = selSet;
        var dist = distanceA;
        let u = minDistance(dist, sptSet);

        sptSet[u] = true;
        await setMU(u);
        await setSelSet(sptSet);
    }

    async function goToNextDij(eT) {
        var count = currSI[0];
        var v = currSI[1];
        var cI = count + 1;
        var vI = (v + 1);
        var MostC = gMatrix.length - 1;

        var found = true;
        while (found) {
            if (vI === 0) {
                await initForELoop();
            }
            if (gMatrix[mU][vI] != 0) {

                if (vI === MostC && cI === MostC) {
                    retElId(eT.id).setAttribute("disabled", "disable");
                    setStepC(2);
                }
                else if (vI === MostC + 1) {
                    vI = 0;
                    cI++;
                    await initForELoop();
                }
                nextDij([cI - 1, vI], eT);
                setCurrSI([cI - 1, vI]);

                found = false;
            }
            else {
                if (vI === MostC && cI === MostC) {
                    retElId(eT.id).setAttribute("disabled", "disable");
                    setStepC(2);
                    found = false;
                }
                else if (vI === MostC) {
                    vI = 0;
                    cI++;
                }
                else {
                    vI++;
                }
                console.log("u: " + mU + ", v: " + vI + " -> " + gMatrix[mU][vI]);
            }
        }
    }

    function applyDij(eT) {
        document.getElementById(eT.id).setAttribute("disabled", "disable");
        dijkstra(gMatrix);
        setStepC(2);
        // console.log(gMatrix);
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
                        <div id="mynetwork" className="myNetwork"></div>
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
                                <button id="getGraph" className="spec" onClick={(e) => { getGraph(e.target) }}>Get Graph</button>
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
                                    <button id="applyDij" className="spec" onClick={(e) => { applyDij(e.target) }}>Apply Dijkstra</button>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
        </>)
}

export default Dijkstra;