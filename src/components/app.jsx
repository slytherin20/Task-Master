import db, { auth, storage } from "../utilities/functions/firebase_config";
import { useState, useEffect } from "react";
import MainPage from "./MainPage.jsx";
import PersonalDetails from "./PersonalDetails";
import getImage from "../utilities/functions/GetImage";
import noPhoto from "../utilities/images/nophoto.jpg";
import useAsyncState from "../hooks/asyncState";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";


function App(){
    const [accountTab,setAccountTab] = useState(false);
    const [loading,setLoading] = useState(true);
    const [url,setUrl] = useAsyncState(null);
    const [name,setName] = useState("");
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
         displayUserInfo()
    ,[])


    
    async function imageUpload(){
    let url = await getImage(userID,storage)
        if(url){
            changeUrl(url)
        }
        else{
            setUrl(noPhoto)
        }
    }

    async function displayUserInfo(){
        imageUpload()
      displayName()
    }

    function displayName(){
        
    let unsubscribeName =  nameRef.onSnapshot(function (querySnapshot){
            if(querySnapshot.docs.length!==0){
                let data = querySnapshot.docs[0].data()
                let [firstName,lastName] = [data.first,data.last]
                setName(firstName+" "+lastName)
            }
        })
        setUnsubscribeName(()=>unsubscribeName)
    }

    function closeTab(){
        setAccountTab(!accountTab);
    }
    function changeLoading(loadingValue){
        setLoading(loadingValue)
    }
    function notify(message){
        toast.dark(message)
    }
    function showLoader(){
        loaderRef.current.classList.remove("hidden");
    }

    function changeUrl(newUrl){

        setUrl(newUrl)
        .then(()=>
        changeLoading(false)
        )
        .catch((err)=>console.log("Error getting url:",err))
    }

    function changeName(name){
        setName(name)
    }

  


    return(
              <>
              <div className="visible-screen" ref={appRef}>
            </div>
            {notFirstLogin!==undefined && 
            <PersonalDetails 
                userId={userID} 
                accountHandler={closeTab}
                changeLoading={changeLoading}
                changeUrl={changeUrl}
                nameHandler={changeName}
                notify={notify}
                notFirstTime = {notFirstLogin}
                appRef = {appRef}
                />  
            }             
        <MainPage 
        closeTab={closeTab}
        loading={loading}
        url={url}
        showLoader={showLoader}
        name={name}
        userID={userID}
        notify={notify}
        />
        <ToastContainer />
       </>
     
    )
}

export default App;