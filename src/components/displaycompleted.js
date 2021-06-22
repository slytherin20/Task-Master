
function DisplayCompleted({tasks,deleteTask}){
    return(
        <div className="display-completed-container">
            {   
                tasks.map((task)=>(
                    <div key={task.id} className="task">
                        <h3>{task.taskName}</h3>
                        <p>Completed ✅</p>
                        <p>Deadline: {task.deadline}</p>
                        <button className="delete" onClick={()=>deleteTask(task.id,task.customLabel)}>Delete</button>
                        </div>
                ))
                
            }
        </div>
    )
}

export default DisplayCompleted;