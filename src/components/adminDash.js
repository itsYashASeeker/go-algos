import { useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";
import "../css/dash.css"
import Footer from "./Footer";
import download from "downloadjs";

export default function AdminDash() {
    const { cuE, algoT, userD } = AppState();
    const [currE, setCE] = cuE;
    const [algoTC, setAlgoT] = algoT;
    const [uD, setUD] = userD;

    const [fData, setFData] = useState();

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!uD || uD.isAdmin === false) {
    //         // 
    //     }
    //     else {
    const fetchFeeds = async () => {
        await axios.get("http://localhost:5013/y/admin/dash", {
            withCredentials: true
        })
            .then((data) => {
                // console.log(data.data);
                setFData(data.data);
            })
            .catch((err) => {

            });
    }
    fetchFeeds();
    // }
    // }, uD)

    const downEx = async () => {
        try {
            const res = await fetch("http://localhost:5013/y/admin/exportE")
            const blob = await res.blob();
            download(blob, 'exportd.xlsx');
        } catch (error) {
            // 
        }

    }

    return (
        <>
            <Navbar />
            <div className="dashBg">
                {uD ?
                    <section className="divf dashS1">
                        <h1>
                            Welcome {uD.name}[Admin]
                        </h1>
                        <button className="spec floR" onClick={() => { downEx() }}>Download Excel</button>
                        <div className="ftContainer">
                            <table className="feedT">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Institute</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Algorithm</th>
                                    <th>Ease of understanding of concept using virtual lab</th>
                                    <th>Simulation is easy and step by step</th>
                                    <th>Relevant theory is provided for all experiments</th>
                                    <th>Operating the website is easy and convenient </th>
                                    <th>Any difficulties during performing the experiments?</th>
                                    <th>Suggestions for further improvement </th>
                                    <th>Experiment that can be added and not available in existing Algorithms VLAB.</th>
                                </tr>
                                {fData && fData.map((el) => {
                                    return <tr>
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
                                })}
                            </table>
                        </div>
                    </section>

                    :
                    <></>
                }
            </div>
            <Footer />
        </>

    );
}