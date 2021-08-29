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
        <div className="app-name">
            <h1 className="app-name-main">Task Master:</h1>
            <h2 className="app-name-sub">A task managing app</h2>
        </div>
        <StyledFirebaseAuth className = "sign-in-options" uiCallback = {ui=>ui.disableAutoSignIn()} uiConfig = {uiConfig} firebaseAuth = {auth} />
        </div>
    )
}

export default SignUp;