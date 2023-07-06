import React, { useState } from "react";
import "../css/insertionSort.css";
import "../css/Home.css";
import "../css/Lcs.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import FNavbar from "../components/FNavbar";
import { AppState } from "../context/appContext";
import { AlgoPer } from "../funcs/AlgoP";
import { expR } from "../data/expRoutes";

export default function SInsertionSort() {
  const [stepC, setStepC] = useState(0);
  const [array1, setArray1] = useState([]);

  const { cuE, algoT, userD } = AppState();
  const [currE, setCE] = cuE;

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

  function retElId(idname) {
    return document.getElementById(idname);
  }

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const update = () => {
    const firstInput = document.getElementById("firstInput");
    const firstButton = document.getElementById("firstButton");
    firstButton.style.display = "none";
    createBox(parseInt(firstInput.value));
    firstInput.readOnly = true;
    setStepC(1);
  };

  const createBox = async (element) => {
    await timer(10);
    const second = document.getElementById("idTakeEl");
    retElId("1STDN").classList.add("goanime");
    let nCrea = element;
    const head = document.createElement("p");
    head.innerText = "Now, Enter The elements of Array";
    second.appendChild(head);
    for (let i = 0; i < nCrea; i++) {
      const inputSec = document.createElement("input");
      inputSec.innerText = "";
      inputSec.type = "number";
      inputSec.id = `box${i}`;
      second.appendChild(inputSec);
    }
    const ButtonSec = document.createElement("button");
    ButtonSec.innerText = "Submit";
    ButtonSec.classList.add("spec");
    second.appendChild(ButtonSec);
    ButtonSec.addEventListener("click", async () => {
      ButtonSec.setAttribute("disabled", "disabled");
      const Arr = [];
      for (let k = 0; k < nCrea; k++) {
        const Ele = document.getElementById(`box${k}`);
        Ele.readOnly = true;
        Arr.push(Ele.value);
      }

      setArray1(Arr);
      displayArray(Arr);
      setStepC(2);
    });
  };

  async function selectionSort(inputArr) {
    retElId("2sStartSort").setAttribute("disabled", "disabled");
    let n = inputArr.length;

    for (let i = 0; i < n; i++) {
      retElId("sol1").innerHTML = `Counter: ${Number(i + 1)}`;
      retElId(`box-${i}`).classList.add("boxKSel");
      await timer(500);
      // Finding the smallest number in the subarray
      let min = i;
      retElId("sol12").innerHTML = `Minimum element: ${inputArr[min]}`;
      for (let j = i + 1; j < n; j++) {

        retElId(`box-${j}`).classList.add("goBox");
        await timer(500);
        retElId(`box-${j}`).classList.remove("goBox");
        if (inputArr[j] - inputArr[min] < 0) {
          min = j;
          retElId(`box-${j}`).classList.add("matchBox");
          retElId("sol12").innerHTML = `Minimum element: ${inputArr[min]}`;
          await timer(500);
          retElId(`box-${j}`).classList.remove("matchBox");
          await timer(500);
        }
      }
      if (min != i) {
        await timer(500);
        [inputArr[min], inputArr[i]] = [inputArr[i], inputArr[min]];
        const maxValue = Math.max(...inputArr);
        retElId(`box-${i}`).classList.add("matchBox");
        retElId(`box-${min}`).classList.add("matchBox");
        var temp = Number(retElId(`box-${i}`).innerHTML);
        retElId(`box-${i}`).innerHTML = Number(retElId(`box-${min}`).innerHTML);
        var currV = Number(retElId(`box-${min}`).innerHTML) / maxValue * 90;
        retElId(`box-${i}`).style.height = currV + "%";

        retElId(`box-${min}`).innerHTML = temp;
        currV = temp / maxValue * 90;
        retElId(`box-${min}`).style.height = currV + "%";

        await timer(500);
        retElId(`box-${i}`).classList.remove("matchBox");
        retElId(`box-${min}`).classList.remove("matchBox");
        await timer(200);
      }
      retElId(`box-${i}`).classList.remove("boxKSel");
    }
    retElId("sol1").innerHTML = "";
    retElId("sol12").innerHTML = "";
    retElId("sol2").classList.add("successC");
    retElId("sol2").innerHTML = "Array is sorted!";
    setStepC(3);
    AlgoPer({ algoName: expR[currE[0]][currE[1]][0] });
  }

  function displayArray(array) {
    const arrayContainer = document.getElementById("sim");
    arrayContainer.innerHTML = "";
    const maxValue = Math.max(...array);
    array.forEach((value, index) => {
      const currHeight = value / maxValue * 90;
      const box = document.createElement("div");
      box.classList.add("BoxK");
      box.innerHTML = Number(value);
      box.style.height = currHeight + "%";
      box.id = `box-${index}`;
      arrayContainer.appendChild(box);
    });
    setStepC(3);
  }

  //Main HTML Code Start
  return (
    <>
      <Navbar />
      <FNavbar />
      <div className="aboveSim"></div>
      <motion.div className="fullbg simbg" id="main">
        <motion.div className="left-side">
          <motion.div className="simulation simPT">
            <div id="algoStatus" className="algStat">
              <div id="idStatCont" className="statContent">
                <p id="sol1" style={{ fontWeight: 600 }}></p>
                <p id="sol12" style={{ fontWeight: 600 }}></p>
                <p id="sol2"></p>
              </div>
            </div>
            <div id="sim" className="divf testK"></div>
          </motion.div>
        </motion.div>
        <motion.div className="right-side">
          <motion.div id="idAllSteps" className="allSteps">
            <motion.div
              className="stepCard"
              id="0STDN"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="content">
                <p id="step0" className="stepH">Step0: </p>
                <h2>Enter Number of Elements</h2>
                <input type="text" required min={0} id="firstInput" />
                <button className="spec" id="firstButton" onClick={update}>
                  Submit
                </button>
              </div>
              <FontAwesomeIcon id="0STDN" className="stepDoneIcon" icon={faCircleCheck} />
            </motion.div>
            {stepC >= 1 ? (
              <motion.div
                className="stepCard"
                id="1STDN"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p id="step1" className="stepH">Step1: </p>
                <div className="content" id="idTakeEl">

                </div>
                <FontAwesomeIcon id="1STDN" className="stepDoneIcon" icon={faCircleCheck} />
              </motion.div>
            ) : (
              <></>
            )}
            {stepC >= 2 ? (
              <motion.div
                className="stepCard"
                id="2STDN"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p id="step2" className="stepH">Step2: </p>
                <div className="content">
                  <div className="inStepDivs1">
                    <p><b>Counter starts from 1 to n</b></p>
                    <p>In every loop, the <b>minimum element is found and swapped with current counter element</b></p>
                  </div>
                  <button className="spec" id="2sStartSort" onClick={() => { selectionSort(array1) }}>Start Sorting</button>
                </div>
                <FontAwesomeIcon id="2STDN" className="stepDoneIcon" icon={faCircleCheck} />
              </motion.div>
            ) : (
              <></>
            )}
            {stepC >= 3 ?
              <button className="spec restartb" onClick={() => { window.location.reload() }}>Restart</button>
              : <></>}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
