import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";
import DisplayTasks from './displaytasks';
import { useState,useEffect } from "react";
import db from "../utilities/functions/firebase_config";

export default function MainPage({
    loading,
    url,
    showLoader,
    name,
    accountTab,
    closeTab,
    userID,
    notify
}){     

        const [popupStatus,setPopupStatus] = useState('');
        const [userTasks,setUserTasks] = useState([]);
        const [displayTitle,setDisplayTitle] = useState("All"); 
        const [unsubscribeListeners,setUnsubscribeListener] = useState({
            all:null,
            priority:null,
            label:null
        })
        const [sidebarLabels,setSidebarLabels] = useState({});
     
      
        const collectionRef = db.collection(`users/${userID}/tasks`);

     useEffect(() => {
        
        displayTasks()

    }, [])

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
    
        function displayTasks(){
          
           let unsubscribe =  collectionRef
            .onSnapshot(generateSnapshot())
            
            //Already existed a listener. Used in case of filter clear.
            if(unsubscribeListeners.all){
                unsubscribeListeners.all()
            }
           setUnsubscribeListener({
            ...unsubscribeListeners,
            all: unsubscribe
           })
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
        if(unsubscribeListeners.all){
            unsubscribeListeners.all()
        }
        if(unsubscribeListeners.label){
            unsubscribeListeners.label()
        }
        if(unsubscribeListeners.priority){
            unsubscribeListeners.priority()
        }
     }
    return <div className="box">
            <NavBar 
            account={popupStatus==='account'} 
            menuStateHandler={changeMenuState} 
            accountStateHandler={changeAccountState}
            accountHandler = {closeTab}
            loading={loading}
            imgUrl = {url}
            loader={showLoader}
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
                    loading={loading}
                    imgUrl={url}
                    name={name}
                    labels={sidebarLabels}
                    />
             }
            </div>
            <div className="box-2">
                <Form notify={notify} collectionRef={collectionRef}
                />
            <DisplayTasks userTasks={userTasks} 
            notify={notify}
            displayTasks={displayTasks}
            collectionRef={collectionRef}
            displayTitle={displayTitle}
            />
            </div>           
    </div>
</div> 
}