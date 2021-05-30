import { auth } from '../firebase_config';

function AccountBar(){
    return(
        <div 
            className="account-bar">
            <span 
                className="profile-button">
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