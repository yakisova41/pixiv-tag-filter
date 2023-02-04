import React from "react";
import style from "./tags.css";
import IllustItemillust from "./illust/IllustItemIlust";
import IllustTitle from "./IllustTitle";
import IllustAuthor from "./IllustAuthor";

const illustItem = ({}: {}) => {
    return (
        <li className={style.illust_item_il}>
            <div className={style.illust_item_content}>
                <IllustItemillust />
                <IllustTitle />
                <IllustAuthor />
            </div>
        </li>
    );
};

export default illustItem;
