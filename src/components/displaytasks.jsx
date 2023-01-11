import DisplayPending from "./displaypending";
import DisplayCompleted from "./displaycompleted";
import { deleteTaskHandler,completedTaskHandler } from "../utilities/functions/taskOperations";
export default function DisplayTasks({
    userTasks,
    notify,
    displayTasks,
    collectionRef,
    displayTitle
}){

    let completedTasks = userTasks.filter(taskObject => taskObject.status===false);
    let pendingTasks = userTasks.filter(taskObject=> taskObject.status===true);
    let priority = ['High','Medium','Low']
    //If display title is a priority
    if(priority.includes(displayTitle)){
        completedTasks = completedTasks.filter((task)=> task.priority===displayTitle);
        pendingTasks = pendingTasks.filter((task)=> task.priority===displayTitle)
    }
    else if(displayTitle!=='All'){ //For custom label
        completedTasks = completedTasks.filter((task)=> task.customLabel===displayTitle);
        pendingTasks = pendingTasks.filter((task)=> task.customLabel===displayTitle)
    }

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
        displayTasks = {displayTasks} 
        collectionRef={collectionRef}/>
    <DisplayCompleted 
        tasks = {completedTasks}
        deleteTask = {deleteTaskHandler}
        notify={notify}
        collectionRef={collectionRef} />
            
</div>
}
