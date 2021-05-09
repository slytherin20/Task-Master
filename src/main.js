import { auth } from "./firebase_config";
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
        signInSuccessWithAuthResults: ()=> false
    }
    return(
        <>
        <h1>This is a cool app</h1>
        <StyledFirebaseAuth uiCallback = {ui=>ui.disableAutoSignIn()} uiConfig = {uiConfig} firebaseAuth = {auth} />
        </>
    )
}

function Main(){

    const [user] = useAuthState(auth);
    return user?<App />:<SignUp />
}

export default Main;