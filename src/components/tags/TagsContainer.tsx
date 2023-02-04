import React, { useState } from "react";
import style from "./tags.css";
import IllustItem from "./IllustItem";
import { illust } from "../../pixivApi";

const TagsContainer = ({ illusts }: { illusts: illust[] }) => {
    let key = 0;
    return (
        <ul className={style.tags_container_ul}>
            {illusts.map((illustdata) => {
                key++;
                return (
                    <IllustItem
                        key={key}
                        imgsrc={illustdata.url}
                        title={illustdata.title}
                        authorName={illustdata.userName}
                        authorIcon={illustdata.profileImageUrl}
                        liked={illustdata.bookmarkData !== null}
                        authorLink={"/users/" + illustdata.userId}
                        illustLink={"/artworks/" + illustdata.id}
                    />
                );
            })}
        </ul>
    );
};

export default TagsContainer;
