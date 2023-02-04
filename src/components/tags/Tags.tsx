import React, { useState } from "react";
import TagsContainer from "./TagsContainer";
import { illust } from "../../pixivApi";
import { useRouter } from "../Router";
import { RouterContext } from "../Router";

const Tags = () => {
    const [illusts, setillusts] = useState<illust[]>([]);

    const router = useRouter();

    document.addEventListener(
        "pixiv-tag-filter-rendering-tags",
        (e: CustomEvent<illust[]>) => {
            setillusts(e.detail);
        }
    );

    return (
        <RouterContext.Provider value={router}>
            <TagsContainer illusts={illusts} />
        </RouterContext.Provider>
    );
};

export default Tags;
