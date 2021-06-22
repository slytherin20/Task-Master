import { auth } from '../utilities/functions/firebase_config';

function AccountBar({accountHandler}){
    return(
        <div 
            className="account-bar">
            <span 
                className="profile-button" onClick={accountHandler}>
                    Account Details
            </span>
            <button 
                className="sign-out" 
                onClick={()=>auth.signOut()}>
                    Sign Out
            </button>
        </div>
    )
}

export default AccountBar;