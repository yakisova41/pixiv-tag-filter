export type PageChangeEvent = {
    before: string;
    new: string;
};
export type SearchChangeEvent = {
    before: string;
    new: string;
};

/**
 * DOMの変更をobserveし、
 * location.pathnameの変更時にpixiv-tag-filter-pageChangeイベントを、
 * location.searchの変更時にpixiv-tag-filter-searchChangeイベントを発火します。
 */
const pageChangeObserver = (): void => {
    let pathNameTmp = "";
    let searchTmp = "";

    const observer = new MutationObserver(() => {
        if (location.pathname !== pathNameTmp) {
            document.dispatchEvent(
                new CustomEvent<PageChangeEvent>(
                    "pixiv-tag-filter-pageChange",
                    {
                        detail: { before: pathNameTmp, new: location.pathname },
                    }
                )
            );

            pathNameTmp = location.pathname;
        } else if (location.search !== searchTmp) {
            document.dispatchEvent(
                new CustomEvent<SearchChangeEvent>(
                    "pixiv-tag-filter-searchChange",
                    {
                        detail: { before: searchTmp, new: location.search },
                    }
                )
            );
            searchTmp = location.search;
        }
    });

    observer.observe(document.querySelector("body"), {
        characterData: true,
        attributes: true,
        subtree: true,
    });
};

export default pageChangeObserver;
