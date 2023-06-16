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

export default function SInsertionSort() {
  const [stepC, setStepC] = useState(0);
  const [array1, setArray1] = useState([]);

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


  function displayArray(array) {
    const arrayContainer = document.getElementById("sim");
    arrayContainer.innerHTML = "";
    const maxValue = Math.max(...array);
    array.forEach((value, index) => {
      const currHeight = value / maxValue * 90;
      const box = document.createElement("div");
      box.className = "BoxK";
      box.textContent = value;
      box.style.height = currHeight + "%";
      box.id = `box-${index}`;
      arrayContainer.appendChild(box);
    });
    setStepC(3);
  }

  const swap = async (array, a, b) => {
    [array[b], array[a]] = [array[a], array[b]];

    const boxA = document.getElementById(`box-${a}`);
    const boxB = document.getElementById(`box-${b}`);

    boxA.style.backgroundColor = "green";
    boxB.style.backgroundColor = "red";

    await timer(1000);

    boxA.style.backgroundColor = "";
    boxB.style.backgroundColor = "";
    // console.log("inside swap");
    // console.log(array);
    displayArray(array);
  };

  async function bubbleSort(arr) {
    retElId("2sStartSort").setAttribute("disabled", "disabled");
    for (var i = 0; i < arr.length; i++) {

      // Last i elements are already in place  
      for (var j = 0; j < (arr.length - i - 1); j++) {
        retElId(`box-${j}`).classList.add("goBox");
        await timer(500);

        // Checking if the item at present iteration 
        // is greater than the next iteration
        if ((arr[j] - arr[j + 1]) > 0) {

          // If the condition is true
          // then swap them
          await swap(arr, j, j + 1);
        }
        else {
          await timer(500);
        }
        retElId(`box-${j}`).classList.remove("goBox");
      }
    }
  }

  //Main HTML Code Start
  return (
    <>
      <Navbar />
      <FNavbar />
      <div className="fullbg" id="main">
        <motion.div className="left-side">
          <motion.div id="sim" className="simulation testK"></motion.div>
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
                    <p>In every loop, <b>current element is compared with the right element</b>, <b>if right is smaller</b> then <b>swap</b>. On <b>completion of every loop</b>, the number of <b>elements to be compared from right are decreased</b>, since they become sorted</p>
                  </div>
                  <button className="spec" id="2sStartSort" onClick={() => { bubbleSort(array1) }}>Start Sorting</button>
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
      </div>
    </>
  );
}
