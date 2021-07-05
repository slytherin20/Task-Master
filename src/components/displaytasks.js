function Display({tasks,completedTask,deleteTask,notify}){
    function updateCompletedStatus(task){
        completedTask(task.id,task.taskName,task.deadline,task.customLabel)
        notify("Task Completed!")
    }
    function updateDeleteTask(task){
        deleteTask(task.id,task.customLabel)
        notify("Task Removed")
    }
    return(
        <div className="display-pending-container">
            {   
                tasks.map((task)=>(
                    <div key={task.id} className="task">
                        <h3>{task.taskName}</h3>
                        <button style={{
                                        border:`solid 2px 
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
    )
}

export default Display;