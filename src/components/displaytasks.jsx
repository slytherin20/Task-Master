import DisplayPending from "./displaypending";
import DisplayCompleted from "./displaycompleted";
import { deleteTaskHandler,completedTaskHandler } from "../utilities/functions/taskOperations";
export default function DisplayTasks({
    userTasks,
    updateTaskHandler,
    notify,
    displayTasks,
    collectionRef
}){
  
    let completedTasks = userTasks.filter(taskObject => taskObject.status===false);
    let pendingTasks = userTasks.filter(taskObject=> taskObject.status===true);

    
    function getCompletedTask(id){
        let completedTask = userTasks.find((taskObj) => taskObj.id === id);
        completedTaskHandler(id,completedTask.status,collectionRef)

    }
    return   <div className="display-container">
    <DisplayPending
        tasks={pendingTasks} 
        completedTask={getCompletedTask} 
        deleteTask={deleteTaskHandler}
        notify={notify}
        updateDisplayArr = {updateTaskHandler}
        displayTasks = {displayTasks} 
        collectionRef={collectionRef}/>
    <DisplayCompleted 
        tasks = {completedTasks}
        deleteTask = {deleteTaskHandler}
        notify={notify}
        collectionRef={collectionRef} />
            
</div>
}
