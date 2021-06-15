import { useState, useEffect } from "react";
import firebase from "firebase/app";
import noPhoto from '../images/nophoto.jpg';
import closeBtn from "../images/cancel.png";
import db, { auth } from "../firebase_config";

export default function PersonalDetails({userId}){
    //States
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [image,setImage] = useState(noPhoto);
    const [imageName,setImageName] = useState("nophoto.jpg");
    const [imageText,setImageText] = useState("");
    const [imageSrc,setImageSrc] = useState(noPhoto);
    const [storedName,setStoredName] = useState({});
    const [storedImage,setStoredImage] = useState(null);

    //Collection ref
    const userID = auth.currentUser.uid;
    const collectionRef = db.collection(`users/${userID}/name`);

    useEffect(() => {
        //Get the name from firestore
        collectionRef.onSnapshot(function (querySnapshot){
                querySnapshot.docs.map((doc)=>{
                    setStoredName({
                        id: doc.id,
                        first: doc.data().first,
                        last: doc.data().last
                    }
                    )
                })
        },
        (error)=>{
            console.log("Name does not exist:",error)
        }
        )
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
        if(imageName!=="nophoto.jpg"){
            const storageRef = firebase
                                .storage()
                                .ref(`users/${userId}/picture/`+imageName)
            storageRef.put(image);
        }
        //Store name
        addName()
       
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
            let fileName = file.name;
            if(fileName.search(/.png/i)>=0 ||
                fileName.search(/.jpeg/i)>=0   ||
                fileName.search(/.jpg/i)>=0 )
                                {
                                    let reader = new FileReader()
                                    reader.readAsDataURL(file)
                                    reader.onloadend = ()=>{
                                                setImageSrc(reader.result)
                                                setImage(file)
                                                setImageText("");
                                                setImageName(fileName)
                                             }
                                }
                                
            else {
                setImageText("*Please upload a picture(png/jpeg/jpg)")
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
                                onClick={()=>console.log("Close tab")}>
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
                            accept=".png,.jpeg,.jpg">
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