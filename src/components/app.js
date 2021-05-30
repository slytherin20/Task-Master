import db, { auth } from "../firebase_config";
import firebase from "firebase/app"
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";
import Display from "./displaytasks";
import { date } from "../date";

function App(){
    //Current date
    const dateString = date()

    //Firestore
    const userID = auth.currentUser.uid;
    const collectionRef = db.collection(`users/${userID}/tasks`);
    const sideBarRef = db.collection(`users/${userID}/labels`);


    //States
    const [menuState,setMenuState] =  useState(false);
    const [accountState,setAccountState] = useState(false);
    const [taskName,setTaskName] = useState("");
    const [priority,setPriority] = useState("Low");
    const [label,setLabel] = useState("All");
    const [color,setColor] = useState("#ffffff");
    const [deadline,setDeadline] = useState(dateString);
    const [allLabels,setAllLabels] = useState({});
    const [displayArr,setDisplayArr] = useState([]);
    const [displayTitle,setDisplayTitle] = useState("All");

    //useEffects
    //Display sidebar 
    useEffect(() => {

        addDefaultValue()
    },[])
    //Display tasks as per the tag clicked.
    useEffect(() => {
        
        displayTasks()

    }, [displayTitle])

    function addDefaultValue(){
        //First login
        let userMetaData = auth.currentUser.metadata;
        if(userMetaData.creationTime===userMetaData.lastSignInTime)
          initialLabel()
        getSideBarLabels()
    }
    function getSideBarLabels(){
        sideBarRef.onSnapshot(function (querySnapshot){
           querySnapshot.docs.map((doc)=>
           (
               setAllLabels((prevState)=>(
                   {
                       ...prevState,
                       [doc.data().labelName]:[doc.id,doc.data().color]
                   }
               ))
           ))
        })
    }

     function initialLabel(){
        sideBarRef.add({
            labelName: "All",
            color: "#f40b0b"
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
        setLabel(e.target.value)
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
    function completedTaskHandler(){
        console.log("Completed task handler")
    }
    function deleteTaskHandler(){
        console.log("Delete task handler");
    }
    

    //Adding data to Firestore
    function addTask(e){
        e.preventDefault()
        collectionRef.add({
            name: taskName,
            priority: priority,
            customLabel: label,
            labelColor: color,
            deadline:deadline,
            inProgress:true,
            addedAt : firebase.firestore.FieldValue.serverTimestamp()
        })
        

        //Check the labels in sidebar for existing labels
        checkLabels()
    }

    


    //Check if a custom label already exists
    function checkLabels(){
        if(Object.keys(allLabels).length>1){
            for(let key in allLabels){
                if(key.toLowerCase()===label.toLowerCase() && allLabels[key][1]!==color){
                  sideBarRef
                  .doc(allLabels[key][0])
                  .update(
                      {
                          color: color
                      }
                  )
                }
            }
        }
        addLabels()
       
    }
    function addLabels(){
        sideBarRef.add({
            labelName: label,
            color: color
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
                            :displayByLabel(
                        ))
    }

    function displayAllTasks(){
        setDisplayArr([]);
        collectionRef
        .onSnapshot(function (querySnapshot){
            setDisplayArr(
                querySnapshot.docs.map((doc)=>(
                    {
                        id:doc.id,
                        taskName: doc.data().name,
                        addedAt: doc.data().addedAt,
                        status: doc.data().inProgress,
                        deadline: doc.data().deadline,
                        priority: doc.data().priority
                    }
                ))
            )
        })
    }

    function displayByPriority(){
        setDisplayArr([]);
        collectionRef
        .where("priority","==",displayTitle)
        .onSnapshot(function (querySnapshot){
            setDisplayArr(
                querySnapshot.docs.map((doc)=>(
                    {
                        id:doc.id,
                        taskName: doc.data().name,
                        addedAt: doc.data().addedAt,
                        status: doc.data().inProgress,
                        deadline: doc.data().deadline,
                        priority: doc.data().priority
                    }
                ))
            )
        })
    }
    function displayByLabel(){
        setDisplayArr([]);
        collectionRef
        .where("customLabel","==",displayTitle)
        .onSnapshot(function (querySnapshot){
            setDisplayArr(
                querySnapshot.docs.map((doc)=>(
                    {
                        id:doc.id,
                        taskName: doc.data().name,
                        addedAt: doc.data().addedAt,
                        status: doc.data().inProgress,
                        deadline: doc.data().deadline,
                        priority: doc.data().priority
                    }
                ))
            )
        })
    }
    

    //render to Virtual DOM
    return(
       <>
        <NavBar 
            account={accountState} 
            menuStateHandler={changeMenuState} 
            accountStateHandler={changeAccountState}/>
       {
           menuState?<Sidebar 
                        status = {menuState} 
                        closeMenuHandler={setMenuState}
                        labels = {allLabels}
                        displayHandler={changedisplayTitle} />
                    :null
       }
       <div 
            className="main-container">
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
                    />
                    <Display tasks={displayArr} completedTask={completedTaskHandler} deleteTask={deleteTaskHandler}/>
             </div>
       </>
    )
}

export default App;