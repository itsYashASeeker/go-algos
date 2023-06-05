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
import FNavbar from "../components/FNavbar";

function SKruskals() {

    const [stepC, setStepC] = useState(0);

    const [gMatrix, setGMatrix] = useState([[]]);
    const [edgeMatrix, setEMatrix] = useState([[]]);
    const [parrentA, setPA] = useState([]);
    const [rankA, setRankA] = useState([]);
    const [minCost, setMinCost] = useState(0);

    const [snodes, setNodes] = useState();
    const [sedges, setEdges] = useState();
    const [nopt, setNOpt] = useState();
    const [eOpt, setEOpt] = useState();

    const [currI, setCurrI] = useState(-1);

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
                    enabled: true,
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
                nArray.push({ id: i, label: String.fromCharCode(asc), ...nopt });
                asc++;
                for (var j = 0; j < vertices; j++) {
                    w = dgMatrix[i][j];
                    if (w != 0) {
                        eArray.push({ id: `${i}${j}`, from: i, to: j, label: String(w), weight: String(w), ...eOpt });
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

    function retElId(idname) {
        return document.getElementById(idname);
    }

    function getGraph(eT) {
        document.getElementById(eT.id).setAttribute("disabled", "disable");
        const gm = graphD[2].m;
        setGMatrix(gm);
        setStepC(1);
    }

    // Kruskal algorithm starts

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
        let v1 = findParent(parent, selV1);
        let v2 = findParent(parent, selV2);
        let wt = edge[i][2];
        let mCost = minCost;

        if (i - 1 >= 0) {
            var prevI = i - 1;
            retElId(prevI + "E").classList.remove("selEShow");
        }
        retElId(i + "E").classList.add("selEShow");


        await timer(300);

        try {
            sedges.update({
                id: `${selV1}${selV2}`,
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
            retElId("answerStat").innerHTML = "Loop will not be created, so select edge " + wt;
            await timer(300);
            unionSet(v1, v2, parent, rank, n);
            mCost += wt;
            // document.write(edge[i][0] + " -- " + edge[i][1] + " == " + wt);
            try {
                sedges.update({
                    id: `${selV1}${selV2}`,
                    color: { color: "#48ff00" },
                    width: 3,
                });
            } catch (error) {
                console.log(error);
            }
        }
        else {
            retElId("answerStat").innerHTML = "Loop will be created, so discard edge " + wt;
            try {
                sedges.update({
                    id: `${selV1}${selV2}`,
                    color: { color: "#ff0000" },
                    width: 3,
                });
                await timer(500);
                sedges.update({
                    id: `${selV1}${selV2}`,
                    ...eOpt
                });
            } catch (error) {
                console.log(error);
            }
        }
        await timer(700);
        try {

            snodes.update({
                id: selV1,
                ...nopt
            });
            snodes.update({
                id: selV2,
                ...nopt
            });
        } catch (error) {
            console.log(error);
        }
        setMinCost(mCost);
        if (i === n - 1) {

        }
        retElId(eT.id).disabled = false;
    }

    function kruskalAlgo(n, edge) {

        edge.sort((a, b) => {
            return a[2] - b[2];
        })


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
        console.log("started");
    }

    function doKruskals(eT) {
        retElId(eT.id).setAttribute("disabled", "disable");
        kruskalAlgo(5, graphD[2].mK);
    }

    function goNextEdge(eT) {
        var cI = currI + 1;
        var mCost = minCost;
        if (cI < edgeMatrix.length) {
            nextEdge(cI, eT);
            setCurrI(cI);
        }
        else {
            var i = cI - 1;
            retElId(i + "E").classList.remove("selEShow");
            retElId("answerStat").classList.add("successC");
            retElId("answerStat").innerHTML = "Minimum Cost is " + mCost;
            retElId(eT.id).setAttribute("disabled", "disable");
            setStepC(2);
        }
        if (cI === edgeMatrix.length - 1) {
            retElId("nextEd").innerHTML = "Answer";
        }
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
                                    <button id="applyDij" className="spec" onClick={(e) => { doKruskals(e.target) }}>Start Kruskal's Algorithm</button>
                                </div>
                                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />
                            </motion.div> : <></>
                        }
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    )
}

export default SKruskals;