import { auth } from "../firebase_config";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import App from './app';

function SignUp(){


    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                ],
        signInSuccessWithAuthResults: ()=> false,

    }
    return(
        <div className="main-page">
        <nav className="nav-bar">Task Master - A to do tracking app</nav>
        <StyledFirebaseAuth className = "sign-in-options" uiCallback = {ui=>ui.disableAutoSignIn()} uiConfig = {uiConfig} firebaseAuth = {auth} />
        </div>
    )
}

function Main(){

    const [user] = useAuthState(auth);
    return user?<App />:<SignUp />
}

export default Main;