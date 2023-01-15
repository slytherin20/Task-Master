import {useEffect} from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const body = document.getElementById("body");


function Modal({children}){
    let personalDetails = children;
    useEffect(()=>{
        body.classList.add("overflow-hidden");

        return ()=>{
            body.classList.remove("overflow-hidden");
        }
    },[])

    return createPortal(<div className="freeze-screen">
        {personalDetails}
    </div>,modalRoot)
}

export default Modal;