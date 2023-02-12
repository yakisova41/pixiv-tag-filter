import React, { useEffect } from "react";
import style from "../tags.css";
import IllustItemLike from "./IllustItemLike";
import Sensitive from "./Sensitive";
import { Link } from "../../Router";
import { IllustContext } from "../IllustContext";
import { appendCache } from "../../../pages/tags/tagsCache";

const illustItemillust = ({}: {}) => {
    const r18type = (tags: string[]) => {
        if (tags[0] === "R-18") {
            return "R-18";
        } else if (tags[0] === "R-18G") {
            return "R-18G";
        } else {
            return false;
        }
    };

    const handleClick = () => {
        appendCache("scroll", window.scrollY);
    };

    return (
        <IllustContext.Consumer>
            {(illust) => (
                <div className={style.illust_item_illust}>
                    <div className={style.illust_item_illust_inner}>
                        <Link
                            className={style.illust_item_link}
                            href={"/artworks/" + illust.id}
                            onClick={handleClick}
                        >
                            <div className={style.illust_item_illust_img_outer}>
                                <img
                                    className={style.illust_item_illust_img}
                                    src={illust.url}
                                />
                            </div>

                            <Sensitive value={r18type(illust.tags)} />
                        </Link>

                        <IllustItemLike
                            liked={illust.bookmarkData !== null}
                            illustId={illust.id}
                        />
                    </div>
                </div>
            )}
        </IllustContext.Consumer>
    );
};

export default illustItemillust;
