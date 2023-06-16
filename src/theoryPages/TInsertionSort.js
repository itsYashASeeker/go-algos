import { useNavigate } from "react-router-dom";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import "../css/Theory.css";
import { animate, delay, motion } from "framer-motion";
import Footer from "../components/Footer";

export default function TInsertionSort() {
  const navigate = useNavigate();

  const naviTo = (toLink) => {
    navigate("/" + toLink + "/simulator");
  };

  return (
    <>
      <Navbar />
      <FNavbar />
      <div className="fullbg fullbgHOME dcontainer ">
        <section className="sectionsT mUpL">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
              <p className="f1-5 mUpL">
                <b className="hightText1">Insertion sort</b> is a simple sorting algorithm that works by
                repeatedly dividing the input into sorted and unsorted portions.
                It starts with an empty sorted portion and gradually inserts
                each element from the unsorted portion into its correct position
                within the sorted portion. The algorithm iterates through the
                unsorted portion, comparing each element with the elements in
                the sorted portion and shifting them to the right until the
                correct position is found. This process continues until all
                elements are inserted into their proper places.
              </p>
            <div className="f1-5 mUpL">
              <b className="hightText">Algorithm for Insertion Sort</b>
              <ul className=" algorithm intro f1-3 mUpM">
                <li>
                  <b>1. </b>Start with the second element (index 1) and consider
                  it as the key.
                </li>
                <li className="mUpS">
                  <b>2. </b>Compare the key with the elements before it in the
                  sorted portion (elements from 0 to key-1).
                </li>
                <li className="mUpS">
                  <b>3. </b>If the key is smaller than any of the elements in
                  the sorted portion, shift those elements to the right to make
                  space for the key.
                </li>
                <li className="mUpS">
                  <b>4. </b>Insert the key into its correct position in the
                  sorted portion.
                </li>
                <li className="mUpS">
                  <b>5. </b>Repeat steps 2 to 4 for the remaining unsorted
                  portion, incrementing the key by one in each iteration.
                </li>
                <li className="mUpS">
                  <b>6. </b>Continue this process until the entire array is
                  sorted.
                </li>
              </ul>
            </div>
            <div className="f1-5 mUpL">
              <b className="hightText">Example</b>
              <div className="mUpL mLeS">
                <p className="f1-3">
                  Let's illustrate the insertion sort algorithm step-by-step using
                  an example array [7, 2, 4, 1, 5, 3]:
                </p>
                <ul className="mUpM mLeS f1-2">
                  <li className="mUpM">
                    <b>Step 1: </b> Start with the second element (2) as the key.{" "}
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Compare 2 with the first
                    element (7) in the sorted portion. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Since 2 is smaller, shift 7
                    to the right. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Insert 2 into the first
                    position. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp;{" "}
                    <b>Array after Step 1: [2, 7, 4, 1, 5, 3]</b> <br />
                  </li>
                  <li className="mUpM">
                    <b>Step 2: </b> Move to the third element (4) as the key.
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Compare 4 with the elements
                    in the sorted portion (2 and 7). <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Insert 4 into its correct
                    position between 2 and 7. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp;{" "}
                    <b>Array after Step 2: [2, 4, 7, 1, 5, 3]</b> <br />
                  </li>
                  <li className="mUpM">
                    <b>Step 3: </b> Move to the fourth element (1) as the key.
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Compare 1 with the elements
                    in the sorted portion (2, 4, and 7). <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Shift 2, 4, and 7 to the
                    right to make space for 1. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Insert 1 into the first
                    position. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp;{" "}
                    <b>Array after Step 3: [1, 2, 4, 7, 5, 3]</b> <br />
                  </li>
                  <li className="mUpM">
                    <b>Step 4: </b> Move to the fifth element (5) as the key.{" "}
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Compare 5 with the elements
                    in the sorted portion (1, 2, 4, and 7). <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Insert 5 into its correct
                    position between 4 and 7. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp;{" "}
                    <b>Array after Step 4: [1, 2, 4, 5, 7, 3]</b> <br />
                  </li>
                  <li className="mUpM">
                    <b>Step 5: </b> Move to the sixth element (3) as the key.{" "}
                    <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Compare 3 with the elements
                    in the sorted portion (1, 2, 4, 5, and 7). <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; Shift 4, 5, and 7 to the
                    right to make space for 3. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp; bInsert 3 into the third
                    position. <br />
                    &nbsp; &nbsp; &nbsp; &nbsp; &ensp;{" "}
                    <b>Array after Step 5: [1, 2, 3, 4, 5, 7]</b>
                    <br />
                  </li>
                  <li className="mUpM">
                    <b>
                      The algorithm is complete, and the array [1, 2, 3, 4, 5, 7]
                      is the sorted result.
                    </b>
                  </li>
                </ul>
              </div>
              
              
            </div>
            <div className="f1-5 mUpL">
              <b className="hightText f1-5">Advantages of Insertion Sort</b>
              <ul className="mUpM mLeS f1-3 lsNone">
                <li className="mUpM">
                  <b>1. </b>Insertion sort has a time complexity of O(n²) but
                  performs efficiently on small input sizes or partially sorted
                  data.
                </li>
                <li className="mUpM">
                  <b>2. </b>Insertion sort performs efficiently on small input
                  sizes or when the data is already partially sorted. <br />
                  &nbsp; For such cases, the algorithm can have a linear or
                  near-linear time complexity, resulting in faster sorting
                  compared to more complex algorithms.
                </li>
              </ul>
            </div>
            <div className="f1-5 mUpL">
              <b className="hightText f1-5">Disadvantages of Insertion Sort</b>
              <ul className="mUpM mLeS f1-3 lsNone">
                <li className="mUpM">
                  <b>1. </b>Insertion sort has a time complexity of O(n^2) in
                  the worst-case scenario, where n is the number of elements to
                  be sorted. <br />
                  &nbsp; This makes it less efficient than more advanced sorting
                  algorithms, such as quicksort or merge sort.
                </li>
                <li className="mUpM">
                  <b>2. </b>Due to its quadratic time complexity, insertion sort
                  becomes significantly slower as the size of the dataset
                  increases. <br />
                  &nbsp; It can become impractical or inefficient for sorting
                  large arrays or datasets containing thousands or millions of
                  elements.
                </li>
              </ul>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
}
