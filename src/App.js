<<<<<<< HEAD
import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Home from './pages/Home';
import AppProvider from "./context/appContext";
import SJobSched from "./simulators/SJobSched";
import SLcs from "./simulators/SLcs";
import SDijkstra from "./simulators/SDijkstra";
import SNQueens from "./simulators/SNqueens";
import SKruskals from "./simulators/SKruskals";
import SKnapsack from "./simulators/SKnapsack";
import Lcs from "./mainPages/Lcs";
import TLcs from "./theoryPages/TLcs";
import FLcs from "./feedback/FLcs";
import InsertionSort from "./simulators/InsertionSort";

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/lcs" element={<Lcs />}></Route>
          <Route path="/lcs/theory" element={<TLcs />}></Route>
          <Route path="/lcs/feedback" element={<FLcs />}></Route>
          <Route path="/job-scheduling/simulator" element={<SJobSched />}></Route>
          <Route path="/lcs/simulator" element={<SLcs />}></Route>
          <Route path="/dijkstra/simulator" element={<SDijkstra />}></Route>
          <Route path='/nqueens/simulator' element={<SNQueens />}></Route>
          <Route path="/kruskals/simulator" element={<SKruskals />}></Route>
          <Route path="/knapsack/simulator" element={<SKnapsack />}></Route>
          <Route path="/insert" element={<InsertionSort />}></Route>
        </Routes>
      </AppProvider>
    </HashRouter >
  );
}

export default App;
=======
import React, { useEffect, useState } from 'react'
import './App.css'

export default function App() {

  const[limit, setlimit] = useState(0);
  const [arrayE, setAE] = useState([]);
  const [ev, setEV] = useState();

  const clear = () =>{

    //First Page Start
    const main = document.getElementById("main");
    main.innerHTML = '';
    add();

    //First Page End
  }

  const add = () =>{

    //Second Page Start
    const main = document.getElementById("main");
    const divinsidemain = document.createElement('div');
    const Button = document.createElement('button');
    const Input = document.createElement('input');
    const head = document.createElement('h1');
    head.innerText = 'Enter Number of Elements in Array';
    head.className = 'head';
    Input.id = 'inputArea';
    Input.type = 'number';
    Button.innerText = "Submit";
    Button.className = 'but';
    divinsidemain.className = 'divmain';
    divinsidemain.id = 'divinsidemain';
    main.appendChild(divinsidemain);
    divinsidemain.appendChild(head);
    divinsidemain.appendChild(Input);
    divinsidemain.appendChild(Button);

    //Second Page End

    //Third Page Start
    Button.addEventListener("click", () => {
      const main = document.getElementById('main');
      const InputValue = document.getElementById('inputArea').value;
      const divinsidemain = document.createElement('div');
      divinsidemain.className = 'divmain';
      divinsidemain.id = 'divinsidemain';
      main.innerHTML = '';
      const head = document.createElement('h1');
      head.innerText = 'Enter The Elements';
      head.style.textAlign = 'center';
      main.appendChild(divinsidemain);
      divinsidemain.appendChild(head);
      for(let i = 0; i < InputValue; i++){
        const InputMain = document.createElement('input');
        InputMain.className = 'inputBox';
        InputMain.style.margin = '2vh 0';
        InputMain.type = 'number';
        divinsidemain.appendChild(InputMain);
      }
      const Submit = document.createElement('button');
      Submit.id = 'submit';
      Submit.className = 'but';
      Submit.innerText = 'Submit';
      divinsidemain.appendChild(Submit);

      //Third Page End
      Submit.addEventListener('click', () => {
        const main = document.getElementById('main');
        const arr = [];
        const len = document.querySelectorAll("input");
        console.log(len);
        const head = document.createElement('h1');
        head.innerText = 'The Array is';
        main.innerHTML = '';
        main.appendChild(head);
        const maindiv = document.createElement('div');
        maindiv.className = 'maindiv';
        maindiv.id = 'maindiv'
        main.appendChild(maindiv);
        for(let i = 0; i < len.length; i++){
          const div = document.createElement('div');
          div.className = 'box';
          arr[i] = len[i].value;
          div.innerText = arr[i];
          maindiv.appendChild(div);
        }
        const headArray = document.createElement('h1');
        headArray.innerText = '';
        main.appendChild(headArray);
        const arrayContainer = document.createElement('div');
        arrayContainer.id = "arrayContainer";
        arrayContainer.className = 'arrayContainer';
        main.appendChild(arrayContainer);
        const Button = document.createElement('button');
        Button.className = 'but';
        Button.innerText = "Start";
        main.appendChild(Button);
        // limit > 0 ? Button.setAttribute('disabled', true) : Button.removeAttribute('disabled'); 

        //Foruth Page Start
        Button.addEventListener('click', async () => {
          headArray.innerText = 'Sorted Array is-';
          displayArray(arr);
          await insertionSort(arr);
          // setlimit(limit + 1);
        })

        async function insertionSort(array) {
          const n = array.length;
  
          for (let i = 1; i < n; i++) {
              let j = i;
              while (j > 0 && array[j - 1] > array[j]) {
                  // Swap elements if they are in the wrong order
                  
                  await swap(array, j, j-1)
  
                  // // Update the display after each swap
                  // displayArray(array);
  
                  // // Wait for a short delay to observe the animation
                  // await new Promise((resolve) => setTimeout(resolve, 500));
  
                  j--;
              }
          }
      }

      function displayArray(array) {
        const arrayContainer = document.getElementById("arrayContainer");
        arrayContainer.innerHTML = "";

        array.forEach((value, index) => {
            const box = document.createElement("div");
            box.className = "box";
            box.textContent = value;
            box.id = `box-${index}`;
            // box.style.backgroundColor = 'green';
            arrayContainer.appendChild(box);
        });
    }

      const swap = async (array, a, b) => {
        [array[b], array[a]] = [array[a], array[b]];

        const boxA = document.getElementById(`box-${a}`);
        const boxB = document.getElementById(`box-${b}`);

        boxA.style.backgroundColor = 'green';
        boxB.style.backgroundColor = 'red';

        await new Promise((resolve) => setTimeout(resolve, 750));

        boxA.style.backgroundColor = '';
        boxB.style.backgroundColor = '';

        displayArray(array);
      }
          //Fourth Page End
        }
      )
    })
  }

  //Main HTML Code Start
  return (
    <div id='main'>
      <button className = 'but' onClick={clear}>
        Insertion Sort
      </button>
    </div>

    //Main HTML Code End
  )
}
>>>>>>> 8362da6ae9afe598555011688394c7c6feb1da12
