import React from "react";
import style from "../tags.css";
import IllustItemLike from "./IllustItemLike";
import { Link } from "../../Router";
import { IllustContext } from "../IllustContext";

const illustItemillust = ({}: {}) => {
    return (
        <IllustContext.Consumer>
            {(illust) => (
                <div className={style.illust_item_illust}>
                    <div className={style.illust_item_illust_inner}>
                        <Link
                            className={style.illust_item_link}
                            href={"/artworks/" + illust.id}
                        >
                            <div className={style.illust_item_illust_img_outer}>
                                <img
                                    className={style.illust_item_illust_img}
                                    src={illust.url}
                                />
                            </div>
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
