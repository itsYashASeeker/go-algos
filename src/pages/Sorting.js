import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Sorting1 from "../img/Sorting1.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Sorting() {
    const navigate = useNavigate();

    const naviTo = (toLink) => {
        navigate("/" + toLink);
    }

    return (
        <>
            <Navbar />
            <div className="fullbg fullbgHOME dcontainer">
                <section className="sectionsT">
                    <p id="title" className="title1">Sorting</p>

                    <p className="f1-5 mUpL">
                        <b className="hightText1">Sorting</b> is the process of <b>arranging items</b> in a specific order or <b>sequence</b>. It is a common algorithmic problem in computer science and is used in various applications such as searching, data analysis, and information retrieval.
                    </p>
                    <p className="f1-3 mUpL">
                        <b>Links to:</b>
                        <button name="insertion" className="sButton " onClick={() => { naviTo("insertion")}}>Insertion<span></span></button>
                        <button name="selection" className="sButton " onClick={() => { naviTo("selection")}}>Selection<span></span></button>
                        <button name="bubble" className="sButton " onClick={() => { naviTo("bubble")}}>Bubble<span></span></button>
                    </p>
                    <p className="f1-5 mUpL">
                        <b className="hightText">Three things to consider while choosing sorting algorithms for application:</b>
                        <ol className="ols mUpS f1-3">
                            <li>
                                <b>Number of elements</b> in list
                            </li>
                            <li>
                                <b>Number of different orders</b> of list required
                            </li>
                            <li>
                                <b>The amount of time</b> required to move the data or not move the data
                            </li>
                        </ol>
                    </p>
                    <p className="f1-5 mUpL">
                        <b className="hightText">Example</b>
                        <p className="mLeS mUpS f1-3">
                            The below list of characters is sorted in increasing order of their ASCII values. That is, the character with a lesser ASCII value will be placed first than the character with a higher ASCII value.
                        </p>

                    </p>
                    <div className="divf">
                        <img src={Sorting1} className="im1" />
                    </div>
                    <p className="f1-5 mUpL">
                        <b className="hightText">Applications of Sorting</b>
                        <ul className="ols mUpS f1-3">
                            <li>
                                <b>Contact List in Your Mobile Phone</b> also contains all contacts arranged alphabetically (lexicographically). So if you look for contact then you don’t have to look randomly and can be searched easily and many others like apps on your phone.
                            </li>
                            <li>
                                <b>Keywords in Your book</b> are also in a lexicographical manner and you can find it according to Chapter.
                            </li>
                            <li>
                                Imagine a teacher <b>sorting</b> their <b>students’ <i>papers</i></b> according to the alphabetical <i>order</i> of their <b>first names</b>. This type of task is similar to the function of a sorting algorithm, like a bucket sort. By looking at only the first letter of the first name, you can remove a lot of unnecessary information.
                            </li>
                        </ul>
                    </p>
                </section>
            </div>
            <Footer />
        </>
    )
}