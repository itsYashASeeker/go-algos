import React, { useState } from 'react'
import './App.css'

export default function App() {

  const[limit, setlimit] = useState(0);

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
        const Button = document.createElement('button');
        Button.className = 'but';
        Button.innerText = "Start";
        main.appendChild(Button);
        limit > 0 ? Button.setAttribute('disabled', true) : Button.removeAttribute('disabled'); 

        //Foruth Page Start
        Button.addEventListener('click', () => {
          selectionSort(arr);
          setlimit(limit + 1);
        })

        const selectionSort = (arr) => {
          const maindiv = document.getElementById('maindiv');
          console.log(arr);
          let i = 0; 
          let min = arr[0];
          const arr1 = [];
          while(i <= arr.length - 1){
            for(let j = 0; j < arr.length; j++){
              if(arr[j] < min){
                min = arr[j];
                arr[j] = 999999;
              }
            }
            console.log(min);
            arr1[i] = min;
            i++;
            min = arr[i]; 
          }
          console.log(arr1);
          const br = document.createElement('br');
          maindiv.appendChild(br);
          const head = document.createElement('h1');
          head.innerText = 'The Sorted Array is-';
          maindiv.appendChild(head);
          for(let k = 0; k < arr1.length; k++){
            const div = document.createElement('div');
            div.className = 'box';
            div.innerText = arr1[k];
            maindiv.appendChild(div);
          }
          
          //Fourth Page End
        }
      })
    })
  }

  //Main HTML Code Start
  return (
    <div id='main'>
      <button className = 'but' onClick={clear}>
        Selection Sort
      </button>
    </div>

    //Main HTML Code End
  )
}
