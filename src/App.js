import logo from './logo.svg';
import './App.css';
import JobSched from './pages/JobSched';
import { HashRouter, Route, Link, Routes } from "react-router-dom";
import Home from './pages/Home';
import Kruskal from './pages/Kruskal';

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        <Route path="/job-scheduling" element={<JobSched />}></Route>
        <Route path="/kruskals" element={<Kruskal />}></Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
