export type PageChangeEvent = {
    before: string;
    new: string;
};
export type SearchChangeEvent = {
    before: { search: string; path: string };
    new: { search: string; path: string };
};

/**
 * DOMの変更をobserveし、
 * location.pathnameの変更時にpixiv-tag-filter-pageChangeイベントを、
 * location.searchの変更時にpixiv-tag-filter-searchChangeイベントを発火します。
 */
const pageChangeObserver = (): void => {
    let pathNameTmp = "";
    let searchTmp = location.search;
    let searchPathTmp = location.pathname;

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
                        detail: {
                            before: { search: searchTmp, path: searchPathTmp },
                            new: {
                                search: location.search,
                                path: location.pathname,
                            },
                        },
                    }
                )
            );
            searchTmp = location.search;
            searchPathTmp = location.pathname;
        }
    });

    observer.observe(document.querySelector("body"), {
        characterData: true,
        attributes: true,
        subtree: true,
    });
};

export default pageChangeObserver;
