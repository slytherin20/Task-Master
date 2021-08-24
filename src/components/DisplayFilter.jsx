import { useState } from "react";

function DisplayFilter({nameHandler,deadlineHandler,priorityHandler}){
const [filter,setFilter] = useState("Filter By:");

function changeValue(e){
    setFilter(e.target.value)
}

function filterResult(e){
    e.preventDefault()
    switch(filter){
        case "1": nameHandler()
                    break;
        case "2": deadlineHandler()
                    break;
        case "3": priorityHandler()
                    break;
        default: nameHandler()
                    break;
    }
}
return(
    <form onSubmit={filterResult}>
        <select value={filter} onChange={changeValue}>
            <option value="1">Name</option>
            <option value="2">Deadline</option>
            <option value="3">Priority</option>
        </select>
        <button className="filter-btn" type="submit">Ok</button>
    </form>
)
}

export default DisplayFilter;