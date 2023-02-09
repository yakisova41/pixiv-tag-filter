import React, { useEffect, useState } from "react";
import style from "../optionScreen.css";
import { set, get } from "../../../configOperator";
import { translate } from "../../../translate";

const FilterToggle = () => {
    const [value, setValue] = useState(false);

    useEffect(() => {
        const storageValue = get().block;
        setValue(storageValue);
    }, []);

    const handleChange = () => {
        if (value) {
            set("block", false);
            setValue(false);
        } else {
            set("block", true);
            setValue(true);
        }

        location.reload();
    };

    return (
        <li className={style.option_panel_setting}>
            <span>{translate("Enable Illustration Refinement")}</span>
            <input type="checkbox" onChange={handleChange} checked={value} />
        </li>
    );
};

export default FilterToggle;
