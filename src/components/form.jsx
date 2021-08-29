function Form({
    task,
    changeNameHandler,
    priority,
    changePriorityHandler,
    label,
    changeLabelHandler,
    color,
    changeColorHandler,
    deadline,
    changeDeadlineHandler,
    date,
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
                required
                value={task} 
                onChange={changeNameHandler}>
            
        </input>
        </label>
        <label className="priority-field">
            Priority level:
        <select 
            value={priority} 
            onChange={changePriorityHandler}>
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
                    value={label} 
                    className="custom-label"
                    onChange={changeLabelHandler}>
            </input>
        </label>
        <label className="color-field">
            Label Color:
            <input 
                    type="color" 
                    value={color} 
                    onChange={changeColorHandler}>
            </input>
        </label>
        <label className="deadline-field">
            Deadline:
            <input 
                type="date" 
                value={deadline} 
                className="date-field"
                onChange={changeDeadlineHandler} 
                min={date}>
            </input>
        </label>
        </div>
        </div>
      <button type="submit" className="form-button">Add task</button>
    </form>

    )
}

export default Form;