import { useAuthState } from "react-firebase-hooks/auth";
import App from "./app";
import SignUp from "./SignUp";
import { auth } from "../utilities/functions/firebase_config";

function Main(){
    const [user] = useAuthState(auth);
   return user?<App />:<SignUp />
}

export default Main;