import { auth } from '../utilities/functions/firebase_config';

function AccountBar({accountHandler}){
    function signOut(){
        localStorage.setItem("logIn","false")
        auth.signOut()
    }
    return(
        <div 
            className="account-bar">
            <span 
                className="profile-btn" onClick={accountHandler}>
                    Account Details
            </span>
            <button 
                className="sign-out" 
                onClick={signOut}>
                    Sign Out
            </button>
        </div>
    )
}

export default AccountBar;