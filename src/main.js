import { auth } from "./firebase_config";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import { useState } from "react";


function SignIn(){
   // auth.signOut()
  return(
      <h2>Thanks for signing in</h2>
  )
}

function SignUp(){
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                ],
        signInSuccessWithAuthResults: ()=> false
    }
    return(
        <>
        <h1>This is a cool app</h1>
        <FirebaseAuth uiCallback = {ui=>ui.disableAutoSignIn()} uiConfig = {uiConfig} firebaseAuth = {auth} />
        </>
    )
}

function Main(){
    const [isSignedIn, setisSignedIn] = useState(false);

    const [user] = useAuthState(auth);
    setisSignedIn(user?true:false);
    return isSignedIn?<SignIn />:<SignUp />
}

export default Main;