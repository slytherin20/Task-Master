import firebase from "firebase/app"


export function addTask(e,task,notify,collectionRef){
    e.preventDefault()
    let taskObj = {
            name: task.taskName,
            priority: task.priority,
            deadline:task.deadline,
            inProgress:true,
            addedAt : firebase.firestore.FieldValue.serverTimestamp()
    }
    if(task.label){
        taskObj["customLabel"] = task.label;
        taskObj["labelColor"] = task.color;
    }
    collectionRef.add(taskObj)
    
    //Notify
    notify("New task added!")
}

export function deleteTaskHandler(id,collectionRef){
    collectionRef
    .doc(id)
    .delete()
}
export function completedTaskHandler(id,status,collectionRef){
    collectionRef.doc(id).update({
        inProgress: !status
    })
}
