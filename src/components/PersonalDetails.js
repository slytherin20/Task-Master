import { useState, useEffect } from "react";
import firebase from "firebase/app";
import noPhoto from '../utilities/images/nophoto.jpg';
import closeBtn from "../utilities/images/cancel.png";
import db, { auth } from "../utilities/functions/firebase_config";

export default function PersonalDetails({userId,accountHandler}){
   
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [image,setImage] = useState(noPhoto);
    const [imagePrefix,setImagePrefix] = useState("nophoto.jpg");
    const [imageText,setImageText] = useState("");
    const [imageSrc,setImageSrc] = useState(noPhoto);
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
        return ()=>{
            unsubscribe()
        }

    }, [])

    useEffect(() => {

       //Get the image from database if already exists
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

    }, [])



    //User info
    const metadata = auth.currentUser.metadata;
    const firstLogin = metadata.creationTime;
    const lastLogin = metadata.lastSignInTime;

    function changeName(e,name){
        name==="first"?setFirstName(e.target.value)
                      :setLastName(e.target.value)
    }

    function submitDetails(e){
        e.preventDefault()
        //Store image
        addImage()
        //Store name
        addName()

        //Close the tab.
        accountHandler()
       
    }
    function addImage(){
        //User has selected an image
        if(("profile."+imagePrefix)!=="nophoto.jpg"){
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
                .ref(`users/${userId}/picture/profile.`+imagePrefix)
        storageRef.put(image)
        //Add a promise `then` part which notifies that data stored successfully!
        setStoredImage("profile."+imagePrefix)
    }

    function addName(){

        if(firstName && lastName){

            //If name not already exist.
            if(Object.keys(storedName).length===0){
                collectionRef.add({
                    first: firstName,
                    last: lastName
                })
            }
            //If name already exist in database.
            else{
                collectionRef
                .doc(storedName.id)
                .update({
                    first: firstName,
                    last: lastName,
                })
            }
        }
    }

    function uploadImage(e){

        if(e.target.files[0]){

            let file = e.target.files[0];
            let prefix = file.name.split(".").pop()
            console.log(prefix)
            if(prefix.toLowerCase()==="png"||
            prefix.toLowerCase()==="jpeg"||
            prefix.toLowerCase()==="jpg"||
            prefix.toLowerCase()==="svn")
                                {
                                    let reader = new FileReader()
                                    reader.readAsDataURL(file)
                                    reader.onloadend = ()=>{
                                                setImageSrc(reader.result)
                                                setImage(file)
                                                setImageText("");
                                                setImagePrefix(prefix)
                                             }
                                }
                                
            else {
                setImageText("*Please upload a picture(png/jpeg/jpg/svn)")
            }

        }

    }
        return(
            <div 
                className="personal-details">
                    {   firstLogin!==lastLogin &&
                        <button>
                            <img 
                                src={closeBtn} 
                                alt="close-tab"
                                onClick={accountHandler}>
                            </img>
                        </button>
                    }
                <form 
                    onSubmit={submitDetails}>
                        <img 
                            src={imageSrc} 
                            alt="display"/>
                    <label>
                            Please provide your picture:
                        <input 
                            type="file" 
                            onChange={uploadImage} 
                            accept=".png,.jpeg,.jpg,.svn">
                        </input>
                        <span 
                            style={{color: "red"}}>
                                {imageText}
                        </span>
                    </label>
                    <label>
                        Enter your name:
                    </label>
                    <div 
                        className="name-field">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            required 
                            onChange={(e)=>changeName(e,"first")}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            required 
                            onChange={(e)=>changeName(e,"last")}>
                        </input>
                    </div>
                    <button>Save</button>
                </form>
            </div>
        )
}