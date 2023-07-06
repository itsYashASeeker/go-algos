import React from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import '../css/progressbar.css';

export default function Multiprogressbar(props) {
    
  return (
    
    <div>
      <ProgressBar className='progbar' 

      
        percent={((props.steps -1)*100)/2}
        // filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        filledBackground="linear-gradient(to right, #fc0303, #fc0303)"
      >
        <Step transition="scale">
          {({ accomplished ,index}) => (
            <div className={`step ${accomplished ? "completed" : ""}`} id='fs1'>
                0%
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished,index }) => (
            <div className={`step ${accomplished ? "completed" : ""}`} id='fs2'>
            50%
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished ,index }) => (
            <div className={`step ${accomplished ? "completed" : ""}`} id='fs3'>
            100%
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  )
}
