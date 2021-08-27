import { useState } from "react";
import DisplayFilter from "./DisplayFilter";
import { date } from "../utilities/functions/date";
import Sort from "../utilities/images/sort.png";

function Display({tasks,
                  completedTask,
                  deleteTask,
                  notify,
                  updateDisplayArr,
                  displayTasks}){
    const [openFilter,setOpenFilter] = useState(false);
    let taskArr = [];
    let temp = date()
    temp = temp.split("-");
    let currentDate = temp[1]+"/"+temp[2]+"/"+temp[0];

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

    function closeFilterMenu(){
        setOpenFilter(false)
    }

    function filterByName(){
        let temp = tasks.sort((a,b)=>
                                (a.taskName.toLowerCase()>b.taskName.toLowerCase())
                                ?1:-1)
        taskArr = [...temp];
        updateDisplayArr(taskArr)
    }

    function filterByDeadline(){
        let temp = tasks.sort((a,b)=>{
            if(a===b) return -1
            let date1Arr = a.deadline.split("-");
            let date1 = date1Arr[1]+"/"+date1Arr[2]+"/"+date1Arr[0];
            let days1 = noOfDays(date1)
            let date2Arr = b.deadline.split("-");
            let date2 = date2Arr[1]+"/"+date2Arr[2]+"/"+date2Arr[0];
            let days2 = noOfDays(date2)
            if(days1>days2)
                return 1
            else return -1
        })
        taskArr = [...temp];
        updateDisplayArr(taskArr)
    }

    function filterByPriority(){
        let tempArr = []
        let highCount = 0;
        tasks.forEach((item)=>{
            switch(item.priority){
                case "High":tempArr.unshift(item)
                            highCount++;
                            break;
                case "Medium":tempArr.splice(highCount,0,item)
                                break;
                case "Low":tempArr.push(item)
                            break;
                default:break;
            }
        })
        updateDisplayArr(tempArr)
    }

    function noOfDays(deadline){
        let date1 = new Date(currentDate)
        let date2 = new Date(deadline)
        let timeDifference = date2.getTime() - date1.getTime()
        let daysDifference = timeDifference/(1000*3600*24);
        return daysDifference;
    }

    return(
        <div className="display-pending">
        <span>Pending Tasks</span>
        <hr></hr>
        <div className="display-pending-container">
            <div className="filter-container">
                <img src={Sort}
                alt="filter icon" 
                className="filter-icon" 
                onClick={openFilterMenu} />
                {
                    openFilter &&
                    <DisplayFilter
                    nameHandler = {filterByName}
                    deadlineHandler = {filterByDeadline}
                    priorityHandler = {filterByPriority}
                    displayTasks = {displayTasks}
                    closeFilter = {closeFilterMenu}
                    notify={notify} />
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
        </div>
    )
}

export default Display;