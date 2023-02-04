import React from "react";
import style from "../tags.css";
import IllustItemLike from "./IllustItemLike";
import { Link } from "../../Router";

const illustItemillust = ({
    imgsrc,
    imgLiked,
    illustLink,
}: {
    imgsrc: string;
    imgLiked: boolean;
    illustLink: string;
}) => {
    return (
        <div className={style.illust_item_illust}>
            <div className={style.illust_item_illust_inner}>
                <Link className={style.illust_item_link} href={illustLink}>
                    <div className={style.illust_item_illust_img_outer}>
                        <img
                            className={style.illust_item_illust_img}
                            src={imgsrc}
                        />
                    </div>
                </Link>

                <IllustItemLike liked={imgLiked} />
            </div>
        </div>
    );
};

export default illustItemillust;
