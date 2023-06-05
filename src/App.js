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

function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/lcs" element={<Lcs />}></Route>
          <Route path="/lcs/theory" element={<TLcs />}></Route>
          <Route path="/lcs/feedback" element={<FLcs />}></Route>
          <Route path="/job-scheduling/simulator" element={<SJobSched />}></Route>
          <Route path="/lcs/simulator" element={<SLcs />}></Route>
          <Route path="/dijkstra/simulator" element={<SDijkstra />}></Route>
          <Route path='/nqueens/simulator' element={<SNQueens />}></Route>
          <Route path="/kruskals/simulator" element={<SKruskals />}></Route>
          <Route path="/knapsack/simulator" element={<SKnapsack />}></Route>
        </Routes>
      </AppProvider>
    </HashRouter >
  );
}

export default App;
