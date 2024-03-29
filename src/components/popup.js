import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box2">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;