
function DisplayCompleted({tasks,deleteTask,notify}){
    function updateDeleteStatus(task){
        deleteTask(task.id,task.customLabel)
        notify("Task Removed")
    }
    return(
        <div className="display-completed">
            <span>Completed Tasks</span>
            <hr></hr>
            <div className="display-completed-container">
            {   
                tasks.map((task)=>(
                    <div key={task.id} className="task">
                        <h3>{task.taskName}</h3>
                        {task.customLabel &&
                        <p className="completed-label">{task.customLabel}</p>
                        }
                        <p>Completed ✅</p>
                        <p>Deadline: {task.deadline}</p>
                        <button className="delete" onClick={()=>updateDeleteStatus(task)}>Delete</button>
                        </div>
                ))
                
            }
        </div>
  
        </div>
          )
}

export default DisplayCompleted;