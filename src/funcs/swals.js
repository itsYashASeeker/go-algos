import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function ErrNoti(props) {
    Swal.fire({
        title: "Error Occured",
        imageUrl:
            "https://img.freepik.com/free-vector/man-thinking-concept-illustration_114360-7920.jpg?w=740&t=st=1689918675~exp=1689919275~hmac=4cded89fac1c49e9b36d9d1d45aac7731d6854d89839aeb8da130c8d9cf98512",
        imageHeight: "200",
        text: props.errMessage,
        confirmButtonColor: "rgb(185,28,28)",
    });
}

export async function SuccNoti(props) {
    const resultS = await Swal.fire({
        title: props.title,
        imageUrl:
            "https://img.freepik.com/free-vector/hand-drawn-compliment-illustration_52683-107992.jpg?w=740&t=st=1689921072~exp=1689921672~hmac=dd32ed6542762e3a18446291da3007b4e9c926a649f1e78f87f4e65612a8b59f",
        imageHeight: "200",
        text: props.message,
        confirmButtonText: "Ok",
    })
        .then((result) => {
            return result;
        })
    return resultS;
}


