import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import StrMatchImg from "../img/string-matching.webp";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function StrMatch() {
    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink);
    }

    return (
        <>
            <Navbar />
            <div className="fullbg fullbgHOME dcontainer">
                <section className="sectionsT">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        id="title" className="title1">String Matching</motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">String matching</b> operation is a core part in many text processing applications. The objective of this algorithm is to find pattern P from given text T.
                        </p>
                        <p className="f1-3 mUpL">
                            <b>Links to:</b>
                            <button name="insertion" className="sButton " onClick={() => { naviTo("rabinkarp") }}>Rabinkarp<span></span></button>
                            {/* <button name="selection" className="sButton " onClick={() => { naviTo("selection") }}>Selection<span></span></button>
                            <button name="bubble" className="sButton " onClick={() => { naviTo("bubble") }}>Bubble<span></span></button> */}
                        </p>
                        <p className="f1-5 mUpL">
                            String matching operation is a core part in many text processing applications. The objective of this algorithm is to find pattern P from given text T. In the design of compilers and text editors, string matching operation is crucial. So locating P in T efficiently is very important.
                        </p>
                        <p className="f1-5 mUpL">
                            The problem is defined as follows: “Given some text string T[1….n] of size n, find all occurrences of pattern P[1…m] of size m in T.”
                        </p>
                        <p className="f1-4 mUpL">
                            We say that P occurs in text T with number of shifts s, if 0 ≤ s ≤ n – m and T[ (s + 1) … (s + m) ] = P[1…m].
                        </p>
                        <div className="mUpL">
                            <b className=" f1-4 hightText">
                                Consider the following example
                            </b>
                        </div>
                        
                        <div className="divf mUpM">
                            <img src={StrMatchImg} className="im2" />
                        </div>
                        <p className="f1-5 mUpL">
                            <ul className="ols f1-3">
                                <li>
                                    In this example, pattern P = ARE is found in text T after four shifts.
                                </li>
                                <li>
                                    The classical application of such algorithms are to find particular protein pattern in DNA sequence.
                                </li>
                                <li>
                                    Strings may be encoded using set of character alphabets {"{a, b, …, z}"}, binary alphabets {"{0, 1}"}, decimal alphabets {"{0, 1, 2, …, 9}"}, DNA alphabets {"{A, C, G, T}"}. The encoding of the string directly affects the efficiency of searching.
                                </li>
                                <li>
                                    In the next sections, we will discuss and analyze a few string-matching algorithms.
                                </li>
                            </ul>
                        </p>
                        <p className="f1-5 mUpL">
                            <b className="hightText">Applications of String Matching</b>
                            <ul className="ols mUpS f1-3">
                                <li>
                                    <b>Plagiarism Detection:</b> The documents to be compared are decomposed into string tokens and compared using string matching algorithms. Thus, these algorithms are used to detect similarities between them and declare if the work is plagiarized or original.
                                </li>
                                <li>
                                    <b>Bioinformatics and DNA Sequencing:</b> Bioinformatics involves applying information technology and computer science to problems involving genetic sequences to find DNA patterns. String matching algorithms and DNA analysis are both collectively used for finding the occurrence of the pattern set.
                                </li>
                                <li>
                                    <b>Digital Forensics:</b> String matching algorithms are used to locate specific text strings of interest in the digital forensic text, which are useful for the investigation.
                                </li>
                            </ul>
                        </p>
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    )
}