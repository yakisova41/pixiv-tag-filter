import React from "react";
import style from "./tags.css";
import { Link } from "../Router";

const IllustTitle = ({
    text,
    illustLink,
}: {
    text: string;
    illustLink: string;
}) => {
    return (
        <div className={style.illust_about}>
            <Link href={illustLink} className={style.illust_title_link}>
                {text}
            </Link>
        </div>
    );
};

export default IllustTitle;
