import db, { auth, storage } from "../utilities/functions/firebase_config";
import { useState, useEffect } from "react";
import MainPage from "./MainPage.jsx";
import PersonalDetails from "./PersonalDetails";
import getImage from "../utilities/functions/GetImage";
import noPhoto from "../utilities/images/nophoto.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";


function App(){
    const [accountTab,setAccountTab] = useState(false);
    const [pictureVars,setPictureVars] = useState({
        url: null,
        loading: true,
        name:""
    })
    const [unsubscribeName,setUnsubscribeName] = useState(null);


    //App Ref
    const appRef = useRef();
    const loaderRef = useRef();

    //Firestore
    const userID = auth.currentUser.uid;
     const nameRef = db.collection(`users/${userID}/name`)

    //Authentication details
    let userMetaData = auth.currentUser.metadata;
    let creationDay = userMetaData.creationTime;
    let lastLogin = userMetaData.lastSignInTime;
    let notFirstLogin;
    if(creationDay===lastLogin && 
    !(localStorage.getItem("firstLogIn")==="true")){
        notFirstLogin = false
    }
    else if(accountTab){
        notFirstLogin = true}


    //Get the user info from database
    useEffect(()=>
      getPersonalDetails()
    ,[])


    async function getPersonalDetails(){
        let name = '';
        let unsubscribeName =  nameRef.onSnapshot(function (querySnapshot){
            if(querySnapshot.docs.length!==0){
                let data = querySnapshot.docs[0].data()
                let [firstName,lastName] = [data.first,data.last]
                name = firstName+" "+lastName;
            }
        })
        setUnsubscribeName(()=>unsubscribeName)
        let url = await getImage(userID,storage)
        if(url){
          changeUserDetails(url,name)
        }
        else{
        changeUserDetails(noPhoto,name)
        }
    }
 
    function closeTab(){
        setAccountTab(!accountTab);
    }
   
    function notify(message){
        toast.dark(message)
    }
    function showLoader(){
        loaderRef.current.classList.remove("hidden");
    }

    function changeUserDetails(url,name){
        if(url)
        setPictureVars({
            url:url,
            loading: false,
            name: name
        })
        else 
        setPictureVars({
            ...pictureVars,
            loading: true,
            name: name
        })
    }


    return(
              <>
              <div className="visible-screen" ref={appRef}>
            </div>
            {notFirstLogin!==undefined && 
            <PersonalDetails 
                userId={userID} 
                accountHandler={closeTab}
                changeUserDetails = {changeUserDetails}
                notify={notify}
                notFirstTime = {notFirstLogin}
                appRef = {appRef}
                />  
            }             
        <MainPage 
        closeTab={closeTab}
        pictureVars = {pictureVars}
        showLoader={showLoader}
        name={pictureVars.name}
        userID={userID}
        notify={notify}
        />
        <ToastContainer />
       </>
     
    )
}

export default App;