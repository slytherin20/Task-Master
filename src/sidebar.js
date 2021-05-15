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
                <img 
                        src="" 
                        alt="personal dp">
                </img>

            </div>
        )
}

export default Sidebar;