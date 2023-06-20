import React, { useEffect, useState } from "react";
import Multiprogressbar from "../components/progressbar";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import '../css/progressbar.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

export default function FLcs() {

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [Somaiyaemail, setSomaiyaEmail] = useState(null);
    const cd = new Date();
    const [date, setDate] = useState(
        `${cd.getDate()}/${cd.getMonth() + 1}/${cd.getFullYear()}`
    );

    const [designation, setDesignation] = useState(null);
    const [department, setDepartment] = useState(null);
    const [Quest1, setQuest1] = useState();
    const [Quest2, setQuest2] = useState();
    const [Quest3, setQuest3] = useState();
    const [Quest4, setQuest4] = useState();
    const [Quest5, setQuest5] = useState();
    const [Quest6, setQuest6] = useState("");
    const [Quest7, setQuest7] = useState("");
    const [institute, setInstitute] = useState(null);
    const { cuE, algoT } = AppState();

    const [currE, setCE] = cuE;
    const { userD } = AppState();
    const [uD, setUD] = userD;
    const algoName = expR[currE[0]][currE[1]][0];
    const [index, setIndex] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(cd.getMonth());
    }, [index])

    function nextbtn() {
        if (index >= 1) {

            console.log(index);
            setIndex(prevIndex => prevIndex + 1);
        }
    }

    function prevbtn() {
        if (index <= 3) {

            setIndex(prevIndex => prevIndex - 1);
            console.log(index);
        }
    }

    function reloadStates() {
        setIndex(1);
        setUsername(null);
        setEmail(null);
        setSomaiyaEmail(null);
        setDate(null);
        setDesignation(null);
        setDepartment(null);
        setQuest1(null);
        setQuest2(null);
        setQuest3(null);
        setQuest4(null);
        setQuest5(null);
        setQuest6("");
        setQuest7("");
        setInstitute(null);
    }

    async function submitFeed() {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const dataF = {
            algoName,
            institute,
            department,
            designation,
            q1: Quest1,
            q2: Quest2,
            q3: Quest3,
            q4: Quest4,
            q5: Quest5,
            q6: Quest6,
            q7: Quest7,
            dateP: date
        }
        try {
            await axios.post("http://localhost:5013/y/user/post/feedback", dataF, {
                withCredentials: true
            }, config)
                .then((data) => {
                    window.alert(data.data);

                    reloadStates();
                })
                .catch((err) => {
                    const errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        window.alert(errs[i]);
                    }
                })
        } catch (error) {
            window.alert(error);
        }
    }
    function naviTo(locName) {
        navigate("/" + locName);
    }
    function formm(step) {


        switch (step) {
            case 1:
                return (
                    <>
                        <div className="form">
                            <b style={{ marginBottom: "0.2rem", fontSize: '1.5rem', color: '#A02929', alignSelf: 'flex-start' }}>
                                Personal Details
                            </b>

                            <div style={{
                                marginBottom: "1.0rem",
                                fontSize: '1.2rem',
                                color: 'var(--primary)',
                                alignSelf: 'flex-start',
                                marginTop: "1.5rem"
                            }}>
                                Email ID<sup className="mandF">*</sup>
                            </div>
                            <input readOnly placeholder="Please Enter Personal Email ID" className="inputt" value={uD.email} onChange={(e) => { setEmail(e.target.value) }} required />



                            <div style={{
                                marginBottom: "1.0rem",
                                fontSize: '1.2rem',
                                color: 'var(--primary)',
                                alignSelf: 'flex-start',
                                marginTop: "1.5rem"
                            }}>
                                Name<sup className="mandF">*</sup>
                            </div>
                            <input readOnly value={uD.name} className="inputt" onChange={e => setUsername(e.target.value)} placeholder="Full Name" required />


                            <div style={{
                                marginBottom: "1.0rem",
                                fontSize: '1.2rem',
                                color: 'var(--primary)',
                                alignSelf: 'flex-start',
                                marginTop: "1.5rem"
                            }}>
                                Name Of the Institute<sup className="mandF">*</sup>
                            </div>
                            <input value={institute} className="inputt" onChange={e => setInstitute(e.target.value)} placeholder="Institute Name" required />

                            <div style={{
                                marginBottom: "1.0rem",
                                fontSize: '1.2rem',
                                color: 'var(--primary)',
                                alignSelf: 'flex-start',
                                marginTop: "1.5rem"
                            }}>
                                Department<sup className="mandF">*</sup>
                            </div>
                            <input value={department} className="inputt" onChange={e => setDepartment(e.target.value)} placeholder="Department Name" required />

                            <div style={{
                                marginBottom: "1.0rem",
                                fontSize: '1.2rem',
                                color: 'var(--primary)',
                                alignSelf: 'flex-start',
                                marginTop: "1.5rem"
                            }}>
                                Faculty/student/other<sup className="mandF">*</sup>

                            </div>
                            <input value={designation} className="inputt" onChange={e => setDesignation(e.target.value)} placeholder="Designation" required />


                            <div style={{
                                marginBottom: "1.0rem",
                                fontSize: '1.2rem',
                                color: 'var(--primary)',
                                alignSelf: 'flex-start',
                                marginTop: "1.5rem"
                            }}>
                                Date<sup className="mandF">*</sup>
                            </div>
                            <input readOnly type="text" value={date} className="inputt" onChange={e => setDate(e.target.value)} placeholder="Example: January 7, 2019" required />



                            <div className="formfooter">
                                {/* <button className="spec prev" disabled={index === 1} onClick={prevbtn} >Previous</button> */}
                                {institute && designation && department ?
                                    <button className="spec next" onClick={nextbtn}>Next</button>
                                    : <></>
                                }

                            </div>

                        </div>

                    </>

                );
            case 2:
                return (
                    <>

                        <div className="form">
                            {/* <div style={{ marginBottom: "0.2rem", fontSize: '1.5rem', color: '#A02929', alignSelf: 'flex-start' }}>
                                Award Catergory
                            </div> */}

                            <form action="#">
                                <div style={{ marginBottom: "1.0rem", fontSize: '1.2rem', color: 'var(--primary)', alignSelf: 'flex-start', marginTop: "1.5rem" }}>Name of the experiment performed </div>
                                <select name="yoa" id="yoa" style={{

                                    borderRadius: 5,
                                    width: "17rem",
                                    height: "2.0rem",
                                    color: "gray"
                                }}>
                                    {/* <option value="select">Select Award Category</option> */}
                                    <option value={algoName} >{algoName} Algorithm</option>
                                    {/* <option value="Promising Teacher of the Year (1 to 3 years of service)">Promising Teacher of the Year (1 to 3 years of service)</option> */}

                                </select>
                                <div style={{
                                    marginBottom: "1.0rem",
                                    fontSize: '1.2rem',
                                    color: 'var(--primary)',
                                    alignSelf: 'flex-start',
                                    marginTop: "1.5rem"
                                }}>
                                    1. Ease of understanding of concept using virtual lab.<sup className="mandF">*</sup>

                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q1" value="Excellent" onClick={() => { setQuest1("Excellent") }} required />
                                    <label for="html">Excellent</label><br />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q1" value="Good" onClick={() => { setQuest1("Good") }} required />
                                    <label for="html">Good</label><br />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q1" value="Fair" onClick={() => { setQuest1("Fair") }} required />
                                    <label for="html">Fair</label><br />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none", }} name="Q1" value="Bad" onClick={() => { setQuest1("Bad") }} required />
                                    <label for="html">Bad</label><br />
                                </div>

                                <div style={{
                                    marginBottom: "1.0rem",
                                    fontSize: '1.2rem',
                                    color: 'var(--primary)',
                                    alignSelf: 'flex-start',
                                    marginTop: "1.5rem"
                                }}>
                                    2. Simulation is easy and step by step.<sup className="mandF">*</sup>


                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q2" value="Yes" onClick={() => { setQuest2("Yes") }} required />
                                    <label for="html">Yes</label><br />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q2" value="Not Sure" onClick={() => { setQuest2("Not Sure") }} required />
                                    <label for="html">Not sure</label><br />
                                </div>


                                <div style={{
                                    marginBottom: "1.0rem",
                                    fontSize: '1.2rem',
                                    color: 'var(--primary)',
                                    alignSelf: 'flex-start',
                                    marginTop: "1.5rem"
                                }}>
                                    3. Relevant theory is provided for all experiments.<sup className="mandF">*</sup>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q3" value="Yes" onClick={() => { setQuest3("Yes") }} required />
                                    <label for="html">Yes</label><br />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q3" value="Not Sure" onClick={() => { setQuest3("Not Sure") }} required />
                                    <label for="html">Not sure</label><br />
                                </div>


                            </form>

                            <div className="formfooter">
                                <button className="spec prev" disabled={index === 1} onClick={prevbtn} >Previous</button>
                                {(Quest1 && Quest2 && Quest3) ? <button className="spec next" onClick={nextbtn}>Next</button>
                                    : <></>
                                }

                            </div>





                        </div>
                    </>
                );
            case 3:
                return (
                    <>

                        <div style={{
                            marginBottom: "1.0rem",
                            fontSize: '1.2rem',
                            color: 'var(--primary)',
                            alignSelf: 'flex-start',
                            marginTop: "1.5rem"
                        }}>
                            4. Operating the website is easy and convenient.<sup className="mandF">*</sup>

                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q4" value="Yes" onClick={() => { setQuest4("Yes") }} required />
                            <label for="html">Yes</label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q4" value="Not Sure" onClick={() => { setQuest4("Not Sure") }} required />
                            <label for="html">Not sure</label><br />
                        </div>

                        <div style={{
                            marginBottom: "1.0rem",
                            fontSize: '1.2rem',
                            color: 'var(--primary)',
                            alignSelf: 'flex-start',
                            marginTop: "1.5rem"
                        }}>
                            5. Any difficulties during performing the experiments.<sup className="mandF">*</sup>

                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q5" value="Yes" onClick={() => { setQuest5("Yes") }} required />
                            <label for="html">No</label><br />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="radio" style={{ fontSize: '3rem', marginTop: "1rem", width: "1em", background: "none" }} name="Q5" value="Not Sure" onClick={() => { setQuest5("Not Sure") }} required />
                            <label for="html">Yes</label><br />
                        </div>

                        <div style={{
                            marginBottom: "1.0rem",
                            fontSize: '1.2rem',
                            color: 'var(--primary)',
                            alignSelf: 'flex-start',
                            marginTop: "1.5rem"
                        }}>
                            6. Suggestions for further improvement
                        </div>
                        <textarea style={{ fontSize: '1rem', marginTop: "1rem", background: "none", padding: "0.5rem" }} onChange={e => setQuest6(e.target.value)} />


                        <div style={{
                            marginBottom: "1.0rem",
                            fontSize: '1.2rem',
                            color: 'var(--primary)',
                            alignSelf: 'flex-start',
                            marginTop: "1.5rem"
                        }}>
                            7. Experiment that can be added and not available in existing Algortithms VLAB.
                        </div>
                        <textarea style={{ fontSize: '1rem', marginTop: "1rem", background: "none", padding: "0.5rem" }} onChange={e => setQuest7(e.target.value)} />

                        {(Quest1 && Quest2 && Quest3 && Quest4 && Quest5) ?
                            <div className="formfooter">
                                <button className="spec prev" disabled={index === 1} onClick={prevbtn} >Previous</button>
                                <button className="spec next" type='submit' onClick={submitFeed}>Submit</button>
                            </div>
                            :
                            <>
                                <div className="formfooter">
                                    <button className="spec prev" disabled={index === 1} onClick={prevbtn} >Previous</button>
                                </div>
                                <p>*Please fill mandatory fields</p>
                            </>
                        }
                    </>
                );
            default:
                return (
                    <><h1>some error</h1></>
                );


        }

    }
    return (
        <>
            <Navbar />
            <FNavbar />
            {uD ?
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <div
                        className="feedDiv"
                    >
                        <Multiprogressbar steps={index} />
                        <b style={{ fontSize: "2rem", marginBottom: "1.5rem", marginTop: "2rem", justifySelf: "center", alignSelf: "center" }} className="hightText">
                            {algoName} Feedback
                        </b>
                        {formm(index)}


                    </div>

                </div>
                :
                <div className="fullbg">
                    <h1>Please Login to Fill the feedback!</h1>
                </div>
            }
            <Footer />
        </>
    )
}