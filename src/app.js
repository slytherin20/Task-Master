//import { auth } from "./firebase_config";
import menuIcon from './images/menu.png';
import { useState } from "react";
import Sidebar from "./sidebar";
import AccountBar from "./accountbar";

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
    return(
       <>
       <nav 
       className="nav-bar">
           <img className = "menu-icon" 
                src={menuIcon} 
                alt="menu icon" 
                onClick={()=>setMenuState(!menuState)} />
           <span>
               Task master - A task keeping app
               </span>
           <span 
                className="coins">
                    0 coins
                    </span>
            <span
                className="notification-icon">
                    0 Notification
                </span>
           <span 
                className="account-img"
                onClick={()=>setAccountState(!accountState)}>
                    photo
                    {
                        accountState?<AccountBar 
                                        status = {accountState} 
                                        closeAccountHandler={setAccountState}/>
                                    :null
                    }
                    </span>
       </nav>
       {
           menuState?<Sidebar 
                        status = {menuState} 
                        closeMenuHandler={setMenuState} />
                    :null
       }
       <div 
            className="main-container">
            <form 
                className="input-box">
                <input 
                        type="text" 
                        className="task-name" 
                        placeholder="Enter the task here" 
                        value={taskName} 
                        onChange={setNameHandler}>
                    
                </input>
                <label>
                    Priority level:
                <select value={priority} onChange={setPriorityHandler}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </label>
                <label>
                    Choose Custom Label:
                    <input type="text" placeholder="Enter a custom label" value={label} onChange={setLabelHandler}></input>
                    Pick Label Color:
                    <input type="color" value={color} onChange={setColorHandler}></input>
                </label>
                <label>
                    Deadline:
                    <input type="date" value={deadline} onChange={setDeadlineHandler} min={dateString}></input>
                </label>

            </form>
       </div>
       </>
    )
}

export default App;