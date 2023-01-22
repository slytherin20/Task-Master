import { useAuthState } from "react-firebase-hooks/auth";
import App from "./app";
import SignUp from "./SignUp";
import { auth } from "../utilities/functions/firebase_config";
import Loader from "react-loader-spinner";
import Modal from "./Modal";
function Main(){
    const [user,loading,error] = useAuthState(auth);

    if(loading){
            <Modal>

                <Loader
                    type="TailSpin"
                    color="rgb(45, 59, 255)"
                    height={50}
                    width={50}/>
            </Modal>
                
    }
    if(error){
        <h1>Woops! An error has occured. Please try refreshing the page.</h1>
    }

   return  user?<App />: <SignUp />
}

export default Main;