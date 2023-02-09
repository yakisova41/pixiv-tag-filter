import React, { useLayoutEffect, useState } from "react";
import IllustElements from "./IllustElements";
import { illust } from "../../utils/pixivApi";
import NotFound from "./NotFound";

const Illusts = () => {
    const [illusts, setIllusts] = useState<illust[] | null>(null);
    const [show, setShow] = useState(false);

    document.addEventListener("pixiv-tag-filter-fetch", (e: CustomEvent) => {
        setShow(false);
        setIllusts(e.detail);
    });

    useLayoutEffect(() => {
        setShow(true);
    });

    return (
        <>
            {illusts !== null && (
                <>
                    {illusts.length === 0 ? (
                        <NotFound />
                    ) : (
                        show && <IllustElements illusts={illusts} />
                    )}
                </>
            )}
        </>
    );
};

export default Illusts;
