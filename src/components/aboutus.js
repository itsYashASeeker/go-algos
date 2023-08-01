import "../css/Theory.css";
import "../css/aboutUs.css";
import githubL from "../img/github.svg";
import linkedinL from "../img/linkedin.svg";
import instagramL from "../img/instagram.svg";
import { Link } from "react-router-dom";
import yashImg from "../img/yash.jpg";
import kushalImg from "../img/kushal.jpg";
import dubeyImg from "../img/yashkumar.jpg";
import profMD from "../img/profMD.jpg";
import { animate, delay, motion } from "framer-motion";

export default function AboutUs() {

    return (
        <motion.div className="ffbg">

            <b className="f2 mUpL">Developed by:</b>
            <div className="all_cards divf mUpS">
                <motion.div id="iddev_card" class="dev_card divf"
                    initial={{ scale: 0.8, opacity: 0}}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
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
                </motion.div>
                <motion.div id="iddev_card" class="dev_card divf"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
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
                </motion.div>
                <motion.div id="iddev_card" class="dev_card divf"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
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
                </motion.div>
            </div>
            <b className="f2">Guided by:</b>
            <div className="divf mUpS">
                <motion.div className="guide_card divf"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <b className="f1-5">Prof. Mrunali Desai</b>
                    <img src={profMD} className="guide_img mUpS"></img>
                    <Link to="https://kjsit.somaiya.edu.in/en/view-member/220066?type=faculty" target="_blank" className="mUpS">Assistant Professor in Computer Dept.</Link>
                </motion.div>
            </div>
        </motion.div>
    )
}