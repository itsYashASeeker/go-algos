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
            await axios.get("http://localhost:5013/y/user/g", {
                withCredentials: true
            })
                .then((data) => {
                    // console.log(data.data);
                    setUData(data.data);
                    uDD = data.data;
                })
                .catch((err) => {
                    setUData(false);
                })
            if (fullLocation.pathname === "/admin") {
                if (!uDD || uDD.isAdmin === false) {
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
            // console.log("Home");
            setCE([4, 0]);
        }
        else {
            for (var i = 0; i < expR.length; i++) {
                for (var j = 0; j < expR[i].length; j++) {
                    if (expJ === false && topicI === false && location === expR[i][j][1]) {
                        topicI = i;
                        expJ = j;
                        // console.log(expR[i][j][1]);
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

    function retElId(idname) {
        return document.getElementById(idname);
    }
    console.log(algoT);
    return (
        <AppContext.Provider value={{ cuE: [cE, setCE], algoT: [algoT, setAlgoT], userD: [uData, setUData] }}>{children}</AppContext.Provider>
    )

};

export const AppState = () => {
    return useContext(AppContext);
}

export default AppProvider;



