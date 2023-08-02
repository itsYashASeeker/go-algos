
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { expR } from "../data/expRoutes";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [uData, setUData] = useState(false);
    const [cE, setCE] = useState([3, 0]);
    const [algoT, setAlgoT] = useState(false);
    const fullLocation = useLocation();
    const loc = fullLocation.pathname.split("/");
    const location = loc[1];
    const navigate = useNavigate();

    if (loc[2]) {
        var scLocation = loc[2];
    }
    else {
        var scLocation = "";
    }

    useEffect(() => {
        const fetchUser = async () => {
            var uDD;
            await axios.get(process.env.REACT_APP_BACKEND_DOMAIN + "/y/user/g", {
                withCredentials: true
            })
                .then((data) => {
                    console.clear();
                    setUData(data.data);
                    uDD = data.data;
                    console.log(uDD.isAdmin ? "Hello Admin" : "Hello User");
                })
                .catch((err) => {
                    setUData(false);
                    console.clear();
                    var errs = err.response.data.error;
                    for (var i = 0; i < errs.length; i++) {
                        console.log(errs[i]);
                    }
                })
            if (fullLocation.pathname.split("/")[1] === "admin") {
                if (!uDD || uDD.isAdmin === false) {
                    navigate("/");
                }
            }
            if (fullLocation.pathname.split("/")[1] === "user") {
                if (!uDD || uDD.isAdmin === true) {
                    navigate("/");
                }
            }
        }
        fetchUser();

    }, [fullLocation]);


    useEffect(() => {
        var topicI = false;
        var expJ = false;
        window.scrollTo(0, 0);
        if (location === "/") {
            setCE([4, 0]);
        }
        else {
            for (var i = 0; i < expR.length; i++) {
                for (var j = 0; j < expR[i].length; j++) {
                    if (expJ === false && topicI === false && location === expR[i][j][1]) {
                        topicI = i;
                        expJ = j;
                        setCE([i, j]);
                        break;
                    }
                }
            }
        }
        if (expJ === false && topicI === false) {
            const arr1 = [4, 0];
            setCE(arr1);
        }

    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (scLocation === "") {
            setAlgoT(0);
        }
        else if (scLocation === "simulator") {
            setAlgoT(1);
        }
        else if (scLocation === "feedback") {
            setAlgoT(2);
        }
    }, [scLocation])

    return (
        <AppContext.Provider value={{ cuE: [cE, setCE], algoT: [algoT, setAlgoT], userD: [uData, setUData] }}>{children}</AppContext.Provider>
    )

};

export const AppState = () => {
    return useContext(AppContext);
}

export default AppProvider;



