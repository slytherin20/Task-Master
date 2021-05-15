//import { auth } from "./firebase_config";
import menuIcon from './images/menu.png';
import cancelIcon from './images/cancel.png';
import { useState } from "react";

function Sidebar({status,closeMenuHandler}){
    if(status){
        return (
            <div 
                className="sidebar-menu">
                <img src={cancelIcon} 
                        className="cancel-icon" 
                        alt="close" 
                        onClick={()=>closeMenuHandler(!status)}/>
                <span>
                        Name
                </span>
                <img 
                        src="" 
                        alt="personal dp">
                </img>

            </div>
        )
    }
}

function App(){
    const [menuState,setMenuState] =  useState(false);
    return(
       <>
       <nav 
       className="nav-bar">
           <img className = "menu-icon" 
                src={menuIcon} 
                alt="menu icon" 
                onClick={()=>setMenuState(true)} />
           <span>
               Task master - A task keeping app
               </span>
           <span 
                className="coins">
                    0 coins
                    </span>
           <span 
                className="account-img">
                    photo
                    </span>
       </nav>
       {
           menuState?<Sidebar status = {menuState} closeMenuHandler={setMenuState} />:null
       }
       </>
    )
}

export default App;