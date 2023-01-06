import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";
import DisplayTasks from './displaytasks';
import { useState,useEffect } from "react";
import { date } from "../utilities/functions/date";
import db from "../utilities/functions/firebase_config";
import firebase from "firebase/app"
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
    const dateString = date();
        const [popupStatus,setPopupStatus] = useState('');
        const [userTasks,setUserTasks] = useState([]);
        const [displayTitle,setDisplayTitle] = useState("All"); //does not need to be a state
        const [task,setTask] = useState({
            taskName:'',
            priority:'Low',
            label:'',
            color:'#003333',
            deadline: dateString
        });
        const [unsubscribeAll,setUnsubscribeAll] = useState(null);
        const [unsubscribePriority,setUnsubscribePriority] = useState(null);
        const [unsubscribeLabel,setUnsubscribeLabel] = useState(null);
    
        const collectionRef = db.collection(`users/${userID}/tasks`);
        

     useEffect(() => {
        
        displayTasks()

    }, [displayTitle])

        function changeMenuState(){
            if(popupStatus==='sidebar') setPopupStatus('')
            else setPopupStatus('sidebar');
        }
        function changeAccountState(){
           if(popupStatus==='account') setPopupStatus('')
           else setPopupStatus('account')
        }
        function updateHandler(arr){
            setUserTasks(arr)
        }
        function changedisplayTitle(selectedTag){
            setDisplayTitle(selectedTag);
        }
        function setTaskDetails(e){
            let label;
            if(e.target.name==='label'){
                if(e.target.value && e.target.value.toLowerCase()!=="all"){
                    label = e.target.value;
                }
                else{
                  
                    label = ''
                }
                setTask({
                    ...task,
                label: label
                })
            }
            else
            setTask({
                ...task,
                [e.target.name]: e.target.value
            })
        }
        function displayTasks(){
            const priorities = ["high","low","medium"];
            let displayTitleClicked = displayTitle.toLowerCase();
            displayTitleClicked ==="all"?
                     displayAllTasks()
                    :((priorities.includes(displayTitleClicked))
                                ?displayByPriority()
                                :displayByLabel()
                            )
        }
        function displayAllTasks(){
           //setUserTasks(()=>[]);
           let unsubscribe =  collectionRef
            .onSnapshot(generateSnapshot())
            //Already existed a listener. Used in case of filter clear.
            if(unsubscribeAll){
                unsubscribeAll()
            }
           setUnsubscribeAll(()=>unsubscribe)
        }
        function displayByPriority(){
           // setUserTasks(()=>[]);
            let unsubscribe = collectionRef
            .where("priority","==",displayTitle)
            .onSnapshot(generateSnapshot())
    
            //Already existed a listener.
            if(unsubscribePriority){
                unsubscribePriority()
            }
    
            setUnsubscribePriority(()=>unsubscribe)
        }
        function displayByLabel(){
         //   setUserTasks(()=>[]);
            let unsubscribe = collectionRef
            .where("customLabel","==",displayTitle)
            .onSnapshot(generateSnapshot())
            
            //Already existed a listener.
            if(unsubscribeLabel){
                unsubscribeLabel()
            }
    
            setUnsubscribeLabel(()=>unsubscribe)
        }
        function generateSnapshot(){
            let snapshot = function (querySnapshot){
                setUserTasks(
                    querySnapshot.docs.map((doc)=>{
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
                     })
                )
            }
            return snapshot;
        }
    
        function addTask(e){
            e.preventDefault()
            let taskObj = {
                    name: task.taskName,
                    priority: task.priority,
                    deadline:task.deadline,
                    inProgress:true,
                    addedAt : firebase.firestore.FieldValue.serverTimestamp()
            }
            if(task.label){
                taskObj["customLabel"] = task.label;
                taskObj["labelColor"] = task.color;
            }
            collectionRef.add(taskObj)
            
            //Notify
            notify("New task added!")
        }

    function deleteTaskHandler(id){
        //Delete the task
        deleteItem(id)

    }
    function deleteItem(id){
        collectionRef
        .doc(id)
        .delete()
    }

    function completedTaskHandler(id,status){
        collectionRef.doc(id).update({
            inProgress: !status
        })
    }
    function unsubscriber(){
        if(unsubscribeAll){
            unsubscribeAll()
        }
        if(unsubscribeLabel){
            unsubscribeLabel()
        }
        if(unsubscribePriority){
            unsubscribePriority()
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
                    userTasks={userTasks}
                    />
             }
            </div>
            <div className="box-2">
                <Form 
                task= {task} 
                setInput={setTaskDetails}
                addTaskHandler={addTask}
                />
            <DisplayTasks userTasks={userTasks} 
            deleteCompletedTaskHandler={deleteTaskHandler}
            completedTaskHandler={completedTaskHandler}
            updateTaskHandler={updateHandler}
            deleteTaskHandler={deleteTaskHandler}
            notify={notify}
            displayTasks={displayTasks}
            />
            </div>           
    </div>
</div> 
}