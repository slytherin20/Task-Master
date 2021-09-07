import { useAuthState } from "react-firebase-hooks/auth";
import App from "./app";
import SignUp from "./SignUp";
import { auth } from "../utilities/functions/firebase_config";
import Loader from "react-loader-spinner";

function Main(){
    const [user,loading,error] = useAuthState(auth);

    if(loading){
        return <div className="main-screen">
            <div className="loader-container">
            <Loader
                type="TailSpin"
                color="rgb(45, 59, 255)"
                height={100}
                width={100}/>
            </div>
        </div>
                
    }
    if(error){
        <h1>Woops! An error has occured. Please try refreshing the page.</h1>
    }

   return  user?<App />: <SignUp />
}

export default Main;