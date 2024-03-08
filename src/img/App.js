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
import SNaiveSting from "./simulators/SNaiveString";
import SSelectionSort from "./simulators/SSelectionSort";
import SInsertionSort from "./simulators/SInsertionSort";
import SBubbleSort from "./simulators/SBubbleSort";

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/sorting" element={<Sorting />}></Route>
          <Route exact path="/greedy" element={<Greedy />}></Route>
          <Route exact path="/dynamic" element={<Dynamic />}></Route>
          <Route path="/lcs" element={<Lcs />}></Route>
          <Route path="/lcs/theory" element={<TLcs />}></Route>
          <Route path="/lcs/feedback" element={<FLcs />}></Route>
          <Route path="/job-scheduling/simulator" element={<SJobSched />}></Route>
          <Route path="/lcs/simulator" element={<SLcs />}></Route>
          <Route path="/dijkstra/simulator" element={<SDijkstra />}></Route>
          <Route path='/nqueens/simulator' element={<SNQueens />}></Route>
          <Route path="/kruskals/simulator" element={<SKruskals />}></Route>
          <Route path="/knapsack/simulator" element={<SKnapsack />}></Route>
          <Route path="/rabinkarp/simulator" element={<SRabinkarp />}></Route>
          <Route path="/naivestring/simulator" element={<SNaiveSting />}></Route>
          <Route path="/selection/simulator" element={<SSelectionSort />}></Route>
          <Route path="/insertion/simulator" element={<SInsertionSort />}></Route>
          <Route path="/bubble/simulator" element={<SBubbleSort />}></Route>
        </Routes>
      </AppProvider>
    </HashRouter >
  );
}

export default App;
