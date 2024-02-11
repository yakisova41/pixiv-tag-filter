import React from "react";
import style from "./optionScreen.css";
import Users from "./options/Users";
import FilterToggle from "./options/FilterToggle";
import UgoiraToggle from "./options/Ugoira";
import R18GToggle from "./options/R18G";

const Secondry = () => {
  return (
    <div className={style.option_panel_secondry}>
      <div className={style.option_panel_content}>
        <ul className={style.option_panel_settings}>
          <FilterToggle />
          <Users />
          <UgoiraToggle />
          <R18GToggle />
        </ul>
      </div>
    </div>
  );
};

export default Secondry;
