import React from "react";
import style from "./optionScreen.css";
import packageJson from "../../../package.json";
import BlockTags from "./BlockTags";

const Primary = () => {
    return (
        <div className={style.option_panel_primary}>
            <div className={style.option_panel_content}>
                <BlockTags />
            </div>

            <div className={style.option_panel_bottom}>
                <span>
                    Pixiv tag filter v{packageJson.userScript["@version"]}
                </span>
            </div>
        </div>
    );
};

export default Primary;
