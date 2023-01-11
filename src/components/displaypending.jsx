import { useState } from "react";
import DisplayFilter from "./DisplayFilter";
import { date } from "../utilities/functions/date";
import Sort from "../utilities/images/sort.png";
import Relax from "../utilities/images/090-reading-corner-monochrome.svg";

function DisplayPending({tasks,
                  completedTask,
                  deleteTask,
                  notify,
                  displayTasks,
                collectionRef}){
    const [openFilter,setOpenFilter] = useState(false);
    let taskArr = [...tasks];
    let temp = date();
    temp = temp.split("-");
    let currentDate = temp[1]+"/"+temp[2]+"/"+temp[0]; //mm-dd-yyyy

    function updateCompletedStatus(task){
        completedTask(task.id)
        notify("Task Completed!")
    }
    function updateDeleteTask(task){
        deleteTask(task.id,collectionRef)
        notify("Task Removed")
    }

    function openFilterMenu(){
        setOpenFilter(!openFilter)
    }

    function filterByName(){
        let temp = tasks.sort((a,b)=>
                                (a.taskName.toLowerCase()>b.taskName.toLowerCase())
                                ?1:-1) //1 indicates that b takes precendence while -1 indicates opposite.
        taskArr = [...temp];
    }

    function filterByDeadline(){
        let temp = tasks.sort((a,b)=>{
            if(a===b) return -1
            let date1Arr = a.deadline.split("-");
            let date1 = date1Arr[1]+"/"+date1Arr[2]+"/"+date1Arr[0]; //mm-dd-yyyy
            let days1 = noOfDays(date1)
            let date2Arr = b.deadline.split("-");
            let date2 = date2Arr[1]+"/"+date2Arr[2]+"/"+date2Arr[0]; //mm-dd-yyyy
            let days2 = noOfDays(date2)
            if(days1>days2)
                return 1
            else return -1
        })
        taskArr = [...temp];
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
        taskArr=[...tempArr]
    }

    function noOfDays(deadline){
        let date1 = new Date(currentDate)
        let date2 = new Date(deadline)
        let timeDifference = date2.getTime() - date1.getTime()  //result in ms
        let daysDifference = timeDifference/(1000*3600*24);
        return daysDifference;
    }

    return(
        <div className="display-pending">
        <span className="task-type">Pending Tasks</span>
        <hr></hr>
        <div className="display-pending-container">
            {    taskArr.length!==0 &&
                 <div className="filter-container">
                    Sort By
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
                     closeFilter = {openFilterMenu}
                     notify={notify} />
                 }
             </div>
            
            }
            <div className="display-pending-tasks">
            { tasks.length===0&&
                <div className="no-task">
                <h3 className="no-task-title">Relax! You do not have pending tasks here.</h3>
                <img src={Relax} alt="" className="no-task-img"/>
                </div>
             }
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
                        <button className="delete" onClick={()=>updateDeleteTask(task,collectionRef)}>Delete</button>
                        </div>
                ))
                
            }
            </div>
        </div>
        </div>
    )
}

export default DisplayPending;