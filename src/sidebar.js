import cancelIcon from './images/cancel.png';

function Sidebar({status,closeMenuHandler}){
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

            </div>
        )
}

export default Sidebar;