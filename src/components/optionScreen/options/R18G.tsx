import React, { useEffect, useState } from "react";
import style from "../optionScreen.css";
import { set, get } from "../../../utils/configOperator";
import { translate } from "../../../utils/translate";

const R18GToggle = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const storageValue = get().r18gBlock;
    setValue(storageValue);
  }, []);

  const handleChange = () => {
    if (value) {
      set("r18gBlock", false);
      setValue(false);
    } else {
      set("r18gBlock", true);
      setValue(true);
    }
    document.dispatchEvent(new CustomEvent("pixiv-tag-filter-config-update"));
  };

  return (
    <li className={style.option_panel_setting}>
      <span>{translate("Filter R-18G")}</span>
      <input type="checkbox" onChange={handleChange} checked={value} />
    </li>
  );
};

export default R18GToggle;
