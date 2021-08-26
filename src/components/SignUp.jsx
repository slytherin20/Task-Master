import { auth } from "../utilities/functions/firebase_config";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Image from "../utilities/images/050-choices-monochrome.svg";


function SignUp(){
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                ]

    }
    return(
        <div className="main-page">
        <nav className="nav-bar">Task Master - A to do tracking app</nav>
        <div className="signup-page">
        <img src={Image} className="signup-img" alt="" />
        <StyledFirebaseAuth className = "sign-in-options" uiCallback = {ui=>ui.disableAutoSignIn()} uiConfig = {uiConfig} firebaseAuth = {auth} />
        </div>
        </div>
    )
}

export default SignUp;