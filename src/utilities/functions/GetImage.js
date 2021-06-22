import firebase from "firebase/app";
import { auth } from "./firebase_config";
import noPhoto from "../images/nophoto.jpg";

async function getImage(){

    const storage = firebase.storage();
    const userId = auth.currentUser.uid;
    let image = noPhoto;


    await storage.ref(`users/${userId}/picture`)
        .list({maxResults: 1})
        .then((res)=>{
            if(res.items.length!==0) {
               image =  getURL(res.items[0])
            }

        })
    
    return image;

}

async function getURL(imageRef){
    let imageURL = null;

    await imageRef.getDownloadURL()
    .then((url)=>
       { imageURL = url
       }
    )
    .catch((err)=> console.log("Error",err))

    return imageURL;
}

export default getImage;

