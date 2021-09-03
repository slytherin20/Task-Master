import { auth } from '../utilities/functions/firebase_config';
import Loader from "react-loader-spinner";

function AccountBar({accountHandler,loader}){

    function changeLocalInfo(){
       localStorage.clear();
       signOut()
    }

    function signOut(){
        loader()
        setTimeout(() => {
            auth.signOut()
        }, 1000);
    }


    return(<>
        <div className="loading hidden">
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={80}
                                width={80}
                                />
        </div>
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