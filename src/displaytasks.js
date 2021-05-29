function Display({tasks}){
    return(
        <div className="display-container">
            {   
                tasks.map((task)=>(
                    <div key={task.id} className="task">
                        <h3>{task.taskName}</h3>
                        <button style={{border:`solid 2px ${task.priority==="High"?"red":(task.priority==="Medium"?"yellow":"green")}`}}>{task.priority}</button>
                        <p>{task.status}</p>
                        <p>{
                            task.deadline.split("-").reverse().join("-")
                            }</p>
                        <button className="done">Done</button>
                        <button className="delete">Delete</button>
                        </div>
                ))
                
            }
        </div>
    )
}

export default Display;