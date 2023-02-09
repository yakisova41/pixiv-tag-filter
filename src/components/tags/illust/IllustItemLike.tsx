import React from "react";
import style from "../tags.css";
import { useState } from "react";
import {
    getCsrf,
    bookmark_add,
    bookmark_remove,
} from "../../../utils/pixivApi";

const IllustItemLike = ({
    liked,
    illustId,
}: {
    liked: boolean;
    illustId: string;
}) => {
    const [islike, setIslike] = useState(liked);

    const handleClick = async () => {
        const csrf = await getCsrf();

        if (islike) {
            setIslike(false);
            bookmark_remove(illustId, csrf);
        } else {
            setIslike(true);
            bookmark_add(illustId, csrf);
        }
    };

    return (
        <div className={style.illust_item_like_outer}>
            <div>
                <button
                    className={style.illust_item_likebtn}
                    onClick={handleClick}
                >
                    <svg
                        viewBox="0 0 32 32"
                        width="32"
                        height="32"
                        className={
                            style.illust_item_likebtn_svg +
                            " " +
                            (islike ? style.illust_item_likebtn_svg_liked : "")
                        }
                    >
                        <path d="M21,5.5 C24.8659932,5.5 28,8.63400675 28,12.5 C28,18.2694439 24.2975093,23.1517313 17.2206059,27.1100183C16.4622493,27.5342993 15.5379984,27.5343235 14.779626,27.110148 C7.70250208,23.1517462 4,18.2694529 4,12.5C4,8.63400691 7.13400681,5.5 11,5.5 C12.829814,5.5 14.6210123,6.4144028 16,7.8282366C17.3789877,6.4144028 19.170186,5.5 21,5.5 Z"></path>
                        <path
                            d="M16,11.3317089 C15.0857201,9.28334665 13.0491506,7.5 11,7.5C8.23857625,7.5 6,9.73857647 6,12.5 C6,17.4386065 9.2519779,21.7268174 15.7559337,25.3646328C15.9076021,25.4494645 16.092439,25.4494644 16.2441073,25.3646326 C22.7480325,21.7268037 26,17.4385986 26,12.5C26,9.73857625 23.7614237,7.5 21,7.5 C18.9508494,7.5 16.9142799,9.28334665 16,11.3317089 Z"
                            className={
                                style.illust_item_likebtn_svg_inner +
                                " " +
                                (islike
                                    ? style.illust_item_likebtn_svg_inner_liked
                                    : "")
                            }
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default IllustItemLike;
