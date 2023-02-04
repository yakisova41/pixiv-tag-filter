import React from "react";
import style from "./tags.css";
import { Link } from "../Router";
import { IllustContext } from "./IllustContext";

const IllustAuthor = ({}: {}) => {
    return (
        <IllustContext.Consumer>
            {(illust) => (
                <div className={style.illust_about}>
                    <div className={style.illust_author_icon_outer}>
                        <Link href={"/users/" + illust.userId}>
                            <div className={style.illust_author_icon}>
                                <img
                                    src={illust.profileImageUrl}
                                    width="24"
                                    height="24"
                                />
                            </div>
                        </Link>
                    </div>

                    <a className={style.illust_author_link}>
                        {illust.userName}
                    </a>
                </div>
            )}
        </IllustContext.Consumer>
    );
};

export default IllustAuthor;
