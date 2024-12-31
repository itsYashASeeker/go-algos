import "../css/Navbar.css";
import somLogo from "../img/somaiyaLogo.png";

export default function SomL(){

    // render the somaiya institute logo
    return (<div className="dkjLogo">
        <img className="somLogo" src={somLogo}></img>
        <div className="kjsit">
            <p className="kjhead">K. J. Somaiya Institute of Technology, Sion</p>
            <p>An Autonomous Institute Permanently Affiliated to the University of Mumbai</p>
        </div>
    </div>);
}