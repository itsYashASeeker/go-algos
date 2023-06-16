import "../css/Theory.css";
import "../css/aboutUs.css";
import githubL from "../img/github.svg";
import linkedinL from "../img/linkedin.svg";
import instagramL from "../img/instagram.svg";
import { Link } from "react-router-dom";
import yashImg from "../img/yash.jpg";
import kushalImg from "../img/kushal.jpeg";
import dubeyImg from "../img/yashkumar.jpg";
import profMD from "../img/profMD.jpg";

export default function AboutUs() {

    return (
        <div class="ffbg">
            
            <b className="f2 mUpL">Developed by:</b>
            <div class="all_cards divf mUpS">
                <div id="iddev_card" class="dev_card divf">
                    <b id="iddev_name" class="f1-5">Yash K Chauhan</b>
                    <img src={yashImg} class="dev_img mUpS"></img>
                    <Link className="mUpS remL" to="mailto:chauhan.y@somaiya.edu">
                        <b class="f1-1 ">chauhan.y@somaiya.edu</b>
                    </Link>
                    <div class="divf dev_card_social mUpS">
                        <Link to="https://github.com/itsYashASeeker" target="_blank"><img src={githubL} className="socIcon"></img></Link>
                        <Link to="https://www.linkedin.com/in/yash-chauhan-180031203/" target="_blank"><img src={linkedinL} className="socIcon"></img></Link>
                        <Link to="https://www.instagram.com/yashck.iso/" target="_blank"><img src={instagramL} className="socIcon"></img></Link>
                    </div>
                </div>
                <div id="iddev_card" class="dev_card divf">
                    <b id="iddev_name" class="f1-5">Yashkumar S Dubey</b>
                    <img src={dubeyImg} class="dev_img mUpS"></img>
                    <Link className="mUpS remL" to="mailto:yashkumar.d@somaiya.edu">
                        <b class="f1-1 ">yashkumar.d@somaiya.edu</b>
                    </Link>
                    <div class="divf dev_card_social mUpS">
                        <Link to="https://github.com/itsYashASeeker" target="_blank"><img src={githubL} className="socIcon"></img></Link>
                        <Link to="https://www.linkedin.com/in/yash-chauhan-180031203/" target="_blank"><img src={linkedinL} className="socIcon"></img></Link>
                        <Link to="https://www.instagram.com/yashck.iso/" target="_blank"><img src={instagramL} className="socIcon"></img></Link>
                    </div>
                </div>
                <div id="iddev_card" class="dev_card divf">
                    <b id="iddev_name" class="f1-5">Kushal C Harsora</b>
                    <img src={kushalImg} class="dev_img mUpS"></img>
                    <Link className="mUpS remL" to="mailto:kushal.h@somaiya.edu">
                        <b class="f1-1 ">kushal.h@somaiya.edu</b>
                    </Link>
                    <div class="divf dev_card_social mUpS">
                        <Link to="https://github.com/itsYashASeeker" target="_blank"><img src={githubL} className="socIcon"></img></Link>
                        <Link to="https://www.linkedin.com/in/yash-chauhan-180031203/" target="_blank"><img src={linkedinL} className="socIcon"></img></Link>
                        <Link to="https://www.instagram.com/yashck.iso/" target="_blank"><img src={instagramL} className="socIcon"></img></Link>
                    </div>
                </div>
            </div>
            <b className="f2">Guided by:</b>
            <div className="divf mUpS">
                <div class="guide_card divf">
                    <b className="f1-5">Prof. Mrunali Desai</b>
                    <img src={profMD} class="guide_img mUpS"></img>
                    <Link to="https://kjsit.somaiya.edu.in/en/view-member/220066?type=faculty" target="_blank" className="mUpS">Assistant Professor in Computer Dept.</Link>
                </div>
            </div>
        </div>
    )
}