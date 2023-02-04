export type PageChangeEvent = string;
export type SearchChangeEvent = string;

const pageChangeObserver = (): void => {
    let pathNameTmp = "";
    let searchTmp = "";

    const observer = new MutationObserver(() => {
        if (location.pathname !== pathNameTmp) {
            document.dispatchEvent(
                new CustomEvent<PageChangeEvent>(
                    "pixiv-tag-filter-pageChange",
                    {
                        detail: location.pathname,
                    }
                )
            );

            pathNameTmp = location.pathname;
        }

        if (location.search !== searchTmp) {
            document.dispatchEvent(
                new CustomEvent<SearchChangeEvent>(
                    "pixiv-tag-filter-searchChange",
                    {
                        detail: location.search,
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