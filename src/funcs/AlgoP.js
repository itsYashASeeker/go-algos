import axios from "axios";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";


export async function AlgoPer(props) {

    // const { cuE, algoT, userD } = AppState();
    // const [currE, setCE] = cuE;

    // const algoName = expR[currE[0]][currE[1]][0];
    // const algoName = "Insertion";

    await axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/y/user/perform/algo`, { algoName: props.algoName }, {
        withCredentials: true
    })
        .then((data) => {
            console.clear();
            // window.alert(data.data);
            console.log(data.data);
        })
        .catch((err) => {
            console.clear();
            const errs = err.response.data.error;
            for (var i = 0; i < errs.length; i++) {
                console.log(errs[i]);
                // window.alert(errs[i]);
            }
        })

}