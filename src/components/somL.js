import "../css/Navbar.css";
import somLogo from "../img/somaiyaLogo.jpg";

export default function SomL(){
    return (<div className="dkjLogo">
        <img className="somLogo" src={somLogo}></img>
        <div className="kjsit">
            <p className="kjhead">K. J. Somaiya Institute of Technology, Sion</p>
            <p>An Autonomous Institute Permanently Affiliated to the University of Mumbai</p>
        </div>
    </div>);
}