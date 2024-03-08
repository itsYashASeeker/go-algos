import { useNavigate } from "react-router-dom";
import { AppState } from "../../context/appContext";
import { useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useState } from "react";
import "../../css/dash.css";
import Footer from "../Footer";
import download from "downloadjs";

export default function AFeedbacks() {
    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [uD, setUD] = userD;

    const [fData, setFData] = useState();
    const timer = ms => new Promise(res => setTimeout(res, ms));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeeds = async () => {
            await timer(200);
            await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/admin/dash`, {
                withCredentials: true
            })
                .then((data) => {
                    console.clear();
                    setFData(data.data);
                })
                .catch((err) => {
                    console.clear();
                    var errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        console.log(errs[i]);
                    }
                });
        }

        fetchFeeds();
    }, []);


    const downEx = async () => {
        try {
            const authA = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/admin/auth`, { withCredentials: true })
                .then(async (data) => {
                    console.clear();
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/admin/exportE`)
                    const blob = await res.blob();
                    download(blob, 'exportd.xlsx');
                })
                .catch((err) => {
                    console.clear();
                })
        } catch (error) {
            console.clear();
        }

    }

    return (
        <>
            <Navbar />
            <div className="fullbgHOME dashBg">
                {uD ?
                    <section className="divf dashS1">
                        <p className="f2 cNavy tCenter"><b>Welcome {uD.name}[Admin]</b></p>
                        <p className="f1-3"><b>{uD.email}</b></p>
                        <div className="divf mUpL">
                            <button className="spec" onClick={() => { navigate("/admin/user-details") }}>User Details</button>
                            <button className="spec" onClick={() => { navigate("/admin/feedbacks") }}>Feedback</button>
                        </div>
                        <div className="divider"></div>
                        <p className="f3 mUpL"><b>Feedbacks</b></p>

                        {fData ?
                            <>
                                <p className="f1-5 mUpM"><b>Total Feedbacks: {fData.length}</b></p>
                                <button className="spec floR mUpL" onClick={() => { downEx() }}>Download Excel</button>
                                <div id="feedbackT" className="ftContainer mUpM">
                                    <table className="feedT">
                                        <thead>
                                            <tr>
                                                <th className="f1-2 bgHead"><span>Sr.No.</span></th>
                                                <th className="f1-2 bgHead"><span>Name</span></th>
                                                <th className="f1-2 bgHead"><span>Email</span></th>
                                                <th className="f1-2 bgHead"><span>Date</span></th>
                                                <th className="f1-2 bgHead"><span>Institute</span></th>
                                                <th className="f1-2 bgHead"><span>Department</span></th>
                                                <th className="f1-2 bgHead"><span>Designation</span></th>
                                                <th className="f1-2 bgHead"><span>Algorithm</span></th>
                                                <th className="f1-2 bgHead"><span>Ease of understanding of concept using virtual lab</span></th>
                                                <th className="f1-2 bgHead"><span>Simulation is easy and step by step</span></th>
                                                <th className="f1-2 bgHead"><span>Relevant theory is provided for all experiments</span></th>
                                                <th className="f1-2 bgHead"><span>Operating the website is easy and convenient </span></th>
                                                <th className="f1-2 bgHead"><span>Any difficulties during performing the experiments?</span></th>
                                                <th className="f1-2 bgHead"><span>Suggestions for further improvement </span></th>
                                                <th className="f1-2 bgHead"><span>Experiment that can be added and not available in existing Algorithms VLAB.</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fData && fData.map((el, index) => {
                                                return <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{el.userId.name}</td>
                                                    <td>{el.userId.email}</td>
                                                    <td>{el.dateP}</td>
                                                    <td>{el.institute}</td>
                                                    <td>{el.department}</td>
                                                    <td>{el.designation}</td>
                                                    <td>{el.algoName}</td>
                                                    <td>{el.q1}</td>
                                                    <td>{el.q2}</td>
                                                    <td>{el.q3}</td>
                                                    <td>{el.q4}</td>
                                                    <td>{el.q5}</td>
                                                    <td>{el.q6}</td>
                                                    <td>{el.q7}</td>
                                                </tr>
                                            })
                                            }
                                        </tbody>
                                    </table>


                                </div>
                            </>
                            :
                            <div className="divf loader1">
                                <div class="lds-dual-ring"></div>
                            </div>
                        }
                    </section>

                    :
                    <></>
                }
            </div>
            <Footer />
        </>

    );
}