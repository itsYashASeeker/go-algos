import logo from './logo.svg';
// import './App.css';
import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Home from './pages/Home';
import JobSched from './pages/JobSched';
import Lcs from "./pages/Lcs";
import Dijkstra from './pages/Dijkstra';
import NQueens from './pages/Nqueens';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/job-scheduling" element={<JobSched />}></Route>
        <Route path="/lcs" element={<Lcs />}></Route>
        <Route path="/dijkstra" element={<Dijkstra />}></Route>
        <Route path='/nqueens' element={<NQueens />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
