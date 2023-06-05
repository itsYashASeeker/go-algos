import React, { useState } from "react";

import "../css/Nqueens.css";
import {motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SNQueens() {
    const [sel, setSel] = useState("");
    
    const navigate = useNavigate();
    
    let option = [[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];
   
   
    let option1 = [[0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];

    let option2 = [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
   




    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
        }


    function checkQueensPositions(option, row, col,n){
    
    for(let i = 0; i < col; i++){
        // await delay(1000);
        if (option[row][i] === 1){
           
            return false ;
        }
        
       
        
    }

    // for(let i = 0; i < row; i++){
    //     if (option[i][col] == ""){
    //         option[i][col] = "X"
    //         document.getElementById(`i${i}j${col}`).innerHTML = "X" ;
    //     }
        
    // }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--){
        // await delay(1000);
        if (option[i][j] === 1){
            
        //    document.getElementById(`i${i}j${j}`).style.backgroundColor = "rgb(255, 128, 128)";
           return false ;
        }
        
        
    }
    for (let i = row, j = col; j >= 0 && i < n; i++, j--){
        // await delay(1000);
        if (option[i][j]){
            
            // document.getElementById(`i${i}j${j}`).style.backgroundColor = "rgb(255, 128, 128)";
            return false ;
        }
        
    }
 
    return true 
}

 
function nQueenssolve(option, col,n){
     
    
    if(col >= n)
        return true
    // await delay(5000);

    for(let i=0;i<n;i++){
        // await delay(1000);
        if(checkQueensPositions(option, i, col,n)===true){
            
            option[i][col] = 1;
            document.getElementById(`i${i}j${col}`).innerHTML = "♛" ;
            // await delay(3000);
            if(nQueenssolve(option, col + 1,n) == true){
                document.getElementById(`i${i}j${col}`).style.backgroundColor = "rgb(176, 247, 143)";
                return true
            }
            
            
            option[i][col] = 0;
            document.getElementById(`i${i}j${col}`).innerHTML = null ;
            
            
        }
        document.getElementById(`i${i}j${col}`).innerHTML = null ;
        
        
    }
    
    return false
}

    function checknqueens(n){
        if(nQueenssolve(option, 0,n) === false){
            
            return false
        }
        
       
    }

    function queen(){
        
        if (sel === "4Queens"){
            option = option1;
            checknqueens(4);
            
            console.log(option);
            
        }
        else{
            if(sel === "8Queens"){
                option = option2;
                checknqueens(8);
            }
        }
    }
    return (
        <>

            <motion.div className="fullbg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="navbar">
                    <button className="navHome" onClick={() => { navigate("/") }}>Home</button>
                    <h1 className="title">N Queens Problem</h1>
                    <div className="btn">
                    <button className="alButton" onClick={() => { setSel("4Queens") }}>4Queens</button>
                    <button className="alButton" onClick={() => { setSel("8Queens") }}>8Queens</button>
                    <button className="alButton" onClick={() => { queen() }}>Start</button>
                    </div>
                    
                </div>
                
                {sel === "4Queens"?
                    <div id="cellContainer4">
                    <div className="cell "  cellindex ='0'><h3 id="i0j0"></h3></div>
                    <div className="cell " cellindex ='1'><h3 id="i0j1"></h3></div>
                    <div className="cell "  cellindex ='2'><h3 id="i0j2"></h3></div>
                    <div className="cell "  cellindex ='3'><h3 id="i0j3"></h3></div>
                    <div className="cell"  cellindex ='4'><h3 id="i1j0"></h3></div>
                    <div className="cell "  cellindex ='5'><h3 id="i1j1"></h3></div>
                    <div className="cell "  cellindex ='6'><h3 id="i1j2"></h3></div>
                    <div className="cell "  cellindex ='7'><h3 id="i1j3"></h3></div>
                    <div className="cell "  cellindex ='8'><h3 id="i2j0"></h3></div>
                    <div className="cell "  cellindex ='9'><h3 id="i2j1"></h3></div>
                    <div className="cell "  cellindex ='10'><h3 id="i2j2"></h3></div>
                    <div className="cell "  cellindex ='11'><h3 id="i2j3"></h3></div>
                    <div className="cell "  cellindex ='12'><h3 id="i3j0"></h3></div>
                    <div className="cell "  cellindex ='13'><h3 id="i3j1"></h3></div>
                    <div className="cell "  cellindex ='14'><h3 id="i3j2"></h3></div>
                    <div className="cell "  cellindex ='15'><h3 id="i3j3"></h3></div>
                    
                    </div>    
                        
                :<></>}


                {sel === "8Queens"?
                    
                   
                    <div id="cellContainer8">

                    <div className="cell "  cellindex ='0'><h3 id="i0j0"></h3></div>
                    <div className="cell " cellindex ='1'><h3 id="i0j1"></h3></div>
                    <div className="cell "  cellindex ='2'><h3 id="i0j2"></h3></div>
                    <div className="cell "  cellindex ='3'><h3 id="i0j3"></h3></div>
                    <div className="cell "  cellindex ='4'><h3 id="i0j4"></h3></div>
                    <div className="cell "  cellindex ='5'><h3 id="i0j5"></h3></div>
                    <div className="cell "  cellindex ='6'><h3 id="i0j6"></h3></div>
                    <div className="cell"  cellindex ='7'><h3 id="i0j7"></h3></div>
                    
                    <div className="cell "  cellindex ='8'><h3 id="i1j0"></h3></div>
                    <div className="cell " cellindex ='9'><h3 id="i1j1"></h3></div>
                    <div className="cell "  cellindex ='10'><h3 id="i1j2"></h3></div>
                    <div className="cell "  cellindex ='11'><h3 id="i1j3"></h3></div>
                    <div className="cell "  cellindex ='12'><h3 id="i1j4"></h3></div>
                    <div className="cell "  cellindex ='13'><h3 id="i1j5"></h3></div>
                    <div className="cell "  cellindex ='14'><h3 id="i1j6"></h3></div>
                    <div className="cell"  cellindex ='15'><h3 id="i1j7"></h3></div>
                    
                    <div className="cell "  cellindex ='16'><h3 id="i2j0"></h3></div>
                    <div className="cell " cellindex ='17'><h3 id="i2j1"></h3></div>
                    <div className="cell "  cellindex ='18'><h3 id="i2j2"></h3></div>
                    <div className="cell "  cellindex ='19'><h3 id="i2j3"></h3></div>
                    <div className="cell "  cellindex ='20'><h3 id="i2j4"></h3></div>
                    <div className="cell "  cellindex ='21'><h3 id="i2j5"></h3></div>
                    <div className="cell "  cellindex ='22'><h3 id="i2j6"></h3></div>
                    <div className="cell"  cellindex ='23'><h3 id="i2j7"></h3></div>

                    <div className="cell "  cellindex ='24'><h3 id="i3j0"></h3></div>
                    <div className="cell " cellindex ='25'><h3 id="i3j1"></h3></div>
                    <div className="cell "  cellindex ='26'><h3 id="i3j2"></h3></div>
                    <div className="cell "  cellindex ='27'><h3 id="i3j3"></h3></div>
                    <div className="cell "  cellindex ='28'><h3 id="i3j4"></h3></div>
                    <div className="cell "  cellindex ='29'><h3 id="i3j5"></h3></div>
                    <div className="cell "  cellindex ='30'><h3 id="i3j6"></h3></div>
                    <div className="cell"  cellindex ='31'><h3 id="i3j7"></h3></div>




                    <div className="cell "  cellindex ='32'><h3 id="i4j0"></h3></div>
                    <div className="cell " cellindex ='33'><h3 id="i4j1"></h3></div>
                    <div className="cell "  cellindex ='34'><h3 id="i4j2"></h3></div>
                    <div className="cell "  cellindex ='35'><h3 id="i4j3"></h3></div>
                    <div className="cell "  cellindex ='36'><h3 id="i4j4"></h3></div>
                    <div className="cell "  cellindex ='37'><h3 id="i4j5"></h3></div>
                    <div className="cell "  cellindex ='38'><h3 id="i4j6"></h3></div>
                    <div className="cell"  cellindex ='39'><h3 id="i4j7"></h3></div>
                    
                    <div className="cell "  cellindex ='40'><h3 id="i5j0"></h3></div>
                    <div className="cell " cellindex ='41'><h3 id="i5j1"></h3></div>
                    <div className="cell "  cellindex ='42'><h3 id="i5j2"></h3></div>
                    <div className="cell "  cellindex ='43'><h3 id="i5j3"></h3></div>
                    <div className="cell "  cellindex ='44'><h3 id="i5j4"></h3></div>
                    <div className="cell "  cellindex ='45'><h3 id="i5j5"></h3></div>
                    <div className="cell "  cellindex ='46'><h3 id="i5j6"></h3></div>
                    <div className="cell"  cellindex ='47'><h3 id="i5j7"></h3></div>
                    
                    <div className="cell "  cellindex ='48'><h3 id="i6j0"></h3></div>
                    <div className="cell " cellindex ='49'><h3 id="i6j1"></h3></div>
                    <div className="cell "  cellindex ='50'><h3 id="i6j2"></h3></div>
                    <div className="cell "  cellindex ='51'><h3 id="i6j3"></h3></div>
                    <div className="cell "  cellindex ='52'><h3 id="i6j4"></h3></div>
                    <div className="cell "  cellindex ='53'><h3 id="i6j5"></h3></div>
                    <div className="cell "  cellindex ='54'><h3 id="i6j6"></h3></div>
                    <div className="cell"  cellindex ='55'><h3 id="i6j7"></h3></div>

                    <div className="cell "  cellindex ='56'><h3 id="i7j0"></h3></div>
                    <div className="cell " cellindex ='57'><h3 id="i7j1"></h3></div>
                    <div className="cell "  cellindex ='58'><h3 id="i7j2"></h3></div>
                    <div className="cell "  cellindex ='59'><h3 id="i7j3"></h3></div>
                    <div className="cell "  cellindex ='60'><h3 id="i7j4"></h3></div>
                    <div className="cell "  cellindex ='61'><h3 id="i7j5"></h3></div>
                    <div className="cell "  cellindex ='62'><h3 id="i7j6"></h3></div>
                    <div className="cell"  cellindex ='63'><h3 id="i7j7"></h3></div>


                    </div>    
                
                
                :<></>
                    }
                
                
            </motion.div>

        </>

    );
}

export default SNQueens;