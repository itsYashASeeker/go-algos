import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { motion } from "framer-motion";
import Footer from "../components/Footer.js";
import queen4 from "../img/nqueens/4queen.png"
import Fst1 from "../img/nqueens/4st1.jpg"

import allst from "../img/nqueens/allstep4.webp"
import queen8 from "../img/nqueens/8queen.png"

export default function NqueensTheory() {

    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink);
    }

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg fullbgHOME dcontainer">
                <section className="sectionsT mUpL">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">Back-Tracking</b> is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time by time, here, is referred to the time elapsed till reaching any level of the search tree.
                        </p>
                        
                        <p className="f1-5 mUpL">
                            <b className="hightText">NQueens Problem</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                The N Queen is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other.
                                </li>
                            </ol>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Mainly Nqueens Problem is Shown using 4x4 and 8x8 chessboard</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <div className="mUpL"></div>
                                    <b>4X4 Queen</b>
                                    <p className="mUpM">Consider a 4*4 chessboard. Let there are 4 queens. The objective is place there 4 queens on 4*4
                                            chessboard in such a way that no two queens should be placed in the same row, same column or diagonal
                                            position.</p>
                                            <p className="mUpM">
                                            The explicit constraints are 4 queens are to be placed on 4*4 chessboards. The implicit constraints are no
                                            two queens are in the same row, column, or diagonal. Let x1, x2, x3, x4 be the solution vector where x1
                                            column on which the queen i is placed. First queen is placed in first row and first column. </p>
                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5em"}} >

                                            
                                            <img className="navImg" src={Fst1}></img>
                                            </div>
                                    <div className="f1">
                                    <p className="mUpM">
                                    The second queen should not be in first row and second column. It should be placed in second
                                    row and in second, third or fourth column. It we place in second column, both will be in same
                                    diagonal, so place it in third column.. </p>
                                    {/* <img className="navImg" src={Fst2}></img> */}
                                    <p className="mUpM">
                                    We are unable to place queen 3 in third row, so go back to queen 2 and place it some where - else </p>
                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5em"}} >

                                    <img className="navImg" style={{width:"55vw"}} src={allst}></img>
                                    </div>


                                    </div>
                                    <div className="mUpM">
                                    <p>So finally Solution</p>
                                    <img className="navImg" style={{width:"55vw",height:"15rem"}} src={queen4}></img>
                                    </div>
                                    

                                </li>
                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>8X8 Queens</b>
                                    <p className="mUpM">A classic combinatorial problem is to place 8 queens on a 8*8 chess board so that no two attack, i.,e no
                                    two queens are to the same row, column or diagonal.</p>
                                                                        <p className="mUpM">Now, we will solve 8 queens problem by using similar procedure adapted for 4 queens problem.
                                    The algorithm of 8 queens problem can be obtained by placing n=8, in N queens algorithm.</p>
                                                                        <p className="mUpM">If two queens are placed at positions (i,j) and (k,l). They are on the same diagonal
                                    only if
                                    i-j=k-l (1)
                                    or
                                    i+j=k+l (2).
                                    From (1) and (2) implies j-l=i-k and j-l=k-i
                                    Two queens lie on the same diagonal iff |j-l|=|i-k|
                                    The solution of 8 queens problem can be obtained similar to the solution of 4 queens.</p>
                                    
                                    <div className="mUpM" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5em"}}>
                                    <img className="navImg" style={{margin:"auto"}} src={queen8}></img>
                                    </div>
                                </li>
                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Algorithm </b>
                                    <div className="Highlightbox" style={{backgroundColor:"#ffded1",display:"flex",alignItems:"center",padding:"1.5em"}}>
                                    <div>


                                    <p className="mUpM">
                                    function solveNQueens(board, col, n):<br/>
                                    if col greater that equal to  n:<br/>
                                    &nbsp; &nbsp;  print board<br/>
                                    &nbsp; &nbsp;    return true<br/>
                                    for row from 0 to n-1:<br/>
                                    &nbsp;    if isSafe(board, row, col, n):<br/>
                                    &nbsp; &nbsp;        board[row][col] = 1<br/>
                                    &nbsp; &nbsp;        if solveNQueens(board, col+1, n):<br/>
                                    &nbsp; &nbsp; &nbsp;            return true<br/>
                                    &nbsp; &nbsp;        board[row][col] = 0<br/>
                                    return false<br/>

                                    function isSafe(board, row, col, n):<br/>
                                    &nbsp;    for i from 0 to col-1:<br/>
                                    &nbsp;    if board[row][i] == 1:<br/>
                                    &nbsp; &nbsp;        return false<br/>
                                    &nbsp;    for i,j from row-1, col-1 to 0, 0 by -1:<br/>
                                    &nbsp; &nbsp;        if board[i][j] == 1:<br/>
                                    &nbsp; &nbsp;&nbsp;            return false<br/>
                                    &nbsp;    for i,j from row+1, col-1 to n-1, 0 by 1, -1:<br/>
                                    &nbsp; &nbsp;        if board[i][j] == 1:<br/>
                                    &nbsp; &nbsp;&nbsp;            return false<br/>
                                    &nbsp;    return true<br/>

                                    board = empty NxN chessboard<br/>
                                    solveNQueens(board, 0, N)
                                    </p>
                                    </div>
                                    </div>
                                    
                                    
                                    
                                </li>
                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Time Complexity</b>
                                    <p className="mUpM">The method takes O(n) time
for each invocation of loop in it runs for O(n) time
Method is recursive and adding this up, the recurrence relation is:</p>
                                    <p className="mUpM">T(n) = O(n^2) + n * T(n-1).</p>
                                    <p className="mUpM">solving the above recurrence by iteration or recursion tree, the time complexity of the nQueen problem is =
O(N!)</p>
                                    
                                   
                                </li>
                            </ol>

                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of Dynamic Programming</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                road network
                                </li>
                                <li>
                                railway network 
                                </li>
                                <li>
                                airline network 
                                </li>
                                
                                
                            </ul>
                        </p>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    )
}