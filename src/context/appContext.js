import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";
import { expR } from "../data/expRoutes";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [cE, setCE] = useState([3, 0]);
    const [algoT, setAlgoT] = useState(false);
    const loc = useLocation().pathname.split("/")
    const location = loc[1];
    if(loc[2]){
        var scLocation = loc[2];
    }
    else{
        var scLocation = "";
    }
    
    useEffect(() => {
        var topicI = false;
        var expJ = false;
        window.scrollTo(0, 0);
        if (location === "/") {
            // console.log("Home");
            setCE([3, 0]);
        }
        else {
            for (var i = 0; i < expR.length; i++) {
                for (var j = 0; j < expR[i].length; j++) {
                    if (!expJ && !topicI && location === expR[i][j][1]) {
                        topicI = i;
                        expJ = j;
                        console.log([i, j]);
                        setCE([i, j]);
                        break;
                    }
                }
            }
        }

    }, [location]);

    useEffect(() => {
        if (scLocation === "") {
            setAlgoT(0);
        }
        else if (scLocation === "theory") {
            setAlgoT(1);
        }
        else if (scLocation === "simulator") {
            setAlgoT(2);
        }
        else if (scLocation === "feedback") {
            setAlgoT(3);
        }
    }, [scLocation])

    function retElId(idname) {
        return document.getElementById(idname);
    }

    return (
        <AppContext.Provider value={{ cuE: [cE, setCE], algoT: [algoT, setAlgoT] }}>{children}</AppContext.Provider>
    )

};

export const AppState = () => {
    return useContext(AppContext);
}

export default AppProvider;



