import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../context/appContext";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function URegister(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [cpassword, setCPassword] = useState();
    const [secretK, setSecretK] = useState();
    const [uemail, setEmail] = useState();
    const [uName, setUName] = useState();
    const [uInst, setUInst] = useState();
    const [uDept, setUDept] = useState();
    const [uDesig, setUDesig] = useState("Student");
    const navigate = useNavigate();

    const { userD } = AppState();

    const [uD, setUD] = userD;
    const [currLS, setCurrLS] = useState(false);

    async function doRegister(uData, uType) {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        if (
            !uData.email ||
            !uData.password ||
            !uData.name ||
            !uData.username ||
            !uData.institute ||
            !uData.department ||
            !uData.designation
        ) {
            window.alert("Please fill all details");
            return;
        }
        if (password != cpassword) {
            window.alert("Confirm password must be same as password");
            return;
        }
        try {
            retId("registerB").setAttribute("disabled", "disabled");
            await axios
                .post(
                    `${process.env.REACT_APP_BACKEND_DOMAIN}/y/` + uType + "/register",
                    uData,
                    {
                        withCredentials: true,
                    },
                    config
                )
                .then((data) => {
                    console.clear();
                    //   window.alert(data.data);
                    Swal.fire({
                        title: "Registration successful",
                        imageUrl:
                            "https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?w=740&t=st=1689921072~exp=1689921672~hmac=dd32ed6542762e3a18446291da3007b4e9c926a649f1e78f87f4e65612a8b59f",
                        imageHeight: "200",
                        text: "Your account has been successfully created! Please activate your account by clicking on the link that you will receive in your registered mail id. Link expires in 30 minutes.",
                        confirmButtonText: "Ok",
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                navigate("/login");
                            }
                            else {
                                window.location.reload();
                            }
                        })
                    // navigate("/login");
                })
                .catch((err) => {
                    retId("registerB").removeAttribute("disabled");
                    console.clear();
                    if (!err.response.data.error) {
                        Swal.fire({
                            title: "Error Occured",
                            imageUrl:
                                "https://img.freepik.com/free-vector/man-thinking-concept-illustration_114360-7920.jpg?w=740&t=st=1689918675~exp=1689919275~hmac=4cded89fac1c49e9b36d9d1d45aac7731d6854d89839aeb8da130c8d9cf98512",
                            imageHeight: "200",
                            text: "Some error occurred, Please try again!",
                            confirmButtonColor: "rgb(185,28,28)",
                        });
                        return;
                    }
                    const errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        // window.alert(errs[i]);
                        Swal.fire({
                            title: "Error Occured",
                            imageUrl:
                                "https://img.freepik.com/free-vector/man-thinking-concept-illustration_114360-7920.jpg?w=740&t=st=1689918675~exp=1689919275~hmac=4cded89fac1c49e9b36d9d1d45aac7731d6854d89839aeb8da130c8d9cf98512",
                            imageHeight: "200",
                            text: errs[i],
                            confirmButtonColor: "rgb(185,28,28)",
                        });
                    }
                });
        } catch (err) {
            retId("registerB").removeAttribute("disabled");
            console.clear();
            // window.alert(err);
            Swal.fire({
                title: "Error Occured",
                imageUrl:
                    "https://img.freepik.com/free-vector/man-thinking-concept-illustration_114360-7920.jpg?w=740&t=st=1689918675~exp=1689919275~hmac=4cded89fac1c49e9b36d9d1d45aac7731d6854d89839aeb8da130c8d9cf98512",
                imageHeight: "200",
                text: "Some error occurred, Please try again!",
                confirmButtonColor: "rgb(185,28,28)",
            });
        }
    }

    function subForm(e, tId) {
        var f = document.getElementsByTagName("form")[0];
        if (f.reportValidity()) {
            e.preventDefault();
            var uData = {
                email: uemail,
                password: password,
                name: uName,
                username: username,
                institute: uInst,
                department: uDept,
                designation: uDesig,
            };
            if (props.userType === "Admin") {
                uData.secretK = secretK;
            }
            doRegister(uData, props.userType.toLowerCase());
        } else {
            e.preventDefault();
            return;
        }
    }

    useEffect(() => {
        if (props.userType === "Admin" && !secretK) {
            retId("registerB").setAttribute("disabled", "disabled");
        }
        if (
            (!uemail ||
                !password ||
                !uName ||
                !username ||
                !uDesig ||
                !uDept ||
                !uInst ||
                !cpassword) &&
            retId("registerB")
        ) {
            retId("registerB").setAttribute("disabled", "disabled");
        }
    }, [uemail, password, uName, username, uDesig, uDept, uInst, cpassword]);

    const handleCh = (e, lId) => {
        var idn = e.target.id;
        var vv = e.target.value;

        if (!vv) {
            retId(idn).classList.remove("valid");
            retId(idn).classList.add("notValid");
            retId(lId).setAttribute("disabled", "disabled");
        } else {
            retId(idn).classList.add("valid");
            retId(idn).classList.remove("notValid");
            retId(lId).removeAttribute("disabled");
        }
    };

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
            <div className="fullbgHOME divf loginBG">
                <div className="divf loginCard lpd0 registerMW">
                    <div className="lOptions">
                        <button id="studentS" className="wFullBL">
                            {props.userType}
                        </button>
                    </div>
                    {/* <div id="adminForm"> */}
                    <form className="divf logC " id="aForm">
                        <p className="f2">
                            <b>Registration Form</b>
                        </p>
                        {props.userType === "Admin" ? (
                            <div className="inRow">
                                <div className="takeInD">
                                    <input
                                        id="uSecretK"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        required
                                        type="password"
                                        onChange={(e) => {
                                            setSecretK(e.target.value);
                                            handleCh(e, "registerB");
                                        }}
                                        placeholder="Secret key"
                                        className="lIns rIns"
                                    ></input>
                                    <b className="hideL">Secret Key</b>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="inRow">
                            <div className="takeInD">
                                <input
                                    id="uName"
                                    required
                                    pattern="[a-zA-Z]+"
                                    onChange={(e) => {
                                        setUName(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Name"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Name</b>
                            </div>
                            <div className="takeInD">
                                <input
                                    id="uEmail"
                                    required
                                    pattern="[^ @]*@[^ @]*"
                                    type="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Email"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Email</b>
                            </div>
                        </div>
                        <div className="inRow">
                            <div className="takeInD">
                                <input
                                    id="uUsername"
                                    pattern="[a-zA-Z0-9_]+"
                                    required
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Username"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Username</b>
                            </div>
                            <div className="takeInD">
                                <input
                                    id="uInstit"
                                    pattern="[a-zA-Z]+"
                                    required
                                    onChange={(e) => {
                                        setUInst(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Institute"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Institute</b>
                            </div>
                        </div>
                        <div className="inRow">
                            <div className="takeInD">
                                <input
                                    id="uDepartment"
                                    pattern="[a-zA-Z]+"
                                    required
                                    onChange={(e) => {
                                        setUDept(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Department"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Department</b>
                            </div>
                            <div className="takeInD">
                                <select
                                    id="uDesig"
                                    className="lIns rIns"
                                    onChange={({ target: { value } }) => {
                                        setUDesig(value);
                                    }}
                                >
                                    <option selected="true" value="Student">
                                        Student
                                    </option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Other">Other</option>
                                </select>
                                {/* <input id="uUsername" required onChange={(e) => { setUDesig(e.target.value); handleCh(e, "registerB") }} placeholder="Designation" className="lIns"></input> */}
                                <b className="hideL">Designation</b>
                            </div>
                        </div>
                        <div className="inRow">
                            <div className="takeInD">
                                <input
                                    id="uPassword"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    required
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Password"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Password</b>
                            </div>
                            <div className="takeInD">
                                <input
                                    id="uCPassword"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    required
                                    type="password"
                                    onChange={(e) => {
                                        setCPassword(e.target.value);
                                        handleCh(e, "registerB");
                                    }}
                                    placeholder="Password"
                                    className="lIns rIns"
                                ></input>
                                <b className="hideL">Confirm Pass</b>
                            </div>
                        </div>
                        <div className="inRow">
                            <p className="pComment">
                                Password must contain atleast one Uppercase/Lowercase letters
                                and digit, and atleast 8 letters long
                            </p>
                        </div>

                        <button
                            type="submit"
                            id="registerB"
                            className="goLogB"
                            onClick={(e) => {
                                subForm(e, e.target.id);
                            }}
                        >
                            Register
                        </button>
                        {/* <button className="bNone">Don't have an Account?</button> */}
                    </form>
                    {/* </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}
