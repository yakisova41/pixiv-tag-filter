import React from "react";
import style from "./optionScreen.css";
import Primary from "./Primary";
import Secondry from "./Secondry";

const OptionPanel = () => {
    return (
        <div className={style.option_panel_container}>
            <Secondry />
            <Primary />
        </div>
    );
};

export default OptionPanel;
