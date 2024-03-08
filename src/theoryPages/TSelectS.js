import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";

export default function TSelectS() {
    const navigate = useNavigate();

    const { cuE, algoT } = AppState();

    const [currE, setCE] = cuE;

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
                            <b className="hightText1">Selection sort</b> is an efficient sorting algorithm that repeatedly checks and selects the smallest (or largest) element from the unsorted portion of the list and moves it to the sorted portion of the list.
                        </p>
                        <button className="goToSim mUpL" onClick={() => { naviTo(expR[currE[0]][currE[1]][1]) }}>Go to Simulator</button>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Algorithm for Selection Sort</b>
                            <ul className=" algorithm intro f1-3 mUpM">
                                <li>
                                    <b>Step 1. </b>Repeat Steps 2 to 6 for i = 0 to n-1
                                </li>
                                <li className="mUpS">
                                    <b>Step 2. </b>Copy, min {"<-"} i
                                </li>
                                <li className="mUpS">
                                    <b>Step 3. </b>Repeat Steps 4 to 5 for j=i+1 to n-1
                                </li>
                                <li className="mUpS">
                                    <b>Step 4. </b>if({"array[j]<array[min]"}) then do Step5:
                                </li>
                                <li className="mUpS">
                                    <b>Step 5. </b>Copy, min {"<-"} j
                                </li>
                                <li className="mUpS">
                                    <b>Step 6. </b>Swap {"array[min] <-> array[i]"}
                                </li>
                            </ul>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText">Example</b>
                            <div className="mUpL mLeS">
                                <p className="f1-3">
                                    Let's illustrate the selection sort algorithm step-by-step using
                                    an example array [10 , 7, 11, 5, 4, 6]:
                                </p>
                                <ul className="mUpM f1-2">
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 1: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=1,min=0</p>
                                            <p className="mUpS">Compare: [<b className="hightText3">10</b>, <b className="hightText4">7</b>, 11, 5, 4, 6]</p>
                                            <p className="mUpS hightText">{"array[j]<array[min]"}, min = j</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 2: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=2,min=1</p>
                                            <p className="mUpS">Compare: [10, <b className="hightText3">7</b>, <b className="hightText4">11</b>, 5, 4, 6]</p>
                                            <p className="mUpS hightText">min is not updated</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 3: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=3,min=1</p>
                                            <p className="mUpS">Compare: [10, <b className="hightText3">7</b>, 11, <b className="hightText4">5</b>, 4, 6]</p>
                                            <p className="mUpS hightText">{"array[j]<array[min]"}, min = j</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 4: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=4,min=3</p>
                                            <p className="mUpS">Compare: [10, 7, 11, <b className="hightText3">5</b>, <b className="hightText4">4</b>, 6]</p>
                                            <p className="mUpS hightText">{"array[j]<array[min]"}, min = j</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 5: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=0</b>
                                            <p className="mUpS">j=5,min=4</p>
                                            <p className="mUpS">Compare: [10, 7, 11, 5, <b className="hightText3">4</b>, <b className="hightText4">6</b>]</p>
                                            <p className="mUpS hightText">{"array[j]<array[min]"}, min = j</p>
                                            <div className="note mUpS">
                                                <p className="mUpS">Since, j==n-1.</p>
                                                <p className="mUpS">Swap array[i] and array[min]</p>
                                            </div>
                                            <p className="mUpS hightText3">After swapping: [4, 7, 11, 5, 10, 6]</p>
                                            <p className="mUpS"><b>i is incremented</b></p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <b className="f1-4">Similarly, we do it for i=1,2,3,4,5</b>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 6: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=1</b>
                                            <p className="mUpS hightText3">After swapping: [4, 5, 11, 7, 10, 6]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 7: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=3</b>
                                            <p className="mUpS hightText3">After swapping: [4, 5, 6, 7, 10, 11]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 8: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=4</b>
                                            <p className="mUpS hightText3">No changes: [4, 5, 6, 7, 10, 11]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <div>
                                            <b>Step 9: </b>
                                        </div>
                                        <div className="mLeS">
                                            <b className="hightText2 f1-3">Loop: i=5</b>
                                            <p className="mUpS hightText3">No changes: [4, 5, 6, 7, 10, 11]</p>
                                        </div>
                                    </li>
                                    <li className="mUpM dflex egCol">
                                        <b className="hightText3 f1-5">Sorted array: [4, 5, 6, 7, 10, 11]</b>
                                    </li>
                                </ul>
                            </div>


                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Advantages of Selection Sort</b>
                            <ol className="mUpM f1-3 ols">
                                <li className="mUpM">
                                    It performs very well on small lists
                                </li>
                                <li className="mUpM">
                                    It is an in-place algorithm. It does not require a lot of space for sorting. Only one extra space is required for holding the temporal variable.
                                </li>
                                <li className="mUpM">
                                    It performs well on items that have already been sorted.
                                </li>
                            </ol>
                        </div>
                        <div className="f1-5 mUpL">
                            <b className="hightText f1-5">Disadvantages of Selection Sort</b>
                            <ol className="mUpM ols f1-3 ">
                                <li className="mUpM">
                                    It performs poorly when working on huge lists.
                                </li>
                                <li className="mUpM">
                                    The number of iterations made during the sorting is n-squared, where n is the total number of elements in the list.
                                </li>
                                <li className="mUpM">
                                    Other algorithms, such as quicksort, have better performance compared to the selection sort.
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
