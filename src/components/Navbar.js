import React from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="navbar">
            <button className="navHome" onClick={() => { navigate("/") }}>Home</button>
            <h1 className="title">Go-Algos</h1>
            {/* <button className="alButton" onClick={() => { }}>New</button> */}
        </div>
    )
}

export default Navbar;