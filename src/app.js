import db, { auth } from "./firebase_config";
import firebase from "firebase/app"
import { useState } from "react";
import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";

function App(){
    //Getting the current date
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    const yy = date.getFullYear();
    if(dd<10) dd = "0"+dd;
    if(mm<10) mm = "0"+mm;
    let dateString = yy+"-"+mm+"-"+dd;

    //Firestore
    const userID = auth.currentUser.uid;
    const collectionRef = db.collection(`users/${userID}/tasks`);

    //States
    const [menuState,setMenuState] =  useState(false);
    const [accountState,setAccountState] = useState(false);
    const [taskName,setTaskName] = useState("");
    const [priority,setPriority] = useState("Low");
    const [label,setLabel] = useState("All");
    const [color,setColor] = useState("black");
    const [deadline,setDeadline] = useState(dateString);


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
    

    //Adding data to Firestore
    function addTask(){
        collectionRef.add({
            name: taskName,
            priority: priority,
            customLabel: label,
            tabColor:color,
            deadline:deadline,
            inProgress:true,
            addedAt : firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    //Displaying data from Firestore


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
                        closeMenuHandler={setMenuState} />
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
             </div>
       </>
    )
}

export default App;