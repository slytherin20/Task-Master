function AccountBar({accountHandler,unsubscribe}){

    function changeLocalInfo(){
       localStorage.clear();
       unsubscribe()
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