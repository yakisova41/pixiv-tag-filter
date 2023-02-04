import React from "react";
import style from "./tags.css";
import IllustItemillust from "./illust/IllustItemIlust";
import IllustTitle from "./IllustTitle";
import IllustAuthor from "./IllustAuthor";

const illustItem = ({
    imgsrc,
    title,
    authorName,
    authorIcon,
    liked,
    authorLink,
    illustLink,
}: {
    imgsrc: string;
    title: string;
    authorName: string;
    authorIcon: string;
    liked: boolean;
    authorLink: string;
    illustLink: string;
}) => {
    return (
        <li className={style.illust_item_il}>
            <div className={style.illust_item_content}>
                <IllustItemillust
                    imgsrc={imgsrc}
                    imgLiked={liked}
                    illustLink={illustLink}
                />
                <IllustTitle text={title} illustLink={illustLink} />
                <IllustAuthor
                    iconSrc={authorIcon}
                    authorName={authorName}
                    authorLink={authorLink}
                />
            </div>
        </li>
    );
};

export default illustItem;
