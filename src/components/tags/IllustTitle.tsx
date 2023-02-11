import React from "react";
import style from "./tags.css";
import { Link } from "../Router";
import { IllustContext } from "./IllustContext";
import { appendCache } from "../../pages/tags/tagsCache";

const handleClick = () => {
    appendCache("scroll", window.scrollY);
};

const IllustTitle = ({}: {}) => {
    return (
        <IllustContext.Consumer>
            {(illust) => (
                <div className={style.illust_about}>
                    <Link
                        href={"/artworks/" + illust.id}
                        className={style.illust_title_link}
                        onClick={handleClick}
                    >
                        {illust.title}
                    </Link>
                </div>
            )}
        </IllustContext.Consumer>
    );
};

export default IllustTitle;
