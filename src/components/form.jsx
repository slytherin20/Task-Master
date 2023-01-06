function Form({
    task,
   setInput,
    addTaskHandler
}){
    return(
        <form 
        className="input-box" onSubmit={addTaskHandler}>
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
                onChange={setInput}>
            
        </input>
        </label>
        <label className="priority-field">
            Priority level:
        <select 
            value={task.priority} 
            onChange={setInput} name="priority">
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
                    onChange={setInput}>
            </input>
        </label>
        <label className="color-field">
            Label Color:
            <input 
                    type="color" 
                    value={task.color} 
                    name="color"
                    onChange={setInput}>
            </input>
        </label>
        <label className="deadline-field">
            Deadline:
            <input 
                type="date" 
                value={task.deadline} 
                className="date-field"
                name="deadline"
                onChange={setInput} 
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