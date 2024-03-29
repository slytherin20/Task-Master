import db, { auth, storage } from "../utilities/functions/firebase_config";
import { useState, useEffect } from "react";
import MainPage from "./MainPage.jsx";
import PersonalDetails from "./PersonalDetails";
import getImage from "../utilities/functions/GetImage";
import noPhoto from "../utilities/images/nophoto.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";


function App(){
    const [accountTab,setAccountTab] = useState(false);
    const [pictureVars,setPictureVars] = useState({
        url: null,
        loading: true,
        name:""
    })
    const [unsubscribeName,setUnsubscribeName] = useState(null);


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
            {notFirstLogin!==undefined && 
            <Modal>
                <PersonalDetails 
                    userId={userID} 
                    accountHandler={closeTab}
                    changeUserDetails = {changeUserDetails}
                    notify={notify}
                    notFirstTime = {notFirstLogin}
                    />  
            </Modal>
            }             
        <MainPage 
        closeTab={closeTab}
        pictureVars = {pictureVars}
        name={pictureVars.name}
        userID={userID}
        notify={notify}
        unsubscribeName = {unsubscribeName}
        />
        <ToastContainer />
       </>
     
    )
}

export default App;