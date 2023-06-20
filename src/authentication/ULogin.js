import axios from "axios";
import { useState } from "react"
import { Form, useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import "../css/Theory.css";
import "../css/login.css";
import Navbar from "../components/Navbar";

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
        console.log(uData);
        try {
            await axios.post("http://localhost:5013/y/" + uType + "/login", uData, {
                withCredentials: true
            }, config)
                .then((data) => {
                    // console.log(data);
                    window.location.reload();
                    window.alert("Login successful");
                    
                })
                .catch((err) => {
                    const errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        window.alert(errs[i]);
                    }
                })
        }
        catch (err) {
            window.alert(err);
        }
    }

    function subForm(tId) {
        if (uemail.includes("@") && retId("loginB")) {
            doLogin({
                email: uemail,
                password: password
            }, "user");
        }
        else if (aEmail.includes("@") && retId("loginBA")) {
            doLogin({
                email: aEmail,
                password: aPassword,
            }, "admin");
        }
        else {
            return;
        }
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
            setuemail("");
            setPassword("");
            retId("iduemail").classList.remove("valid");
            retId("idpassword").classList.remove("valid");
        }
        else {
            retId("adminS").classList.add("sel");
            retId("studentS").classList.remove("sel");
            setAEmail("");
            setAPassword("");
            retId("idAemail").classList.remove("valid");
            retId("idApassword").classList.remove("valid");
        }
    }, [currLS])


    return (
        <>
            <Navbar />
            <div className="divf loginBG">
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
                                <p className="f2"><b>Admin Login</b></p>
                                <div className="takeInD" id="adminI1">
                                    <input required pattern="[^ @]*@[^ @]*" value={aEmail} placeholder="email" type="email" id="idAemail" className="lIns" onChange={(e) => { setAEmail(e.target.value); handleCh(e, "loginBA") }} ></input>
                                    <b className="hideL">email</b>
                                </div>
                                <div className="takeInD" id="adminI2 ">
                                    <input required id="idApassword" value={aPassword} placeholder="password" className="lIns" type="password" onChange={(e) => { setAPassword(e.target.value); handleCh(e, "loginBA") }} ></input>
                                    <b className="hideL">password</b>
                                </div>

                                <button type="submit" id="loginBA" className="goLogB" onClick={(e) => { subForm(e.target.id) }}>Login</button>
                                {/* <button className="bNone">Don't have an Account?</button> */}
                            </form>
                        </div>
                        :

                        <div id="userForm">
                            <form className="divf logC" id="uForm">
                                <p className="f2"><b>User Login</b></p>
                                <div className="takeInD" id="userI1">
                                    <input required pattern="[^ @]*@[^ @]*" value={uemail} placeholder="email" type="email" id="iduemail" className="lIns" onChange={(e) => { setuemail(e.target.value); handleCh(e, "loginB") }} ></input>
                                    <b className="hideL">email</b>
                                </div>
                                <div className="takeInD" id="userI2">
                                    <input required id="idpassword" value={password} placeholder="password" className="lIns" type="password" onChange={(e) => { setPassword(e.target.value); handleCh(e, "loginB") }} ></input>
                                    <b className="hideL">password</b>
                                </div>

                                <button type="submit" id="loginB" className="goLogB" onClick={(e) => { subForm(e.target.id) }}>Login</button>
                                <button className="bNone" onClick={(e) => { e.preventDefault(); navigate("/register") }}>Don't have an Account?</button>
                            </form>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}