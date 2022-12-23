import React from "react";

const CustomSwitch = ({ textOne, textTwo, activeKey, setActiveKey, className }) => {

  React.useEffect(() => {
    if (activeKey) {
      const activeDiv = document.getElementById(activeKey);

      activeDiv.classList.add("active-switch");
      activeDiv.classList.remove("deactive-switch");
    }
  });

  const handleClick = e => {
    if (e.target.id) {
      const oldActiveKey = document.getElementById(activeKey);
      oldActiveKey.classList.remove("active-switch");
      oldActiveKey.classList.add("deactive-switch");

      const newActiveKey = document.getElementById(e.target.id);

      newActiveKey.classList.add("active-switch");
      newActiveKey.classList.remove("deactive-switch");

      setActiveKey(e.target.id);
    }
  };


  return (
    <div className={`switch-container ${className}`}>
      <div onClick={handleClick} className="switch-item">
        <div className="deactive-switch" id={textOne}>
          {textOne}
        </div>
      </div>
      <div onClick={handleClick} className="switch-item">
        <div className="deactive-switch" id={textTwo}>
          {textTwo}
        </div>
      </div>
    </div>
  )
};

export default CustomSwitch;