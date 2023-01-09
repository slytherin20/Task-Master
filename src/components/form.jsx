import { useState } from "react";
import { date } from "../utilities/functions/date";
import { addTask } from "../utilities/functions/taskOperations";


function Form({notify,collectionRef}){ const dateString = date();
    const [task,setTask] = useState({
        taskName:'',
        priority:'Low',
        label:'',
        color:'#003333',
        deadline: dateString
    });
    function setTaskDetails(e){
        let label;
        if(e.target.name==='label'){
            if(e.target.value && e.target.value.toLowerCase()!=="all"){
                label = e.target.value;
            }
            else{
              
                label = ''
            }
            setTask({
                ...task,
            label: label
            })
        }
        else
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }
    return(
        <form 
        className="input-box" onSubmit={(e)=>addTask(e,task,notify,collectionRef)}>
        <div className="input-fields">
        <div className="row-1">
        <label className="task-name-field">
            Task Name:
            <input 
                type="text" 
                className="task-name" 
                placeholder="Enter the task here" 
                name = "taskName"
                required
                value={task.taskName} 
                onChange={setTaskDetails}>
            
        </input>
        </label>
        <label className="priority-field">
            Priority level:
        <select 
            value={task.priority} 
            onChange={setTaskDetails} name="priority">
            <option 
                    value="Low">
                        Low
            </option>
            <option 
                    value="Medium">
                        Medium
            </option>
            <option 
                    value="High">
                        High
            </option>
        </select>
        </label>
        </div>
        <div className="row-2">
        <label className="label-field">
            Custom Label:
            <input  
                    type="text" 
                    placeholder="Work/School etc." 
                    name="label"
                    value={task.label} 
                    className="custom-label"
                    onChange={setTaskDetails}>
            </input>
        </label>
        <label className="color-field">
            Label Color:
            <input 
                    type="color" 
                    value={task.color} 
                    name="color"
                    onChange={setTaskDetails}>
            </input>
        </label>
        <label className="deadline-field">
            Deadline:
            <input 
                type="date" 
                value={task.deadline} 
                className="date-field"
                name="deadline"
                onChange={setTaskDetails} 
                min={task.date}>
            </input>
        </label>
        </div>
        </div>
      <button type="submit" className="form-button">Add task</button>
    </form>

    )
}

export default Form;