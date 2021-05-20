import cancelIcon from './images/cancel.png';

function Sidebar({status,closeMenuHandler,labels}){

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
                        {
                                labels.map((label)=>(
                                        <button key={label.label} className="custom-labels" style={{border: `solid 1px ${label.color}`}}>
                                                {label.label}
                                        </button>
                                ))
                        }
                </div>

            </div>
        )
}

export default Sidebar;