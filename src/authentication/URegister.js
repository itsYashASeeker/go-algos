import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function URegister() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [uemail, setEmail] = useState();
    const [uName, setUName] = useState();
    const navigate = useNavigate();

    const { userD } = AppState();

    const [uD, setUD] = userD;
    const [currLS, setCurrLS] = useState(false);

    async function doRegister(uData, uType) {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        if (!uData.email || !uData.password || !uData.name || !uData.username) {
            window.alert("Please fill all details");
            return;
        }
        try {
            await axios.post("http://localhost:5013/y/" + uType + "/register", uData, {
                withCredentials: true
            }, config)
                .then((data) => {
                    window.location.reload();
                    window.alert(data.data);
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
        if (uemail.includes("@")) {
            doRegister({
                email: uemail,
                password: password,
                name: uName,
                username: username
            }, "user");
        }
        else {
            return;
        }
    }

    useEffect(() => {
        if ((!uemail || !password || !uName || !username) && retId("registerB")) {
            retId("registerB").setAttribute("disabled", "disabled");
        }
    }, [uemail, password, uName, username]);

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
        if (uD) {
            navigate("/");
        }
    }, [uD]);

    function retId(idName) {
        return document.getElementById(idName);
    }

    return (
        <>
            <Navbar />
            <div className="divf loginBG">
                <div className="divf loginCard lpd0">
                    <div id="adminForm">
                        <form className="divf logC " id="aForm">
                            <p className="f2"><b>User Registration</b></p>
                            <div className="takeInD">
                                <input id="uName" required onChange={(e) => { setUName(e.target.value); handleCh(e, "registerB") }} placeholder="Name" className="lIns"></input>
                                <b className="hideL">Name</b>
                            </div>
                            <div className="takeInD">
                                <input id="uEmail" required pattern="[^ @]*@[^ @]*" type="email" onChange={(e) => { setEmail(e.target.value); handleCh(e, "registerB") }} placeholder="Email" className="lIns"></input>
                                <b className="hideL">Email</b>
                            </div>
                            <div className="takeInD">
                                <input id="uUsername" required onChange={(e) => { setUsername(e.target.value); handleCh(e, "registerB") }} placeholder="Username" className="lIns"></input>
                                <b className="hideL">Username</b>
                            </div>
                            <div className="takeInD">
                                <input id="uPassword" required type="password" onChange={(e) => { setPassword(e.target.value); handleCh(e, "registerB") }} placeholder="Password" className="lIns"></input>
                                <b className="hideL">Password</b>
                            </div>
                            <button type="submit" id="registerB" className="goLogB" onClick={(e) => { subForm(e.target.id) }}>Register</button>
                            {/* <button className="bNone">Don't have an Account?</button> */}
                        </form>
                    </div>
                </div>
            </div>





        </>
    )
}