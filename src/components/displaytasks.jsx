import DisplayPending from "./displaypending";
import DisplayCompleted from "./displaycompleted";

export default function DisplayTasks({
    userTasks,
    updateTaskHandler,
    deleteCompletedTaskHandler,
    deleteTaskHandler,
    notify,
    displayTasks,
    completedTaskHandler
}){
  
    let completedTasks = userTasks.filter(taskObject => taskObject.status===false);
    let pendingTasks = userTasks.filter(taskObject=> taskObject.status===true);

    
    function getCompletedTask(id){
        let completedTask = userTasks.find((taskObj) => taskObj.id === id);
        completedTaskHandler(id,completedTask.status)

    }
    return   <div className="display-container">
    <DisplayPending
        tasks={pendingTasks} 
        completedTask={getCompletedTask} 
        deleteTask={deleteTaskHandler}
        notify={notify}
        updateDisplayArr = {updateTaskHandler}
        displayTasks = {displayTasks} />
    <DisplayCompleted 
        tasks = {completedTasks}
        deleteTask = {deleteCompletedTaskHandler}
        notify={notify} />
            
</div>
}
