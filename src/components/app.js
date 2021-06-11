import db, { auth } from "../firebase_config";
import firebase from "firebase/app"
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";
import Display from "./displaytasks";
import { date } from "../date";
import DisplayCompleted from "./displaycompleted";

function App(){
    //Current date
    const dateString = date()

    //Firestore
    const userID = auth.currentUser.uid;
    const collectionRef = db.collection(`users/${userID}/tasks`);
    const sideBarRef = db.collection(`users/${userID}/labels`);
    const completedListRef = db.collection(`users/${userID}/completed`)


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
    const [completedArr,setCompletedArr] = useState([]);
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

    //Display only completed tasks
    useEffect(() => {
        addCompletedTasks()
    }, [])

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
                       [doc.data().labelName]:[doc.id,doc.data().color,doc.data().count]
                   }
               ))
           ))
        })
    }

     function initialLabel(){
        sideBarRef.add({
            labelName: "All",
            color: "#f40b0b",
            count:1
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
    function completedTaskHandler(id,name,deadline,label){

        //Delete task from task list
        deleteTaskHandler(id,label);

        //Put it into completed task list.
        completedListRef.add({
            name:name,
            deadline: deadline.split("-").reverse().join("-"),
            customLabel: label
        })

    }
    function deleteTaskHandler(id,label){
        //Delete the task
        collectionRef
        .doc(id)
        .delete()

        //Decreement the sidebar label count
        decreementCount(label)
    }
    function deleteCompletedTaskHandler(id,label){
        completedListRef
        .doc(id)
        .delete()

        //Decreement the sidebar label count
        decreementCount(label)
    }

    function decreementCount(label){
        let newValue = allLabels[label][2]-1
        sideBarRef.doc(allLabels[label][0]).update({
           count: newValue
       })
       .then(()=>{
           if(newValue===0){
                sideBarRef.doc(allLabels[label][0]).delete()
           }
       })
       .catch((err)=> console.log(err))
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
        let notExists = true
        if(Object.keys(allLabels).length>1){
            for(let key in allLabels){
                //When label already exists
                if(key.toLowerCase()===label.toLowerCase()){
                    notExists = false
                    //When label color is now changed.
                    if(allLabels[key][1]!==color){
                        sideBarRef
                        .doc(allLabels[key][0])
                        .update(
                            {
                                color: color,
                                count: allLabels[key][2] + 1
                            }
                        )
                      }
                      //Label color remains unchanged.
                      else{
                        sideBarRef
                        .doc(allLabels[key][0])
                        .update(
                            {
                                count: allLabels[key][2] + 1
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
                        priority: doc.data().priority,
                        customLabel: doc.data().customLabel
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
                        priority: doc.data().priority,
                        customLabel: doc.data().customLabel
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
                        priority: doc.data().priority,
                        customLabel: doc.data().customLabel
                    }
                ))
            )
        })
    }

    //Getting completed tasks from firestore
    function addCompletedTasks(){
        completedListRef
        .onSnapshot(function (querySnapshot){
            setCompletedArr( querySnapshot.docs.map((doc=>(
                    {
                        id: doc.id,
                        taskName: doc.data().name,
                        deadline: doc.data().deadline,
                        customLabel: doc.data().customLabel
                    }
                ))))
           
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
                    <div className="display-container">
                        <Display 
                            tasks={displayArr} 
                            completedTask={completedTaskHandler} 
                            deleteTask={deleteTaskHandler}/>
                        <DisplayCompleted 
                            tasks = {completedArr}
                            deleteTask = {deleteCompletedTaskHandler} />
                            
                    </div>
                    
             </div>
       </>
    )
}

export default App;