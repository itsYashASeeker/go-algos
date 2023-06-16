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
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        id="title" className="title1">Sorting</motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="f1-5 mUpL">
                            <b className="hightText1">Sorting</b> is the process of <b>arranging items</b> in a specific order or <b>sequence</b>. It is a common algorithmic problem in computer science and is used in various applications such as searching, data analysis, and information retrieval.
                        </p>
                        <p className="f1-3 mUpL">
                            <b>Links to:</b>
                            <button name="insertion" className="sButton " onClick={() => { naviTo("insertion") }}>Insertion<span></span></button>
                            <button name="selection" className="sButton " onClick={() => { naviTo("selection") }}>Selection<span></span></button>
                            <button name="bubble" className="sButton " onClick={() => { naviTo("bubble") }}>Bubble<span></span></button>
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
                            <b className="hightText">
                                Sorting Algorithms are done for Two main reasons:
                            </b>
                            <ol className="ols mUpS f1-3">
                                <li>
                                    <div className="mUpL"></div>
                                    <b className="headMain">Ascending Sorting</b>
                                    <p className="mUpM">
                                        Here the data is sorted in a way that minimum element comes
                                        first and gradually goes towards maximum element in the
                                        collection.
                                    </p>
                                    <div className="mUpM">
                                        <b className="headMain">Benefits:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                <b>Improved Readability: </b> Ascending sorting provides
                                                a more intuitive and natural order for humans to read
                                                and interpret data. It makes it easier to locate
                                                specific elements or patterns within the sorted data.
                                            </li>
                                            <li>
                                                <b>Efficient Searching:</b> When data is sorted in
                                                ascending order, it allows for efficient searching using
                                                algorithms like binary search. Binary search has a time
                                                complexity of O(log n), making it significantly faster
                                                than searching unsorted data.
                                            </li>
                                            <li>
                                                <b>Optimized Algorithmic Performance: </b> Several
                                                algorithms and operations, such as merge sort and
                                                insertion sort, perform more efficiently on sorted data.
                                                Sorting the data in ascending order can improve the
                                                performance of these algorithms.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mUpM">
                                        <b className="headMain">Disadvantages:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                <b>Increased Complexity for Dynamic Data: </b> If the
                                                data being sorted is frequently updated or dynamically
                                                changing, maintaining the sorted order can introduce
                                                additional complexity. The sorting operation may need to
                                                be repeated each time new data is added or modified.
                                            </li>
                                            <li>
                                                <b>Preprocessing Overhead: </b>Sorting data in ascending
                                                order requires additional preprocessing time and
                                                computational resources. Depending on the size and
                                                complexity of the data, the sorting process can be
                                                time-consuming and resource-intensive.
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <b className="headMain">Descending Sorting</b>
                                    <p className="mUpM">
                                        Here the data is sorted in a way that maximum element comes
                                        first and gradually goes towards minimum element in the
                                        collection.
                                    </p>
                                    <div className="mUpM">
                                        <b className="headMain">Advantages:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                <b>Convenience in Ranking: </b> Descending sorting
                                                provides a straightforward ranking of values. This can
                                                be useful in scenarios where ranking or ordering based
                                                on magnitude is essential, such as leaderboard rankings
                                                or financial performance analysis.
                                            </li>
                                            <li>
                                                <b>Compatibility with Some Data Structures: </b> Certain
                                                data structures or algorithms work more naturally with
                                                descending order. For example, binary search trees can
                                                be easier to implement and navigate with a descending
                                                order arrangement.
                                            </li>
                                        </ul>
                                        <b className="headMain">Disadvantages:</b>
                                        <ul className="ols mUpS f1-3">
                                            <li>
                                                <b>Reduced Readability: </b>Descending sorting may not
                                                always align with human expectations or natural reading
                                                patterns. It can be less intuitive for users to
                                                interpret data presented in descending order, especially
                                                if they are accustomed to ascending order.
                                            </li>
                                            <li>
                                                <b>Limited Algorithmic Optimization:</b> Some sorting
                                                algorithms may be more optimized for ascending order or
                                                may have default implementations tailored for that
                                                purpose. Adapting these algorithms for descending
                                                sorting may introduce additional complexity or
                                                compromise their performance.
                                            </li>
                                        </ul>
                                    </div>
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
                    </motion.div>
                </section>
            </div>
            <Footer />
        </>
    )
}