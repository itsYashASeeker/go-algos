import { HashRouter, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import AppProvider from "./context/appContext";
import SJobSched from "./simulators/SJobSched";
import SLcs from "./simulators/SLcs";
import SDijkstra from "./simulators/SDijkstra";
import SNQueens from "./simulators/SNqueens";
import SKruskals from "./simulators/SKruskals";
import SKnapsack from "./simulators/SKnapsack";
import TLcs from "./theoryPages/TLcs";
import SRabinkarp from "./simulators/SRabinkarp";
import Sorting from "./pages/Sorting";
import Greedy from "./pages/Greedy";
import Dynamic from "./pages/Dynamic";
import Backtracking from "./pages/Backtracking";
import StrMatch from "./pages/StringM";
import SInsertionSort from "./simulators/SInsertionSort";
import SSelectionSort from "./simulators/SSelectionSort";
import SBubbleSort from "./simulators/SBubbleSort";
import RabinkarpTheory from "./theoryPages/RabinkarpTheory";
import NqueensTheory from "./theoryPages/NqueensTheory";
import JobSchedTheory from "./theoryPages/JobSchedTheory";
import TInsertionSort from "./theoryPages/TInsertionSort";
import TSelectS from "./theoryPages/TSelectS";
import TBubbleS from "./theoryPages/TBubbleS";
import TKruskals from "./theoryPages/TKruskals";
import TKnapsack from "./theoryPages/TKnapsack";
import TDijkstra from "./theoryPages/Tdijkstra";
import PageNotFound from "./components/NotFound";
import ULogin from "./authentication/ULogin";
import URegister from "./authentication/URegister";
import UserDash from "./components/userDash";
import AdminDash from "./components/Admin/adminDash";
import AUserDet from "./components/Admin/AuserDet";
import AFeedbacks from "./components/Admin/Afeeds";
import VAccount from "./components/verify/VAccount";
import ComF from "./feedback/comF";
import FPUser from "./components/Forgot-Password/FpUser";
import ChangePassUser from "./components/Forgot-Password/changePUser";
import DAdmins from "./components/Admin/Dadmins";

function App() {
  return (

    <BrowserRouter>
      <AppProvider>
        <Routes>

          <Route exact path="/" element={<Home />}></Route>

          {/* Authentication */}
          <Route exact path="/login" element={<ULogin />}></Route>
          <Route exact path="/register" element={<URegister userType="User" />}></Route>

          {/* pages for concept of algos */}
          <Route path="/sorting" element={<Sorting />}></Route>
          <Route path="/greedy" element={<Greedy />}></Route>
          <Route path="/dynamic" element={<Dynamic />}></Route>
          <Route path="/backtracking" element={<Backtracking />}></Route>
          <Route path="/string-match" element={<StrMatch />}></Route>

          <Route path="/:algo/feedback" element={<ComF />}></Route>

          {/* lcs */}
          {/* <Route path="/lcs" element={<Lcs />}></Route> */}
          <Route path="/lcs" element={<TLcs />}></Route>
          {/* <Route path="/lcs/feedback" element={<FLcs />}></Route> */}
          <Route path="/lcs/simulator" element={<SLcs />}></Route>

          {/* job sched */}
          {/* <Route path="/job-scheduling" element={<JobSched />}></Route> */}
          <Route path="/job-scheduling" element={<JobSchedTheory />}></Route>
          <Route path="/job-scheduling/simulator" element={<SJobSched />}></Route>
          {/* <Route path="/job-scheduling/feedback" element={<FJobS />}></Route> */}

          {/* Dijkstra */}
          <Route path="/dijkstra" element={<TDijkstra />}></Route>
          <Route path="/dijkstra/simulator" element={<SDijkstra />}></Route>
          {/* <Route path="/dijkstra/feedback" element={<FDijkstra />}></Route> */}

          {/* N queens */}
          {/* <Route path='/nqueens' element={<Nqueens />}></Route> */}
          <Route path="/nqueens" element={<NqueensTheory />}></Route>
          <Route path='/nqueens/simulator' element={<SNQueens />}></Route>
          {/* <Route path='/nqueens/feedback' element={<FNQueens />}></Route> */}

          {/* kruskals */}
          <Route path="/kruskals" element={<TKruskals />}></Route>
          <Route path="/kruskals/simulator" element={<SKruskals />}></Route>
          {/* <Route path="/kruskals/feedback" element={<FKruskals />}></Route> */}

          {/* knapsack */}
          <Route path="/knapsack" element={<TKnapsack />}></Route>
          <Route path="/knapsack/simulator" element={<SKnapsack />}></Route>
          {/* <Route path="/knapsack/feedback" element={<FKnapsack />}></Route> */}

          {/* rabinkarp */}
          {/* <Route path="/rabinkarp" element={<RabinK />}></Route> */}
          <Route path="/rabinkarp" element={<RabinkarpTheory />}></Route>
          <Route path="/rabinkarp/simulator" element={<SRabinkarp />}></Route>
          {/* <Route path="/rabinkarp/feedback" element={<FRabin />}></Route> */}

          {/* insertion */}
          <Route path="/insertion" element={<TInsertionSort />}></Route>
          <Route path="/insertion/simulator" element={<SInsertionSort />}></Route>
          {/* <Route path="/insertion/feedback" element={<FInsertion />}></Route> */}

          {/* selection */}
          <Route path="/selection" element={<TSelectS />}></Route>
          <Route path="/selection/simulator" element={<SSelectionSort />}></Route>
          {/* <Route path="/selection/feedback" element={<FSelection />}></Route> */}

          {/* bubble */}
          <Route path="/bubble" element={<TBubbleS />}></Route>
          <Route path="/bubble/simulator" element={<SBubbleSort />}></Route>
          {/* <Route path="/bubble/feedback" element={<FBubble />}></Route> */}

          <Route path="/user" element={<UserDash />}></Route>

          <Route path={process.env.REACT_APP_ADMIN_LOGIN} element={<URegister userType="Admin" />}></Route>
          <Route path="/admin" element={<AdminDash />}></Route>
          <Route path="/admin/user-details" element={<AUserDet />}></Route>
          <Route path="/admin/feedbacks" element={<AFeedbacks />}></Route>
          <Route path="/admin/admins" element={<DAdmins />}></Route>

          <Route path="/login/forgot-password" element={<FPUser />}></Route>

          <Route path="/account/user/change-password/:pT" element={<ChangePassUser />}></Route>
          <Route path="/account/user/verify/:tt" element={<VAccount />}></Route>


          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppProvider>
    </BrowserRouter >
  );
}

export default App;
