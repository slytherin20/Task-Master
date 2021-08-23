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
        <input 
                type="text" 
                className="task-name" 
                placeholder="Enter the task here" 
                required
                value={task} 
                onChange={changeNameHandler}>
            
        </input>
        <label>
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
        <label>
            Choose Custom Label:
            <input  
                    type="text" 
                    placeholder="Work/School etc." 
                    value={label} 
                    onChange={changeLabelHandler}>
            </input>
        </label>
        <label>
            Pick Label Color:
            <input 
                    type="color" 
                    value={color} 
                    onChange={changeColorHandler}>
            </input>
        </label>
        <label>
            Deadline:
            <input 
                type="date" 
                value={deadline} 
                onChange={changeDeadlineHandler} 
                min={date}>
            </input>
        </label>
      
        </div>
      <button type="submit" className="form-button">Add task</button>
    </form>

    )
}

export default Form;