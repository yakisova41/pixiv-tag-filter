import React, { useEffect, useState } from "react";
import style from "../optionScreen.css";
import { set, get } from "../../../utils/configOperator";
import { translate } from "../../../utils/translate";

const UgoiraToggle = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const storageValue = get().ugoiraBlock;
    setValue(storageValue);
  }, []);

  const handleChange = () => {
    if (value) {
      set("ugoiraBlock", false);
      setValue(false);
    } else {
      set("ugoiraBlock", true);
      setValue(true);
    }
    document.dispatchEvent(new CustomEvent("pixiv-tag-filter-config-update"));
  };

  return (
    <li className={style.option_panel_setting}>
      <span>{translate("Filter Ugoira")}</span>
      <input type="checkbox" onChange={handleChange} checked={value} />
    </li>
  );
};

export default UgoiraToggle;
