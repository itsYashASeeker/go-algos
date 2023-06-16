import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";

export default function TBubbleS() {
    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink + "/simulator");
    };

    return (
        <>
            <Navbar />
            <FNavbar />
            <div className="fullbg fullbgHOME dcontainer ">
                <section className="sectionsT mUpL">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">Bubble Sort</b> is the simplest type of sorting algorithm that repeatedly checks and swaps the adjacent elements if they are in the wrong order.
                        </p>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Algorithm for Bubble Sort</b>
                            <ul className=" algorithm intro f1-3 mUpM">
                                <li>
                                    <b>Step 1. </b>Repeat Steps 2 to 4 for i = 0 to n-1
                                </li>
                                <li className="mUpS">
                                    <b>Step 2. </b>Repeat Steps 3 to 4 for j=0 to n-i-2
                                </li>
                                <li className="mUpS">
                                    <b>Step 3. </b>if({"array[j]>array[j+1]"}) then do Step4:
                                </li>
                                <li className="mUpS">
                                    <b>Step 4. </b>Swap {"array[j] <-> array[j+1]"}
                                </li>
                            </ul>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Example</b>
                            <div className="mUpL mLeS">
                                <p className="f1-3">
                                    Let's illustrate the bubble sort algorithm step-by-step using
                                    an example array [10 , 7, 11, 5, 4, 6]:
                                </p>
                                <ul className="mUpM f1-2">
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 1: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=0</p>
                                            <p className="mUpS">Compare: [<b className="hightText3">10</b>, <b className="hightText4">7</b>, 11, 5, 4, 6]</p>
                                            <p className="mUpS hightText">{"array[j]>array[j+1]"}, do swapping</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 2: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=1</p>
                                            <p className="mUpS">Compare: [7, <b className="hightText3">10</b>, <b className="hightText4">11</b>, 5, 4, 6]</p>
                                            <p className="mUpS hightText">{"array[j]>array[j+1]"} not satsified</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 3: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=2</p>
                                            <p className="mUpS">Compare: [7, 10, <b className="hightText3">11</b>, <b className="hightText4">5</b>, 4, 6]</p>
                                            <p className="mUpS hightText">{"array[j]>array[j+1]"}, do swapping</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 4: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=3</p>
                                            <p className="mUpS">Compare: [7, 10, 5, <b className="hightText3">11</b>, <b className="hightText4">4</b>, 6]</p>
                                            <p className="mUpS hightText">{"array[j]>array[j+1]"}, do swapping</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 5: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=4</p>
                                            <p className="mUpS">Compare: [7, 10, 5, 4, <b className="hightText3">11</b>, <b className="hightText4">6</b>]</p>
                                            <p className="mUpS hightText">{"array[j]>array[j+1]"}, do swapping</p>
                                            <div className="note mUpS">
                                                <p className="mUpS">Since, j==n-i-2.</p>
                                            </div>
                                            <p className="mUpS hightText3">After swapping: [7, 10, 5, 4, 6, 11]</p>
                                            <p className="mUpS"><b>i is incremented</b></p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <b className="f1-4">Similarly, we do it for i=1,2,3,4,5</b>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 7: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=1</b>
                                            <p className="mUpS hightText3">After swapping: [ 7, 5, 4, 6, 10, 11 ]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 8: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=3</b>
                                            <p className="mUpS hightText3">After swapping: [ 5, 4, 6, 7, 10, 11 ]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 9: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=4</b>
                                            <p className="mUpS hightText3">No changes: [ 4, 5, 6, 7, 10, 11 ]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 10: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=5</b>
                                            <p className="mUpS hightText3">After swapping: [ 4, 5, 6, 7, 10, 11 ]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <b className="hightText3 f1-5">Sorted array: [ 4, 5, 6, 7, 10, 11 ]</b>
                                    </li>
                                </ul>
                            </div>


                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Advantages of Bubble Sort</b>
                            <ol className="mUpM f1-3 ols">
                                <li className="mUpM">
                                    Easy to read and implement
                                </li>
                                <li className="mUpM">
                                    Elements are only swapped, and no other addtional temporary memory is used
                                </li>
                            </ol>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Disadvantages of Bubble Sort</b>
                            <ol className="mUpM ols f1-3 ">
                                <li className="mUpM">
                                    Does not deal well with a list containing a huge number of items
                                </li>
                                <li className="mUpM">
                                    Compares every element n<sup>2</sup> times
                                </li>
                            </ol>
                        </div>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    );
}
