import menuIcon from '../utilities/images/menu.png';
import AccountBar from "./accountbar";
import getImage from "../utilities/functions/GetImage";
import { useState, useEffect } from "react";
import noPhoto from "../utilities/images/nophoto.jpg"

function NavBar({account,
                menuStateHandler,
                accountStateHandler,
                accountHandler,
                userId,
                storage,
                changeStatus,
                saveDetails    
            }){

    const [image,setImage] = useState(noPhoto)

    useEffect(() => {
        imageUpload()
    }, [])

    useEffect(() => {
        if(saveDetails){
            imageUpload()
            changeStatus(false)
        }
    }, [saveDetails])

   async function imageUpload(){

    let url = await getImage(userId,storage)
    console.log(url)

    if(url){

      setImage(url)
        console.log("Image downloaded!")
      }
    }

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
                     loading="lazy"/>
                     {
                        account &&
                        <AccountBar accountHandler = {accountHandler}/> 
                     }
            </span>
        </nav>
      
    )
}

export default NavBar;