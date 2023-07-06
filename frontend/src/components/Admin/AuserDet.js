import { useNavigate } from "react-router-dom";
import { AppState } from "../../context/appContext";
import { useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useState } from "react";
import "../../css/dash.css";
import Footer from "../Footer";
import download from "downloadjs";

export default function AUserDet() {
    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [uD, setUD] = userD;

    const [uData, setuData] = useState();
    const timer = ms => new Promise(res => setTimeout(res, ms));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserD = async () => {
            await timer(200);
            await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/admin/dash/user-details`, {
                withCredentials: true
            })
                .then((data) => {
                    console.clear();
                    setuData(data.data);

                })
                .catch((err) => {
                    console.clear();
                    var errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        console.log(errs[i]);
                    }
                });
        }

        fetchUserD();
    }, []);


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
                        <p className="f3 mUpL"><b>User Details</b></p>

                        {uData ?
                            <>
                                <p className="f1-5 mUpM"><b>Total Registered Users: {uData.length}</b></p>
                                <div className="ftContainer divf AuserD mUpM">
                                    <table className="feedT">
                                        <thead className="bgHead">
                                            <tr>
                                                <th className="f1-2 bgHead"><span>Sr.No</span></th>
                                                <th className="f1-2 bgHead"><span>Email</span></th>
                                                <th className="f1-2 bgHead"><span>Username</span></th>
                                                <th className="f1-2 bgHead"><span>Algorithms Performed</span></th>
                                                <th className="f1-2 bgHead"><span>Feedbacks Filled</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {uData && uData.map((el, index) => {
                                                return <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{el.email}</td>
                                                    <td>{el.username}</td>
                                                    <td>
                                                        {el.algoPerformed && el.algoPerformed.map((alN, index) => {
                                                            if (index === el.algoPerformed.length - 1) {
                                                                return (
                                                                    <>{alN}. <b>[{el.algoPerformed.length}]</b></>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <>{alN}, </>
                                                                )
                                                            }
                                                        })
                                                        }
                                                    </td>
                                                    <td>
                                                        {el.feedP && el.feedP.map((alN, index) => {
                                                            if (index === el.feedP.length - 1) {
                                                                return (
                                                                    <>{alN}. <b>[{el.feedP.length}]</b></>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <>{alN}, </>
                                                                )
                                                            }
                                                        })
                                                        }
                                                    </td>


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