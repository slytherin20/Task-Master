import { auth } from '../utilities/functions/firebase_config';

function AccountBar({accountHandler,loader,unsubscribe}){

    function changeLocalInfo(){
       localStorage.clear();
       signOut()
    }

    function signOut(){
        unsubscribe()
        loader()
        setTimeout(() => {
            auth.signOut()
        }, 1000);
    }


    return(<>
        <div 
            className="account-bar">
            <span 
                className="profile-btn" onClick={accountHandler}>
                    Account Details
            </span>
            <button 
                className="sign-out" 
                onClick={changeLocalInfo}>
                    Sign Out
            </button>
        </div>
        </>
    )
}

export default AccountBar;