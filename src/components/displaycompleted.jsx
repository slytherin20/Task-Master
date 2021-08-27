import Work from "../utilities/images/046-lifting-monochrome.svg";


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
            {   tasks.length===0 &&
                <div className="incomplete">
                    <h3 className="incomplete-title">No completed tasks yet.</h3>
                    <h3 className="incomplete-title">No worries!You can do it.</h3>
                    <img src={Work} alt="" className="incomplete-img" />
                    </div>
            }
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