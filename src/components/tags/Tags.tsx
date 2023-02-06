import React, { useLayoutEffect, useState } from "react";
import TagsContainer from "./TagsContainer";
import { illust } from "../../pixivApi";
import { useRouter } from "../Router";
import { RouterContext } from "../Router";
import NotFound from "./NotFound";

const Tags = () => {
    const [illusts, setillusts] = useState<illust[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    document.addEventListener(
        "pixiv-tag-filter-rendering-tags",
        (e: CustomEvent<illust[]>) => {
            setillusts(e.detail);
            setLoading(true);
        }
    );

    useLayoutEffect(() => {
        setLoading(false);
    });

    return (
        <>
            {!loading && (
                <>
                    {illusts.length === 0 ? (
                        <NotFound />
                    ) : (
                        <RouterContext.Provider value={router}>
                            <TagsContainer illusts={illusts} />
                        </RouterContext.Provider>
                    )}
                </>
            )}
        </>
    );
};

export default Tags;
