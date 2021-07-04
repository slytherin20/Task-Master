import noPhoto from "../images/nophoto.jpg";

async function getImage(userId,storage){

    let image = noPhoto;

    let res = await storage.ref(`users/${userId}/picture`)
                        .list({maxResults: 1}).catch((err)=> console.log(err))
                        
    if(res.items.length!==0){
        image = res.items[0].getDownloadURL()
    }
    
    return image;

}

export default getImage;