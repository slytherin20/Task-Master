import menuIcon from '../utilities/images/menu.png';
import AccountBar from "./accountbar";
import getImage from "../utilities/functions/GetImage";
import useAsyncState from "../utilities/functions/asyncState";
import { useState, useEffect } from "react";

function NavBar({account,menuStateHandler,accountStateHandler,accountHandler,uploadStatus}){

    const [image,setImage] = useAsyncState(null)
   // const [imageStatus,setImageStatus] = useState(false)

    useEffect(() => {

        getImage()
        .then((url)=>
        {   if(url){
            setImage(url)
            }
        }
        )
        console.log("Status:",uploadStatus)
    }, [uploadStatus])

    return(
        <nav 
            className="nav-bar">
            <img className = "menu-icon" 
                src={menuIcon} 
                alt="menu icon" 
                onClick={menuStateHandler} />
            <span>
                Task master - A task keeping app
            </span>
            <span 
                className="account-img"
                onClick={accountStateHandler}>
                <img className = "nav-profile-pic" 
                     src={image} 
                     alt="profile-pic"
                     loading="eager"/>
                     {
                        account &&
                        <AccountBar accountHandler = {accountHandler}/> 
                     }
            </span>
        </nav>
      
    )
}

export default NavBar;