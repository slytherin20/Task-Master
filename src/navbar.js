import menuIcon from './images/menu.png';
import AccountBar from "./accountbar";

function NavBar({account,menuStateHandler,accountStateHandler}){


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
                 className="coins">
                     0 coins
                     </span>
             <span
                 className="notification-icon">
                     0 Notification
                 </span>
            <span 
                 className="account-img"
                 onClick={accountStateHandler}>
                     photo
                     {
                         account?
                                    <AccountBar />
                                    :null
                     }
                     </span>
        </nav>
      
    )
}

export default NavBar;