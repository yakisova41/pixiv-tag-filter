import React from "react";
import style from "./optionScreen.css";
import Users from "./options/Users";
import FilterToggle from "./options/FilterToggle";

const Secondry = () => {
    return (
        <div className={style.option_panel_secondry}>
            <div className={style.option_panel_content}>
                <ul className={style.option_panel_settings}>
                    <FilterToggle />
                    <Users />
                </ul>
            </div>
        </div>
    );
};

export default Secondry;
