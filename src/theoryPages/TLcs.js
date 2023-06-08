import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";

export default function TLcs() {
    return (
        <>
            <Navbar />
            <FNavbar />
            <motion.div className="theorybg"
                initial={{y: 50}}
                animate={{y: 0}}
                transition={{duration: 0.3}}
            >
                <section className="sections">
                    <p className="title1">Title 1</p>
                    <p className="title2">Title 2</p>
                    <p className="hightText">Highlight text</p>
                    <div className="note">
                        <p>Note: </p>
                        <p>This is the note</p>
                    </div>
                </section>
                <div className="divider"></div>
                <section className="sections">
                    <p className="title1">Title 1</p>
                    <p className="title2">Title 2</p>
                    <p className="hightText">Highlight text</p>
                    <div className="note">
                        <p className="nT">Note: </p>
                        <p>This is the note</p>
                    </div>
                </section>
            
            </motion.div>
        </>
    )
}