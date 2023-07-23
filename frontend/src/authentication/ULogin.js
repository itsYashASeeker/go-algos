import axios from "axios";
import { useState } from "react"
import { Form, useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import "../css/Theory.css";
import "../css/login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { ErrNoti, SuccNoti } from "../funcs/swals";

export default function ULogin() {
    const [uemail, setuemail] = useState();
    const [password, setPassword] = useState();
    const [aEmail, setAEmail] = useState();
    const [aPassword, setAPassword] = useState();
    const navigate = useNavigate();

    const { userD } = AppState();

    const [uD, setUD] = userD;
    const [currLS, setCurrLS] = useState(false);

    async function doLogin(uData, uType) {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (!uData.email || !uData.password) {
            window.alert("Please fill all details");
            return;
        }
        // console.log(uData);
        try {
            const bId = uType === "user" ? "loginB" : "loginBA";
            retId(bId).setAttribute("disabled", "disabled");
            await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/` + uType + "/login", uData, {
                withCredentials: true
            }, config)
                .then((data) => {
                    console.clear();
                    const doN = async () => {
                        const resultS = await SuccNoti({ title: "Login successful!", message: "You are logged in successful" })
                        if (resultS.isConfirmed) {
                            navigate("/");
                        }
                        else {
                            window.location.reload();
                        }
                    }
                    doN();
                })
                .catch((err) => {
                    retId(bId).removeAttribute("disabled", "disabled");
                    console.clear();
                    if (!err.response) {
                        ErrNoti({ errMessage: "Some error occurred, Please try again!" })
                        return;
                    }
                    const errs = err.response.data.error;
                    ErrNoti({ errMessage: errs })
                })
        }
        catch (err) {
            console.clear();
            ErrNoti({ errMessage: "Some error occurred, Please try again!" })
        }
    }

    function subForm(e, tId) {
        var f = document.getElementsByTagName('form')[0];
        var uType = "user";
        var em = uemail;
        var pa = password;
        if (retId("loginBA")) {
            uType = "admin";
            em = aEmail;
            pa = aPassword;
        }
        // if (f.reportValidity()) {
        e.preventDefault();
        doLogin({
            email: em,
            password: pa,
        }, uType);
        // }
        // else {
        //     e.preventDefault();
        //     return;
        // }
    }

    useEffect(() => {
        if (uD) {
            navigate("/");
        }
    }, [uD]);

    function retId(idName) {
        return document.getElementById(idName);
    }

    useEffect(() => {
        if ((!uemail || !password) && retId("loginB")) {
            retId("loginB").setAttribute("disabled", "disabled");
        }
        if ((!aEmail || !aPassword) && retId("loginBA")) {
            retId("loginBA").setAttribute("disabled", "disabled");
        }
        // console.log(uemail, aEmail);
    }, [uemail, password, aEmail, aPassword]);

    const handleCh = (e, lId) => {
        var idn = e.target.id;
        var vv = e.target.value;

        if (!vv) {
            retId(idn).classList.remove("valid");
            retId(idn).classList.add("notValid");
            retId(lId).setAttribute("disabled", "disabled");
        }
        else {
            retId(idn).classList.add("valid");
            retId(idn).classList.remove("notValid");
            retId(lId).removeAttribute("disabled");
        }
    }

    useEffect(() => {
        if (!currLS) {
            retId("adminS").classList.remove("sel");
            retId("studentS").classList.add("sel");
            retId("loginB").setAttribute("disabled", "disabled");
            setuemail("");
            setPassword("");
            retId("iduemail").classList.remove("valid");
            retId("idpassword").classList.remove("valid");
        }
        else {
            retId("adminS").classList.add("sel");
            retId("studentS").classList.remove("sel");
            retId("loginBA").setAttribute("disabled", "disabled");
            setAEmail("");
            setAPassword("");
            retId("idAemail").classList.remove("valid");
            retId("idApassword").classList.remove("valid");
        }


    }, [currLS])


    return (
        <>
            <Navbar />
            <div className="fullbgHOME divf loginBG">
                <div className="divf loginCard">
                    <div className="lOptions">
                        <button id="studentS"
                            onClick={(e) => {
                                setCurrLS(false);
                            }}
                        >Student</button>
                        <button id="adminS"
                            onClick={(e) => {
                                setCurrLS(true);
                            }}
                        >Admin</button>
                    </div>
                    {currLS ?
                        <div id="adminForm">
                            <form className="divf logC" id="aForm">
                                <p className="f2"><b>Login Form(Admin)</b></p>
                                <div className="takeInD" id="adminI1">
                                    <input required pattern="[^ @]*@[^ @]*" value={aEmail} placeholder="email" type="email" id="idAemail" className="lIns" onChange={(e) => { setAEmail(e.target.value); handleCh(e, "loginBA") }} ></input>
                                    <b className="hideL">email</b>
                                </div>
                                <div>
                                    <div className="takeInD" id="adminI2 ">
                                        <input required id="idApassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={aPassword} placeholder="password" className="lIns" type="password" onChange={(e) => { setAPassword(e.target.value); handleCh(e, "loginBA") }} ></input>
                                        <b className="hideL">password</b>

                                    </div>
                                    <p className="pComment">Password must contain atleast one Uppercase/Lowercase letters and digit, and atleast 8 letters long</p>
                                </div>
                                <div className="divf ldivFUV">
                                    <button className="bNone" onClick={(e) => { e.preventDefault(); navigate("/login/forgot-password") }}>Forgot Password?</button>
                                </div>
                                <button type="submit" id="loginBA" className="goLogB" onClick={(e) => { subForm(e, e.target.id) }}>Login</button>
                                {/* <button className="bNone">Don't have an Account?</button> */}
                            </form>
                        </div>
                        :

                        <div id="userForm">
                            <form className="divf logC" id="uForm">
                                <p className="f2"><b>Login Form</b></p>
                                <div className="takeInD" id="userI1">
                                    <input required pattern="[^ @]*@[^ @]*" value={uemail} placeholder="email" type="email" id="iduemail" className="lIns" onChange={(e) => { setuemail(e.target.value); handleCh(e, "loginB") }} ></input>
                                    <b className="hideL">email</b>
                                </div>
                                <div>
                                    <div className="takeInD" id="userI2">
                                        <input required id="idpassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} placeholder="password" className="lIns" type="password" onChange={(e) => { setPassword(e.target.value); handleCh(e, "loginB") }} ></input>
                                        <b className="hideL">password</b>
                                    </div>
                                    <p className="pComment">Password must contain atleast one Uppercase/Lowercase letters and digit, and atleast 8 letters long</p>
                                </div>

                                <div className="divf ldivFUV">
                                    <button className="bNone" onClick={(e) => { e.preventDefault(); navigate("/login/forgot-password") }}>Forgot Password?</button>
                                    <button className="bNone" onClick={(e) => { e.preventDefault(); navigate("/register") }}>Don't have an Account?</button>
                                </div>
                                <button type="submit" id="loginB" className="goLogB" onClick={(e) => { subForm(e, e.target.id) }}>Login</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}