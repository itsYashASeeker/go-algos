
import { useNavigate } from "react-router-dom";
import { AppState } from "../../context/appContext";
import { useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useState } from "react";
import "../../css/dash.css";
import Footer from "../Footer";
import download from "downloadjs";
import PageNotFound from "../NotFound";

export default function DAdmins() {
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
            await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/admin/dash/fetch-admins`, {
                withCredentials: true
            })
                .then((data) => {
                    // console.clear();
                    setFData(data.data);
                })
                .catch((err) => {
                    // console.clear();
                    var errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        console.log(errs[i]);
                    }
                });
        }

        fetchFeeds();
    }, []);

    return (
        <>


            {uD.isMAdmin ?
                <>
                    <Navbar />
                    <div className="fullbgHOME dashBg">

                        <section className="divf dashS1">
                            <p className="f2 cNavy tCenter"><b>Welcome {uD.name}[Admin]</b></p>
                            <p className="f1-3"><b>{uD.email}</b></p>
                            <div className="ftContainer mUpM AuserD">
                                <table className="adTable">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fData && fData.map((el) => {
                                            return (
                                                <tr>
                                                    <td>{el.email}</td>
                                                    <td>{el.name}</td>
                                                    <td>{el.username}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                    <Footer />
                </>
                :
                <PageNotFound />
            }

        </>

    );
}