import { useState } from "react";
import DisplayFilter from "./DisplayFilter";

function Display({tasks,
                  completedTask,
                  deleteTask,
                  notify,
                  updateDisplayArr}){
                      
    const [openFilter,setOpenFilter] = useState(false);
    let taskArr = [];

    function updateCompletedStatus(task){
        completedTask(task.id,task.taskName,task.deadline,task.customLabel)
        notify("Task Completed!")
    }
    function updateDeleteTask(task){
        deleteTask(task.id,task.customLabel)
        notify("Task Removed")
    }

    function openFilterMenu(){
        setOpenFilter(true)
    }
    function filterByName(){
        let temp = tasks.sort((a,b)=>
                                (a.taskName.toLowerCase()>b.taskName.toLowerCase())
                                ?1:-1)
        taskArr = [...temp];
        updateDisplayArr(taskArr)
    }
    function filterByDeadline(){
        
    }
    function filterByPriority(){
        console.log()
    }
    return(
        <div className="display-pending-container">
            <div className="filter-container">
                <img src="https://i.imgur.com/UoicdUh.png"
                alt="filter icon" 
                className="filter-icon" 
                onClick={openFilterMenu} />
                {
                    openFilter &&
                    <DisplayFilter
                    nameHandler = {filterByName}
                    deadlineHandler = {filterByDeadline}
                    priorityHandler = {filterByPriority} />
                }
            </div>
            <div className="display-pending-tasks">
            {   
                tasks.map((task)=>(
                    <div key={task.id} className="task">
                        <h3>{task.taskName}</h3>
                        <button 
                                className="display-priority-btn"
                                style={{
                                        border:`solid 4px 
                                        ${task.priority==="High"
                                                                ?"red"
                                                                :(task.priority==="Medium"
                                                                            ?"yellow"
                                                                            :"green")}`
                                        }}>
                                        {task.priority}
                                        </button>
                        <p>{task.status?"In Progress ✍🏼":"Completed  ✅"}</p>
                        <p>Deadline: {
                             task.deadline.split("-").reverse().join("-")
                            }</p>
                        <button className="done" onClick={()=>updateCompletedStatus(task)}>Done</button>
                        <button className="delete" onClick={()=>updateDeleteTask(task)}>Delete</button>
                        </div>
                ))
                
            }
            </div>
        </div>
    )
}

export default Display;