import axios from "axios";
import { useState } from "react"
import { Form, useNavigate, useParams } from "react-router-dom";
import { AppState } from "../../context/appContext";
import { useEffect } from "react";
import "../../css/Theory.css";
import "../../css/login.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";

export default function ChangePassUser() {
    const [uemail, setuemail] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();
    const [tVerified, setTverified] = useState();
    const [pChanged, setPChanged] = useState();
    const navigate = useNavigate();

    const { userD } = AppState();

    const [uD, setUD] = userD;
    const [currLS, setCurrLS] = useState(false);

    const passToken = useParams();

    useEffect(() => {
        async function verifyPassToken() {
            const cpToken = passToken.pT;
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/user/auth/account/login/forgot-password/verify-token`, { cpToken }, {
                    withCredentials: true
                })
                    .then((data) => {
                        setTverified(true)
                        setuemail(data.data.email);
                        console.clear();
                    })
                    .catch((err) => {
                        console.clear();
                        const errs = err.response.data.error;
                        for (var i = 0; i < errs.length; i++) {
                            console.log(errs[i]);
                        }
                    })
            }
            catch (err) {
                console.clear();
                // window.alert(err);
            }
        }

        verifyPassToken();
    }, [])

    useEffect(() => {
        if ((!uemail || !password || !cpassword) && retId("changePLl")) {
            retId("changePLl").setAttribute("disabled", "disabled");
        }
        else if (retId("changePLl")) {
            retId("changePLl").removeAttribute("disabled");
        }
    }, [uemail, password, cpassword]);


    async function changePassUser(uData) {
        if (!uemail || !password || !cpassword) {
            window.alert("Please fill the entries");
            return;
        }
        if (password != cpassword) {
            window.alert("Confirm password must be same as the password");
            return;
        }
        try {
            const passChanged = await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/user/auth/account/login/forgot-password/do`, uData, {
                withCredentials: true
            })
                .then((data) => {
                    setPChanged(true);
                    console.clear();
                    window.alert(data.data);

                })
                .catch((err) => {
                    console.clear();
                    const errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        window.alert(errs[i]);
                    }
                })
        } catch (error) {
            console.clear();
        }
    }

    function subForm(e, tId) {
        var f = document.getElementsByTagName('form')[0];
        if (f.reportValidity()) {
            e.preventDefault();
            changePassUser({
                email: uemail,
                password
            });
        }
        else {
            e.preventDefault();
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

    return (
        <>
            <Navbar />
            <div className="fullbgHOME divf loginBG">
                {tVerified ?
                    <>
                        {pChanged ?
                            <>
                                <p className="f2 tCenter"><b>Your Password has been successfully reset, you can proceed to Login</b></p>
                                <button className="spec" onClick={() => { navigate("/login") }}>Login</button>
                            </>
                            :
                            <div className="divf loginCard fpCard">
                                <div className="lOptions">
                                    <button id="studentS"
                                        className="wFullBL"
                                    >Student</button>
                                </div>
                                <div id="userForm">
                                    <form className="divf logC" id="uForm">
                                        <p className="f2"><b>Change Password</b></p>
                                        <div className="takeInD" id="userI1">
                                            <input readOnly required pattern="[^ @]*@[^ @]*" value={uemail} placeholder="email" type="email" id="iduemail" className="lIns" onChange={(e) => { setuemail(e.target.value); }} ></input>
                                            <b className="hideL">email</b>
                                        </div>
                                        <div>
                                            <div className="takeInD" id="userI2">
                                                <input required id="idpassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password} placeholder="password" className="lIns" type="password" onChange={(e) => { setPassword(e.target.value); handleCh(e, "changePLl") }} ></input>
                                                <b className="hideL">password</b>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="takeInD" id="userI2">
                                                <input required id="idcpassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={cpassword} placeholder="password" className="lIns" type="password" onChange={(e) => { setCPassword(e.target.value); handleCh(e, "changePLl") }} ></input>
                                                <b className="hideL">confirm password</b>
                                            </div>
                                            <p className="pComment">Password must contain atleast one Uppercase/Lowercase letters and digit, and atleast 8 letters long</p>
                                        </div>
                                        <button type="submit" id="changePLl" className="goLogB" onClick={(e) => { subForm(e, e.target.id) }}>Confirm</button>
                                    </form>
                                </div>
                            </div>
                        }
                    </>

                    :
                    <>
                        <FontAwesomeIcon className="f4" icon={faSadTear} />
                        <p className="f2 mUpL"><b>Either Verification link doesn't exist, or is expired!</b></p>

                    </>
                }
            </div>
            <Footer />
        </>
    )
}