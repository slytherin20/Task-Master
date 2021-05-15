//import { auth } from "./firebase_config";
import menuIcon from './images/menu.png';
import { useState } from "react";
import Sidebar from "./sidebar";
import AccountBar from "./accountbar";

function App(){
    const [menuState,setMenuState] =  useState(false);
    const [accountState,setAccountState] = useState(false);
    return(
       <>
       <nav 
       className="nav-bar">
           <img className = "menu-icon" 
                src={menuIcon} 
                alt="menu icon" 
                onClick={()=>setMenuState(!menuState)} />
           <span>
               Task master - A task keeping app
               </span>
           <span 
                className="coins">
                    0 coins
                    </span>
            <span
                className="notification-icon">
                    0 Notification
                </span>
           <span 
                className="account-img"
                onClick={()=>setAccountState(!accountState)}>
                    photo
                    {
                        accountState?<AccountBar 
                                        status = {accountState} 
                                        closeAccountHandler={setAccountState}/>
                                    :null
                    }
                    </span>
       </nav>
       {
           menuState?<Sidebar 
                        status = {menuState} 
                        closeMenuHandler={setMenuState} />
                    :null
       }
       </>
    )
}

export default App;