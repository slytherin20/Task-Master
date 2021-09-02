import db, { auth, storage } from "../utilities/functions/firebase_config";
import firebase from "firebase/app"
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";
import Display from "./displaytasks";
import { date } from "../utilities/functions/date";
import DisplayCompleted from "./displaycompleted";
import PersonalDetails from "./PersonalDetails";
import getImage from "../utilities/functions/GetImage";
import noPhoto from "../utilities/images/nophoto.jpg";
import useAsyncState from "../utilities/functions/asyncState";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";

function App(){
    //Current date
    const dateString = date()

    //States
    const [menuState,setMenuState] =  useState(false);
    const [accountState,setAccountState] = useState(false);
    const [taskName,setTaskName] = useState("");
    const [priority,setPriority] = useState("Low");
    const [label,setLabel] = useState("");
    const [color,setColor] = useState("#003333");
    const [deadline,setDeadline] = useState(dateString);
    const [allLabels,setAllLabels] = useState({});
    const [displayArr,setDisplayArr] = useState([]);
    const [completedArr,setCompletedArr] = useState([]);
    const [displayTitle,setDisplayTitle] = useState("All");
    const [accountTab,setAccountTab] = useState(false);
    const [loading,setLoading] = useState(true);
    const [url,setUrl] = useAsyncState(null);
    const [name,setName] = useState("");

    //App Ref
    const appRef = useRef();

    //Firestore
    const userID = auth.currentUser.uid;
    const collectionRef = db.collection(`users/${userID}/tasks`);
    const sideBarRef = db.collection(`users/${userID}/labels`);
    const completedListRef = db.collection(`users/${userID}/completed`)
    const nameRef = db.collection(`users/${userID}/name`)

    //Authentication details
    let userMetaData = auth.currentUser.metadata;
    let creationDay = userMetaData.creationTime;
    let lastLogin = userMetaData.lastSignInTime;

    //Get the data from database
    useEffect(()=>
        displayElements()
    ,[])

    //Display tasks as per the tag clicked.
    useEffect(() => {
        
        displayTasks()

    }, [displayTitle])


    
    async function imageUpload(){
    let url = await getImage(userID,storage)
        if(url){
            changeUrl(url)
        }
        else{
            setUrl(noPhoto)
        }
    }

    function displayElements(){
        addDefaultValue()
        addCompletedTasks()
        imageUpload()
        displayName()

    }

    function displayName(){
        
         nameRef.onSnapshot(function (querySnapshot){
            if(querySnapshot.docs.length!==0){
                let data = querySnapshot.docs[0].data()
                let [firstName,lastName] = [data.first,data.last]
                setName(firstName+" "+lastName)
            }
        })
    }

     function addDefaultValue(){
        getSideBarLabels()
    }
   
   function getSideBarLabels(){
            sideBarRef.onSnapshot(function (querySnapshot){
           querySnapshot.docs.map((doc)=>
           (
                setAllLabels((prevState)=>(
                   {
                       ...prevState,
                       [doc.data().labelName]:[doc.id,doc.data().color,doc.data().count]
                   }
               ))
           ))
        })
    }

    //Input handlers
    function setNameHandler(e){
         setTaskName(e.target.value)
    }
    function setPriorityHandler(e){
        setPriority(e.target.value)
    }
    function setLabelHandler(e){
        //Label should not be All or null.
        if(e.target.value && e.target.value.toLowerCase()!=="all"){
            setLabel(e.target.value)
        }
        else{
            setLabel("")
        }
    }
    function setDeadlineHandler(e){
        setDeadline(e.target.value)
    }
    function setColorHandler(e){
        setColor(e.target.value);
    }
    function changeMenuState(){
        setMenuState(!menuState)
    }
    function changeAccountState(){
        setAccountState(!accountState)
    }
    function changedisplayTitle(selectedTag){
        setDisplayTitle(selectedTag);
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
    function updateHandler(arr){
        setDisplayArr(arr)
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

    function completedTaskHandler(id,name,deadline,label){
        let taskObj = {
            name:name,
            deadline: deadline.split("-").reverse().join("-")
        }
        if(label){
            taskObj["customLabel"] = label
        }
         //Put it into completed task list.
         completedListRef.add(taskObj)
        
        //Delete task from task list
        deleteItem(id)


    }
    function deleteTaskHandler(id,label){
        //Delete the task
        deleteItem(id)

        //Decreement the sidebar label count
        if(label)
        decreementCount(label)
    }
    function deleteItem(id){
        collectionRef
        .doc(id)
        .delete()
    }
    function deleteCompletedTaskHandler(id,label){
        completedListRef
        .doc(id)
        .delete()

        //Decreement the sidebar label count
        if(label)
        decreementCount(label)
    }

    function decreementCount(label){
        let newValue = allLabels[label][2]-1;
        let id = allLabels[label][0];
        sideBarRef.doc(id).update({
           count: newValue
       })
       .then(()=>{
           if(newValue===0){
                sideBarRef.doc(id).delete()
                setAllLabels(delete allLabels[label])
           }
       })
       .catch((err)=> console.log(err))
    }
    

    //Adding data to Firestore
    function addTask(e){
        e.preventDefault()
        let taskObj = {
                name: taskName,
                priority: priority,
                deadline:deadline,
                inProgress:true,
                addedAt : firebase.firestore.FieldValue.serverTimestamp()
        }
        if(label){
            taskObj["customLabel"] = label;
            taskObj["labelColor"] = color;
            //Check the labels in sidebar for existing labels
            checkLabels()
        }
        collectionRef.add(taskObj)
        
        //Notify
        notify("New task added!")

    }


    //Check if a custom label already exists
    function checkLabels(){
        let notExists = true
        if(Object.keys(allLabels).length>1){
            for(let key in allLabels){
                let selectedLabel = allLabels[key];
                //When label already exists
                if(key.toLowerCase()===label.toLowerCase()){
                    notExists = false
                    //When label color is now changed.
                    if(selectedLabel[1]!==color){
                        sideBarRef
                        .doc(selectedLabel[0])
                        .update(
                            {
                                color: color,
                                count: selectedLabel[2] + 1
                            }
                        )
                      }
                      //Label color remains unchanged.
                      else{
                        sideBarRef
                        .doc(selectedLabel[0])
                        .update(
                            {
                                count: selectedLabel[2] + 1
                            })
                      }
                }
            }
            if(notExists) addLabels()
        }
         else addLabels()     
    }

    function addLabels(){
        sideBarRef.add({
            labelName: label,
            color: color,
            count:1
        })
    }



    //Getting data from Firestore and displaying
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
        setDisplayArr([]);
        collectionRef
        .onSnapshot(generateSnapshot())
    }
    function displayByPriority(){
        setDisplayArr([]);
        collectionRef
        .where("priority","==",displayTitle)
        .onSnapshot(generateSnapshot())
    }
    function displayByLabel(){
        setDisplayArr([]);
        collectionRef
        .where("customLabel","==",displayTitle)
        .onSnapshot(generateSnapshot())
    }
    function generateSnapshot(){
        let snapshot = function (querySnapshot){
            setDisplayArr(
                querySnapshot.docs.map((doc)=>{
                    let taskObj = {
                        id:doc.id,
                        taskName: doc.data().name,
                        addedAt: doc.data().addedAt,
                        status: doc.data().inProgress,
                        deadline: doc.data().deadline,
                        priority: doc.data().priority,
                    }
                    if(doc.data().customLabel){
                        taskObj["customLabel"] = doc.data().customLabel
                    }
                   return taskObj;
                 })
            )
        }
        return snapshot;
    }

    //Getting completed tasks from firestore
    function addCompletedTasks(){
        completedListRef
        .onSnapshot(function (querySnapshot){
            setCompletedArr( querySnapshot.docs.map((doc=>{
                let taskObj = {
                    id: doc.id,
                    taskName: doc.data().name,
                    deadline: doc.data().deadline
                    }
                    if(doc.data().customLabel){
                        taskObj["customLabel"] = doc.data().customLabel
                    }
                    return taskObj;
            })))
           
        })
    }
    

    return(
              <>
              <div className="visible-screen" ref={appRef}>
                </div>
              {   
            creationDay===lastLogin && 
            !(localStorage.getItem("firstLogIn")==="true") &&
            <PersonalDetails 
                userId={userID} 
                accountHandler={closeTab}
                changeLoading={changeLoading}
                changeUrl={changeUrl}
                nameHandler={changeName}
                notify={notify}
                notFirstTime = {false}
                appRef = {appRef}
                />               
        }
        <div className="box">
            <NavBar 
            account={accountState} 
            menuStateHandler={changeMenuState} 
            accountStateHandler={changeAccountState}
            accountHandler = {closeTab}
            loading={loading}
            imgUrl = {url}
                />
        <div 
                className="main-container">
                    <div className="box-1">
                    {
                        menuState && 
                        <Sidebar 
                            closeMenuHandler={changeMenuState}
                            labels = {allLabels}
                            displayHandler={changedisplayTitle} 
                            uploadStatus = {accountTab}
                            loading={loading}
                            imgUrl={url}
                            name={name}/>
                     }
                    </div>
                    <div className="box-2">
                    <Form 
                        task= {taskName} 
                        changeNameHandler={setNameHandler}
                        priority={priority}
                        changePriorityHandler={setPriorityHandler}
                        label={label}
                        changeLabelHandler={setLabelHandler}
                        color={color}
                        changeColorHandler={setColorHandler}
                        deadline={deadline}
                        changeDeadlineHandler={setDeadlineHandler}
                        date={dateString}
                        addTaskHandler={addTask}
                        notify={notify}
                        />
                    <div className="display-container">
                            <Display 
                                tasks={displayArr} 
                                completedTask={completedTaskHandler} 
                                deleteTask={deleteTaskHandler}
                                notify={notify}
                                updateDisplayArr = {updateHandler}
                                displayTasks = {displayTasks} />
                            <DisplayCompleted 
                                tasks = {completedArr}
                                deleteTask = {deleteCompletedTaskHandler}
                                notify={notify} />
                                    
                    </div>
                    </div>           
            </div>
        </div> 
        {
                accountTab && 
                <PersonalDetails
                userId={userID} 
                accountHandler={closeTab}
                changeLoading={changeLoading}
                changeUrl={changeUrl}
                nameHandler={changeName}
                notify={notify}
                notFirstTime = {true}
                appRef = {appRef}
                />
        }
        <ToastContainer />
       </>
     
    )
}

export default App;