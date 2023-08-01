import { useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { animate, color, delay, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCross, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AlgoPer } from "../funcs/AlgoP";
import { algosData } from "../data/algos";

export default function UserDash() {
    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [uDY, setuDY] = useState();
    const [feedD, setFeedD] = useState();
    const navigate = useNavigate();
    const timer = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        const updateUser = async () => {
            await timer(300);
            await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/user/g`, {
                withCredentials: true
            })
                .then((data) => {
                    console.clear();
                    setuDY(data.data);
                    // console.log(data.data);
                })
                .catch((err) => {
                    console.clear();
                    var errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        console.log(errs[i]);
                    }
                    setuDY(false);
                })
        }
        updateUser();
    }, []);

    return (
        <>
            <Navbar />
            <div className="fullbg fullbgHOME dcontainer ">
                <section className="sectionsT">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {uDY ?
                            <>
                                <div className="divf divudInfo">
                                    <div className="uDashInfo">
                                        <p className="f2 cNavy"><b>Welcome {uDY.name}</b></p>
                                        <p className="f1-3"><b>{uDY.email}</b></p>
                                    </div>


                                    <div className="uDashInfo">
                                        <p className="f1-5 mUpM"><span style={{ color: "black" }}>Institute</span>: <b>{uDY.institute}</b></p>
                                        <p className="f1-5"><span style={{ color: "black" }}>Department</span>: <b>{uDY.department}</b></p>
                                    </div>
                                </div>


                                <div className="dividerT1 mUpS"></div>
                                {uDY.algoPerformed && uDY.algoPerformed.length > 0 ?

                                    <>
                                        <p className="mUpM f2">No. of Simulations Performed: {uDY.algoPerformed.length}</p>
                                    </>
                                    : <>
                                        <p className="mUpM f2">No. of Simulations Performed: 0</p>
                                    </>
                                }
                                <div className="ftContainer mUpM jusLeft">
                                    <table className="feedT">
                                        <thead className="bgHead">
                                            <tr>
                                                <th className="f1-2 bgHead"><span>Algorithm</span></th>
                                                <th className="f1-2 bgHead"><span>Performed</span></th>
                                                <th className="f1-2 bgHead"><span>Feedback</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {algosData.map((el, index) => {
                                                return (
                                                    <tr>
                                                        <td><b>{el}</b></td>
                                                        {uDY.algoPerformed.includes(el) ?
                                                            <td><FontAwesomeIcon icon={faCheck} /></td>
                                                            :
                                                            <td><FontAwesomeIcon icon={faXmark} /></td>
                                                        }
                                                        {uDY.feedP.includes(algosData[index]) ?
                                                            <td><FontAwesomeIcon icon={faCheck} /></td>
                                                            : <td><FontAwesomeIcon icon={faXmark} /></td>
                                                        }

                                                    </tr>
                                                )

                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <button onClick={() => { AlgoPer({ algoName: "N-Queens" }) }}>Submit</button> */}
                            </>
                            :
                            <div className="divf loader1">
                                <div class="lds-dual-ring"></div>
                            </div>
                        }
                    </motion.div>
                </section>

            </div >
            <Footer />
        </>

    );
}