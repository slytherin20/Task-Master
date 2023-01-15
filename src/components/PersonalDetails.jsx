import { useState, useEffect } from "react";
import firebase from "firebase/app";
import noPhoto from '../utilities/images/nophoto.jpg';
import closeBtn from "../utilities/images/cancel.png";
import db, { auth } from "../utilities/functions/firebase_config";

export default function PersonalDetails({userId,
                                        accountHandler,
                                        notify,
                                        notFirstTime,
                                        changeUserDetails
                                        }){
   
    const [name,setName] = useState({
        first:"",
        last:""
    });
    const [imageDetails,setImageDetails] = useState({
        image: noPhoto,
        src: noPhoto,
        prefix: "nophoto.jpg",
        text:""
    })
    const [storedName,setStoredName] = useState({});
    const [storedImage,setStoredImage] = useState(null);

    
    const userID = auth.currentUser.uid;
    const collectionRef = db.collection(`users/${userID}/name`);
    const storage = firebase.storage();

    useEffect(() => {

        //Get the name from firestore
        let unsubscribe = 
            collectionRef
            .onSnapshot(function (querySnapshot){
                            querySnapshot.docs.map((doc)=>{
                                return setStoredName({
                                    id: doc.id,
                                    first: doc.data().first,
                                    last: doc.data().last
                                }
                                )
                            })
        },
        (error)=>{
            console.log(error)
        }
        )
        getImageFromDB()
        return ()=>{
            unsubscribe()
        }

    }, [])

    function getImageFromDB(){

        storage
        .ref(`users/${userId}/picture`)
        .listAll()
        .then((res)=>{
            if(res.items.length!==0) 
                {
                    setStoredImage(res.items[0].name)
                }
        })
        .catch((err)=> console.log("Error"+err))

    }

    function changeName(e,info){
        if(info==='first'){
            setName({
                first: e.target.value,
                last: name.last
            })
        }
        else{
            setName({
                first: name.first,
                last: e.target.value
              })
            }
    }

    function submitDetails(e){
        e.preventDefault()

        if(imageDetails.text==="*Please upload a picture(png/jpeg/jpg/svn)"){
            notify("Details not filled correctly.")
            return
        }
      
        //Store image
        if(imageDetails.image!==noPhoto)
            addImage()

        //Store name
        addName()

        //Notification
        notify("Details saved successfully!")

        //Store cache for storing loogedIn flag.
        if(localStorage.getItem("firstLogIn")!=="true" && !notFirstTime){
            localStorage.setItem("firstLogIn","true")
        }

    }
    function addImage(){
        //User has selected an image
        if(("profile."+imageDetails.prefix)!=="nophoto.jpg"){
            //Already exists delete first then add new image
           if(storedImage){
            storage.ref(`users/${userId}/picture/`+storedImage)
            .delete()
            .then(()=>
                addImageToDB()
            )
            .catch((err)=> console.log(err))
           }
           //Does not exist already
           else addImageToDB()
        }
    }

    function addImageToDB(){
        const storageRef =  
                storage
                .ref(`users/${userId}/picture/profile.`+imageDetails.prefix)
        
       let upload =  storageRef.put(imageDetails.image)

       //Check when is upload completed.
       upload.on('state_changed',
               ()=>{
                 changeUserDetails(null)
                },
                (error)=>{
                    console.log("Error while uploading image:",error)
                },
                ()=>{
                    upload.snapshot.ref.getDownloadURL().then((url)=>
                        {   let fullName=name.first+" "+name.last;
                            changeUserDetails(url,fullName)
                        }
                    )}
                )
        //Add a promise `then` part which notifies that data stored successfully!
        setStoredImage("profile."+imageDetails.prefix)
    }

    function addName(){
        if(name.first && name.last){
            //If name not already exist.
            if(Object.keys(storedName).length===0){
                collectionRef.add({
                    first: name.first,
                    last: name.last
                })
            }
            //If name already exist in database.
            else{
                collectionRef
                .doc(storedName.id)
                .update({
                    first: name.first,
                    last: name.last
                })
            }
        }
    }
    function uploadImage(e){

        if(e.target.files[0]){

            let file = e.target.files[0];
            let prefix = file.name.split(".").pop()
            if(prefix.toLowerCase()==="png"||
            prefix.toLowerCase()==="jpeg"||
            prefix.toLowerCase()==="jpg"||
            prefix.toLowerCase()==="svn")
                                {
                                    let reader = new FileReader()
                                    reader.readAsDataURL(file)
                                    reader.onloadend = ()=>{
                                                setImageDetails({
                                                    image: file,
                                                    src: reader.result,
                                                    prefix: prefix,
                                                    text: ""
                                                })
                                             }
                                }
                                
            else {

                imageDetails.text("*Please upload a picture(png/jpeg/jpg/svn)")
            }

        }

    }
        return(
            <div 
                className="personal-details">
                    {  
                        notFirstTime &&
                            <img
                                className="cancel-icon"
                                src={closeBtn} 
                                alt="close-tab"
                                onClick={accountHandler}>
                            </img>
                    }
                <form 
                    onSubmit={submitDetails} className="form-details">
                        <h3 className="personal-details-title">Personal Details</h3>
                        <img 
                            className="submit-image"
                            src={imageDetails.src} 
                            alt="display"/>
                    <label className="personal-details-form">
                            Please provide your picture:
                        <input 
                            type="file" 
                            onChange={uploadImage} 
                            className="file-inp"
                            accept=".png,.jpeg,.jpg,.svn" required>
                        </input>
                        <span 
                            style={{color: "red"}}>
                                {imageDetails.text}
                        </span>
                    </label>
                    <label className="names">
                        Enter your name:
                    <div 
                        className="name-field">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            className="first-name"
                            required 
                            onChange={(e)=>changeName(e,"first")}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            className="last-name"
                            required 
                            onChange={(e)=>changeName(e,"last")}>
                        </input>
                    </div>
                    </label>
                    <button className="details-btn">Save</button>
                </form>
            </div>
        )
}