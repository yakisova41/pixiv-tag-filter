import React from "react";
import style from "./tags.css";
import IllustItem from "./IllustItem";
import { illust } from "../../utils/pixivApi";
import { IllustContext } from "./IllustContext";

const TagsContainer = ({ illusts }: { illusts: illust[] }) => {
    let key = 0;
    return (
        <ul className={style.tags_container_ul}>
            {illusts.map((illustdata) => {
                key++;
                return (
                    <IllustContext.Provider key={key} value={illustdata}>
                        <IllustItem />
                    </IllustContext.Provider>
                );
            })}
        </ul>
    );
};

export default TagsContainer;
