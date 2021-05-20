import db, { auth } from "./firebase_config";
import firebase from "firebase/app"
import { useState, useEffect } from "react";
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
    const sideBarRef = db.collection(`users/${userID}/labels`)

    //States
    const [menuState,setMenuState] =  useState(false);
    const [accountState,setAccountState] = useState(false);
    const [taskName,setTaskName] = useState("");
    const [priority,setPriority] = useState("Low");
    const [label,setLabel] = useState("All");
    const [color,setColor] = useState("#ffffff");
    const [deadline,setDeadline] = useState(dateString);
    const [allLabels,setAllLabels] = useState([]);
    const [display,setDisplay] = useState([]);


    //useEffects
    function getSideBarLabels(){
   

        sideBarRef.onSnapshot(function (querySnapshot){
            setAllLabels(querySnapshot.docs.map((doc)=>(
                {
                    id:doc.id,
                    label :doc.data().labelName,
                    color: doc.data().color
                }
            )
            ))
        })
    
    }

    useEffect(() => {
        getSideBarLabels()
    }, [])


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
        //Check the labels in sidebar
        checkLabels()
    }

    function addLabels(){
        sideBarRef.add({
            labelName: label,
            color: color
        })
    }

    //Check if a custom label already exists
    function checkLabels(){
        if(allLabels.length>0){
            allLabels.map((ele)=>{
                if(ele.label.toLowerCase()===label.toLowerCase() && ele.color!==color){
                  sideBarRef
                  .doc(ele.id)
                  .update(
                      {
                          color: color
                      }
                  )
                }
            })
        }
        addLabels()
       
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
                        closeMenuHandler={setMenuState}
                        labels = {allLabels} />
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
                    <Display displayHandler={setDisplay}
             </div>
       </>
    )
}

export default App;