import cancelIcon from './images/cancel.png';

function Sidebar({status,closeMenuHandler,labels,displayHandler}){
        let labelsArr = []
        for(let key in labels){
                labelsArr.push(<button 
                                        key = {labels[key][0]} 
                                        className="custom-label-tabs" 
                                        style={{backgroundColor: `${labels[key][1]}`}}
                                        onClick={()=>displayHandler(key)}
                                        >
                                                {key}</button>
                 )
        } 
        return (
            <div 
                className="sidebar-menu">
                <img src={cancelIcon} 
                        className="cancel-icon" 
                        alt="close" 
                        onClick={()=>closeMenuHandler(!status)}/>
                <span>
                        Name
                </span>
                <span className="profile">
                <img 
                        src="" 
                        alt="personal dp">
                </img>
                </span>
                <div className="priority-tabs">
                        <button className="low-btn" onClick={()=>displayHandler("Low")}>Low</button>
                        <button className="medium-btn" onClick={()=>displayHandler("Medium")}>Medium</button>
                        <button className="high-btn" onClick={()=>displayHandler("High")}>High</button>
                </div>
                <div className="custom-labels-tabs">
                        {labelsArr}
                </div>

            </div>
        )
}

export default Sidebar;