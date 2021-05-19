//import { auth } from "./firebase_config";
import { useState } from "react";
import Sidebar from "./sidebar";
import NavBar from "./navbar";
import Form from "./form";

function App(){
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()
    const yy = date.getFullYear()
    const dateString = yy+"-"+mm+"-"+dd
    console.log(dateString);

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
                    dateString={dateString}
                    />
             </div>
       </>
    )
}

export default App;