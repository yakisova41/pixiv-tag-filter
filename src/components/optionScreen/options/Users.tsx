import React from "react";
import style from "../optionScreen.css";
import { set, get } from "../../../utils/configOperator";
import { translate } from "../../../utils/translate";

const Users = () => {
    const getDefaultValue = () => {
        const configusers = get().users;

        if (configusers !== false) {
            return configusers;
        }

        return "0";
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value: string | false = e.currentTarget.value;
        if (value === "0") {
            value = false;
        }

        set("users", value);

        document.dispatchEvent(
            new CustomEvent("pixiv-tag-filter-config-update")
        );
    };

    return (
        <li className={style.option_panel_setting}>
            <span>{translate("Specify number of bookmarks")}</span>
            <select
                className={style.option_panel_select}
                onChange={handleChange}
                defaultValue={getDefaultValue()}
            >
                <option value="0">OFF</option>
                <option value="50">50users</option>
                <option value="100">100users</option>
                <option value="300">300users</option>
                <option value="500">500users</option>
                <option value="1000">1000users</option>
                <option value="5000">5000users</option>
                <option value="10000">10000users</option>
                <option value="20000">20000users</option>
                <option value="30000">30000users</option>
                <option value="00">100~users</option>
                <option value="000">1000~users</option>
            </select>
        </li>
    );
};

export default Users;
