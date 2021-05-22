import cancelIcon from './images/cancel.png';

function Sidebar({status,closeMenuHandler,labels}){
        let labelsArr = []
        for(let key in labels){
                labelsArr.push(<button key = {labels[key][0]} className="custom-label-tabs" style={{backgroundColor: `${labels[key][1]}`}}>{key}</button>
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
                        <button className="low-btn">Low</button>
                        <button className="medium-btn">Medium</button>
                        <button className="high-btn">High</button>
                </div>
                <div className="custom-labels-tabs">
                        {labelsArr}
                </div>

            </div>
        )
}

export default Sidebar;