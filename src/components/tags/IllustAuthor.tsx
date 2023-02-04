import React from "react";
import style from "./tags.css";
import { Link } from "../Router";

const IllustAuthor = ({
    authorName,
    iconSrc,
    authorLink,
}: {
    authorName: string;
    iconSrc: string;
    authorLink: string;
}) => {
    return (
        <div className={style.illust_about}>
            <div className={style.illust_author_icon_outer}>
                <Link href={authorLink}>
                    <div className={style.illust_author_icon}>
                        <img src={iconSrc} width="24" height="24" />
                    </div>
                </Link>
            </div>

            <a className={style.illust_author_link}>{authorName}</a>
        </div>
    );
};

export default IllustAuthor;
