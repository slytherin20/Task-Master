import { useState } from "react";

function DisplayFilter({nameHandler,
                        deadlineHandler,
                        priorityHandler,
                        displayTasks,
                        closeFilter,
                        notify}){
const [filter,setFilter] = useState("---");

function changeValue(e){
    setFilter(e.target.value)
}

function filterResult(e){
    e.preventDefault()
    switch(filter){
        case "1": nameHandler()
                  notify("Tasks sorted by name")
                    break;
        case "2": deadlineHandler()
                  notify("Tasks sorted by deadline")
                    break;
        case "3": priorityHandler()
                  notify("Tasks sorted by priority")
                    break;
        default: nameHandler()
                 notify("Tasks sorted by name")

                    break;
    }
    closeFilter()

}

function clearFilter(){
    notify("Filter cleared!")
    displayTasks()
    closeFilter()
}

return(
    <div className="filter-menu">
    Sort By:
    <form onSubmit={filterResult}>
        <select value={filter} onChange={changeValue}>
            <option value="1">Name</option>
            <option value="2">Deadline</option>
            <option value="3">Priority</option>
        </select>
        <button className="filter-btn" type="submit">Ok</button>
    </form>
    <button className="clear-filter" onClick={clearFilter}>Clear</button>
    </div>
)
}

export default DisplayFilter;