import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Home from './pages/Home';
import JobSched from './simulators/JobSched';
import Lcs from "./simulators/Lcs";
import Dijkstra from './simulators/Dijkstra';
import NQueens from './simulators/Nqueens';
import Kruskals from './simulators/Kruskals';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/job-scheduling" element={<JobSched />}></Route>
        <Route path="/lcs" element={<Lcs />}></Route>
        <Route path="/dijkstra" element={<Dijkstra />}></Route>
        <Route path='/nqueens' element={<NQueens />}></Route>
        <Route path="/kruskals" element={<Kruskals />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
