import cancelIcon from '../utilities/images/cancel.png';
import Loader from "react-loader-spinner";

function Sidebar({closeMenuHandler,displayHandler,loading,imgUrl,name,userTasks}){
        let priority = ['High','Medium','Low']
        let allLabels = new Map();
        allLabels.set('All',["red",1])
       
         userTasks.forEach((task)=> {
             if(allLabels.has(task.customLabel)) {
                let labelCount = allLabels.get(task.customLabel)[2];
                allLabels.set(task.customLabel,[task.color,labelCount+1])
             }
              else{
                 allLabels.set(task.customLabel,[task.color,1])
              }
             })
             console.log(allLabels)
        let labelElements = []
        allLabels.forEach((value,key)=>  labelElements.push(<button 
        key = {key} 
        className="custom-label-tabs" 
        style={{border: `solid 3px ${value[0]}`}}
        onClick={()=>displayHandler(key)}
        >
                {key}</button>))

        return (
                <div 
                        className="sidebar-menu">
                        <img src={cancelIcon} 
                                className="cancel-icon" 
                                alt="close" 
                                onClick={()=>closeMenuHandler()}/>
                        <span className="profile">
                        {
                        loading? <Loader
                                        type="TailSpin"
                                        color="#00BFFF"
                                        height={70}
                                        width={70}
                                        />
                                : <img className = "sidebar-profile-pic" 
                                        src={imgUrl} 
                                        alt="profile-pic"
                                />
                                
                        } 
                        <h3>
                        {name}
                        </h3>
                        
                        </span>
                        <div className="priority-tabs">
                                <span>Priority Levels</span>
                                <div className="buttons">
                              {  priority.map((level)=> 
                                <button key={level} 
                                className={`${level.toLowerCase()}-btn`}
                                onClick={()=>displayHandler(level)}>
                                       {level} 
                                </button>
                                )
                              }
                                </div>
                        </div>
                        <hr></hr>
                        <div className="custom-labels-tabs">
                                <span>Custom Labels</span>
                                <button 
                                key = "All" 
                                className="custom-label-tabs all-btn" 
                                style={{border: "solid 3px Red"}}
                                onClick={()=>displayHandler("All")}
                                >
                                All</button>
                                <div className="buttons">
                                { labelElements
                               }
                                </div>
                        </div>

                </div>
        )
}

export default Sidebar;