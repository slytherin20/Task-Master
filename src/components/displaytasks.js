function Display({tasks,completedTask,deleteTask}){
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
                        <p>{
                            task.deadline.split("-").reverse().join("-")
                            }</p>
                        <button className="done" onClick={()=>completedTask(task.id,task.taskName,task.deadline,task.customLabel)}>Done</button>
                        <button className="delete" onClick={()=>deleteTask(task.id,task.customLabel)}>Delete</button>
                        </div>
                ))
                
            }
        </div>
    )
}

export default Display;