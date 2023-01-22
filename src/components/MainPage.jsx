import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";
import DisplayTasks from './displaytasks';
import { useState,useEffect } from "react";
import db from "../utilities/functions/firebase_config";
import { auth } from '../utilities/functions/firebase_config';

export default function MainPage({
    pictureVars,
    name,
    accountTab,
    closeTab,
    userID,
    notify,
    unsubscribeName
}){     

        const [popupStatus,setPopupStatus] = useState('');
        const [userTasks,setUserTasks] = useState([]);
        const [displayTitle,setDisplayTitle] = useState("All"); 
        const [unsubscribeListener,setUnsubscribeListener] = useState(null)
        const [sidebarLabels,setSidebarLabels] = useState({});
     
      
        const collectionRef = db.collection(`users/${userID}/tasks`);

     useEffect(() => {
        
        displayTasks()

    }, [displayTitle])

    useEffect(()=>{
        if(displayTitle==='All'){
            let labels={};
            userTasks.forEach((task)=>{
                if(labels[task.customLabel]) labels[task.customLabel] = [task.color,task.customLabel[0]+1]
                else labels[task.customLabel] = [task.color,1]
            })
            setSidebarLabels(labels)
        }
    },[userTasks])

    useEffect(()=> {if(unsubscribeListener===false){auth.signOut() }},[unsubscribeListener])

        function changeMenuState(){
            if(popupStatus==='sidebar') setPopupStatus('')
            else setPopupStatus('sidebar');
        }
        function changeAccountState(){
           if(popupStatus==='account') setPopupStatus('')
           else setPopupStatus('account')
        }
        function changedisplayTitle(selectedTag){
            setDisplayTitle(selectedTag);
        }
        function updateTasks(arr){
            setUserTasks(arr)
        }
    
        function displayTasks(){
          
           let unsubscribe =  collectionRef
            .onSnapshot(generateSnapshot())
            
            //Already existed a listener. Used in case of filter clear.
            if(unsubscribeListener){
                unsubscribeListener()
            }
           setUnsubscribeListener(()=> unsubscribe)
        }
        function generateSnapshot(){
            let snapshot = function (querySnapshot){
                
                setUserTasks(querySnapshot.docs.map((doc)=>{
                        let taskObj = {
                            id:doc.id,
                            taskName: doc.data().name,
                            addedAt: doc.data().addedAt,
                            status: doc.data().inProgress,
                            deadline: doc.data().deadline,
                            priority: doc.data().priority
                        }
                        if(doc.data().customLabel){
                            taskObj["customLabel"] = doc.data().customLabel
                            taskObj.color =  doc.data().labelColor
                        }
                       return taskObj;
                     }))

            
                
            }
            return snapshot;
        }
    
        
    function unsubscriber(){
        if(unsubscribeListener){
            unsubscribeListener()
            unsubscribeName()
            setUnsubscribeListener(false)
        }
        
     }
    return <div className="box">
            <NavBar 
            account={popupStatus==='account'} 
            menuStateHandler={changeMenuState} 
            accountStateHandler={changeAccountState}
            accountHandler = {closeTab}
            loading={pictureVars.loading}
            imgUrl = {pictureVars.url}
            unsubscriber = {unsubscriber}
        />
    <div 
        className="main-container">
            <div className="box-1">
            {
                popupStatus==='sidebar' && 
                <Sidebar 
                    closeMenuHandler={changeMenuState}
                    displayHandler={changedisplayTitle} 
                    uploadStatus = {accountTab}
                    loading={pictureVars.loading}
                    imgUrl={pictureVars.url}
                    name={name}
                    labels={sidebarLabels}
                    />
             }
            </div>
            <div className="box-2">
                <Form notify={notify} 
                collectionRef={collectionRef} 
                displayHandler={changedisplayTitle}
                />
            <DisplayTasks userTasks={userTasks} 
            notify={notify}
            displayTasks={displayTasks}
            collectionRef={collectionRef}
            displayTitle={displayTitle}
            updateTasks={updateTasks}
            />
            </div>           
    </div>
</div> 
}