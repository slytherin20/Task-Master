import cancelIcon from '../utilities/images/cancel.png';
import Loader from "react-loader-spinner";

function Sidebar({closeMenuHandler,labels,displayHandler,loading,imgUrl,name}){
        // Setting all the custom labels to sidebar
        let labelsArr = []
        for(let key in labels){
                //When "All" tag is encountered
                if(key.toLowerCase()==="all"){
                        labelsArr.push(
                                <button 
                                key = {labels[key][0]} 
                                className="custom-label-tabs all-btn" 
                                style={{backgroundColor: `${labels[key][1]}`}}
                                onClick={()=>displayHandler(key)}
                                >
                                        {key}</button>
                                )
                }
                //When the custom label other than "all" is encountered.
                else{
                        labelsArr.push(
                                <button 
                                key = {labels[key][0]} 
                                className="custom-label-tabs" 
                                style={{backgroundColor: `${labels[key][1]}`}}
                                onClick={()=>displayHandler(key)}
                                >
                                        {key}</button>
         )
                }
        } 
        return (
                <div 
                        className="sidebar-menu box-1">
                        <img src={cancelIcon} 
                                className="cancel-icon" 
                                alt="close" 
                                onClick={()=>closeMenuHandler()}/>
                        <span className="profile">
                        {
                        loading? <Loader
                                        type="TailSpin"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
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
                                <button 
                                        className="low-btn" 
                                        onClick={()=>
                                        displayHandler("Low")}>
                                        Low
                                </button>
                                <button 
                                        className="medium-btn" 
                                        onClick={()=>
                                        displayHandler("Medium")}>
                                        Medium
                                </button>
                                <button 
                                        className="high-btn" 
                                        onClick={()=>
                                        displayHandler("High")}>
                                        High
                                </button>
                        </div>
                        <div className="custom-labels-tabs">
                                {labelsArr}
                        </div>

                </div>
        )
}

export default Sidebar;