import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { motion } from "framer-motion";
import Footer from "../components/Footer.js";
import kss1 from "../img/knapsack/kss1.jpeg"
import rkp2 from "../img/rabinkarp/rkp2.jpeg"
import rkp3 from "../img/rabinkarp/rkp3.jpeg"

export default function KnapsackTheory() {

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
                            <b className="hightText1">Dynamic Programming</b>is defined as a computer programming technique where an algorithmic problem is first broken down into sub-problems, the results are saved, and then the sub-problems are optimized to find the overall solution
                        </p>
                        
                        <p className="f1-5 mUpL">
                            <b className="hightText">Knapsack(0/1) Algorithm</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                The 0/1 knapsack problem means that the items are either completely or no items are filled in a knapsack</li>
                            </ol>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Theory</b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <div className="mUpL"></div>
                                
                                    <p className="mUpM">Here knapsack is like a container or a bag. Suppose we have given some items which have some weights or profits. We have to put some items in the knapsack in such a way total value produces a maximum profit.</p>
                                    <p className="mUpM">

                                        <ul>
                                            <li>As the name suggests, items are indivisible here.</li>
                                            <li>We can not take the fraction of any item.</li>
                                            <li>We have to either take an item completely or leave it completely.</li>
                                            <li>It is solved using dynamic programming approach.</li>
                                        </ul>
                                    </p>
                                    <p className="mUpM">For example, the weight of the container is 20 kg. We have to select the items in such a way that the sum of the weight of items should be either smaller than or equal to the weight of the container, and the profit should be maximum.</p>
                                            
                                    <div className="f1">
                                    {/* <img className="navImg" src={Fst2}></img> */}
                                    <p className="mUpM">Consider-<br/>
                                    Knapsack weight capacity = w<br/>
                                    Number of items each having some weight and value = n<br/>
                                    Step-01:<br/>
                                    Draw a table say ‘T’ with (n+1) number of rows and (w+1) number of columns.<br/>
                                    Fill all the boxes of 0th row and 0th column with zeroes as shown-<br/></p>
                                   
                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5em"}} >
                                    
                                    <img className="navImg" style={{width:"55vw"}} src={kss1}></img>
                                    </div>  
                                    <p className="mUpM">Step-02:<br/>
                                    Start filling the table row wise top to bottom from left to right.<br/>
                                    Use the following formula-<br/>
                                    T (i , j) = max [ T ( i-1 , j ) , valuei + T( i-1 , j – weighti ) ]<br/>
                                    Here, T(i , j) = maximum value of the selected items if we can take items 1 to i and have weight restrictions of j.<br/>
                                    This step leads to completely filling the table.<br/>
                                    Then, value of the last box represents the maximum possible value that can be put into the knapsack.<br/>
                                    
                                    </p>

                                    <p className="mUpM">Step-03:<br/>
                                    <ul>
                                            <li>Consider the last column of the table.</li>
                                            <li>Start scanning the entries from bottom to top.</li>
                                            <li>On encountering an entry whose value is not same as the value stored in the entry immediately above it, mark the row label of that entry.</li>
                                            <li>After all the entries are scanned, the marked labels represent the items that must be put into the knapsack.</li>
                                        </ul>
                                    
                                    </p>
                                    

                                    </div>
                                    
                                    

                                </li>
                                
                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Algorithm </b>
                                    <div className="Highlightbox" style={{backgroundColor:"#ffded1",display:"flex",alignItems:"center",padding:"1.5em"}}>
                                    <div>


                                    <p className="mUpM">
                                    Dynamic-0-1-knapsack (v, w, n, W)<br/>
                                    for w = 0 to W do<br/>
                                    &nbsp;&nbsp;c[0, w] = 0<br/>
                                    for i = 1 to n do<br/>
                                    &nbsp;&nbsp;c[i, 0] = 0<br/>
                                    for w = 1 to W do<br/>
                                    &nbsp;&nbsp;    if wi ≤ w then<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;        if vi + c[i-1, w-wi] then<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            c[i, w] = vi + c[i-1, w-wi]<br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;        else c[i, w] = c[i-1, w]<br/>
                                    &nbsp;&nbsp;    else<br/>
                                    &nbsp;&nbsp; &nbsp;       c[i, w] = c[i-1, w]<br/>
                                    
                                    </p>
                                    </div>
                                    </div>
                                    
                                    
                                    
                                </li>
                                <li>
                                    <div className="mUpL"></div>
                                    <div className="mUpL"></div>
                                    <b>Time Complexity</b>
                                    <p className="mUpM">This algorithm takes Ɵ(n.w) times as table c has (n+1).(w+1) entries, where each entry requires Ɵ(1) time to compute.</p>
                                    
                                    
                                   
                                </li>
                            </ol>

                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of Dynamic Programming</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                machine scheduling
                                </li>
                                <li>
                                space allocation
                                </li>
                                <li>
                                asset optimization
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