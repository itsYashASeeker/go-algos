import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Home from './pages/Home';
import AppProvider from "./context/appContext";
import SJobSched from "./simulators/SJobSched";
import SLcs from "./simulators/SLcs";
import SDijkstra from "./simulators/SDijkstra";
import SNQueens from "./simulators/SNqueens";
import SKruskals from "./simulators/SKruskals";
import SKnapsack from "./simulators/SKnapsack";
import Lcs from "./mainPages/Lcs";
import TLcs from "./theoryPages/TLcs";
import FLcs from "./feedback/FLcs";
import SRabinkarp from "./simulators/SRabinkarp";
import Sorting from "./pages/Sorting";
import Greedy from "./pages/Greedy";
import Dynamic from "./pages/Dynamic";
import Backtracking from "./pages/Backtracking";
import StrMatch from "./pages/StringM";
import SInsertionSort from "./simulators/SInsertionSort";
import SSelectionSort from "./simulators/SSelectionSort";
import SBubbleSort from "./simulators/SBubbleSort";
import JobSched from "./mainPages/jobSched";
import Dijkstra from "./mainPages/dijkstra";
import Nqueens from "./mainPages/nqueens";
import Kruskals from "./mainPages/kruskal";
import Knapsack from "./mainPages/knapsack";
import RabinK from "./mainPages/rabinK";
import Insertion from "./mainPages/insertion";
import ASelection from "./mainPages/selection";
import Bubble from "./mainPages/bubble";
import RabinkarpTheory from "./theoryPages/RabinkarpTheory";
import NqueensTheory from "./theoryPages/NqueensTheory";
import JobSchedTheory from "./theoryPages/JobSchedTheory";
import TInsertionSort from "./theoryPages/TInsertionSort";
import TInsertS from "./theoryPages/TSelectS";
import TSelectS from "./theoryPages/TSelectS";
import TBubbleS from "./theoryPages/TBubbleS";
import TKruskals from "./theoryPages/TKruskals";
import TKnapsack from "./theoryPages/TKnapsack";
import TDijkstra from "./theoryPages/Tdijkstra";
import FJobS from "./feedback/FJobS";
import FDijkstra from "./feedback/FDijkstra";
import FNQueens from "./feedback/FNQueens";
import FKruskals from "./feedback/FKruskals";
import FKnapsack from "./feedback/FKnapsack";
import FRabin from "./feedback/FRabin";
import FInsertion from "./feedback/FInsertionSort";
import FSelection from "./feedback/FSelection";
import FBubble from "./feedback/FBubble";
import PageNotFound from "./components/NotFound";

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* pages for concept of algos */}
          <Route path="/sorting" element={<Sorting />}></Route>
          <Route path="/greedy" element={<Greedy />}></Route>
          <Route path="/dynamic" element={<Dynamic />}></Route>
          <Route path="/backtracking" element={<Backtracking />}></Route>
          <Route path="/string-match" element={<StrMatch />}></Route>
          {/* lcs */}
          {/* <Route path="/lcs" element={<Lcs />}></Route> */}
          <Route path="/lcs" element={<TLcs />}></Route>
          <Route path="/lcs/feedback" element={<FLcs />}></Route>
          <Route path="/lcs/simulator" element={<SLcs />}></Route>

          {/* job sched */}
          {/* <Route path="/job-scheduling" element={<JobSched />}></Route> */}
          <Route path="/job-scheduling" element={<JobSchedTheory />}></Route>
          <Route path="/job-scheduling/simulator" element={<SJobSched />}></Route>
          <Route path="/job-scheduling/feedback" element={<FJobS />}></Route>

          {/* Dijkstra */}
          <Route path="/dijkstra" element={<TDijkstra />}></Route>
          <Route path="/dijkstra/simulator" element={<SDijkstra />}></Route>
          <Route path="/dijkstra/feedback" element={<FDijkstra />}></Route>

          {/* N queens */}
          {/* <Route path='/nqueens' element={<Nqueens />}></Route> */}
          <Route path="/nqueens" element={<NqueensTheory />}></Route>
          <Route path='/nqueens/simulator' element={<SNQueens />}></Route>
          <Route path='/nqueens/feedback' element={<FNQueens />}></Route>

          {/* kruskals */}
          <Route path="/kruskals" element={<TKruskals />}></Route>
          <Route path="/kruskals/simulator" element={<SKruskals />}></Route>
          <Route path="/kruskals/feedback" element={<FKruskals />}></Route>

          {/* knapsack */}
          <Route path="/knapsack" element={<TKnapsack />}></Route>
          <Route path="/knapsack/simulator" element={<SKnapsack />}></Route>
          <Route path="/knapsack/feedback" element={<FKnapsack />}></Route>

          {/* rabinkarp */}
          {/* <Route path="/rabinkarp" element={<RabinK />}></Route> */}
          <Route path="/rabinkarp" element={<RabinkarpTheory />}></Route>
          <Route path="/rabinkarp/simulator" element={<SRabinkarp />}></Route>
          <Route path="/rabinkarp/feedback" element={<FRabin />}></Route>

          {/* insertion */}
          <Route path="/insertion" element={<TInsertionSort />}></Route>
          <Route path="/insertion/simulator" element={<SInsertionSort />}></Route>
          <Route path="/insertion/feedback" element={<FInsertion />}></Route>

          {/* selection */}
          <Route path="/selection" element={<TSelectS />}></Route>
          <Route path="/selection/simulator" element={<SSelectionSort />}></Route>
          <Route path="/selection/feedback" element={<FSelection />}></Route>

          {/* bubble */}
          <Route path="/bubble" element={<TBubbleS />}></Route>
          <Route path="/bubble/simulator" element={<SBubbleSort />}></Route>
          <Route path="/bubble/feedback" element={<FBubble />}></Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppProvider>
    </HashRouter >
  );
}

export default App;
