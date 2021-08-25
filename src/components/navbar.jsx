import menuIcon from '../utilities/images/menu.png';
import AccountBar from "./accountbar";
import Loader from "react-loader-spinner";

function NavBar({account,
                menuStateHandler,
                accountStateHandler,
                accountHandler,
                loading,
                imgUrl
            }){


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
                {
                    loading? <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={20}
                                width={20}
                                />
                            : <img className = "nav-profile-pic" 
                                src={imgUrl} 
                                alt="profile-pic"
                               />
                        
                } 
                     {
                        account &&
                        <AccountBar accountHandler = {accountHandler}/> 
                     }
            </span>
        </nav>
      
    )
}

export default NavBar;