export type PageChangeEvent = {
  before: string;
  new: string;
};
export type SearchChangeEvent = {
  before: { search: string; path: string };
  new: { search: string; path: string };
  pageChangeEvent: PageChangeEvent;
};

/**
 * Observe the changeng of page or search.
 *
 * When the page chenged, document be dispatched `pixiv-tag-filter-pageChange` event.
 *
 * When the search chenged, dispatched `pixiv-tag-filter-searchChange` event.
 */
export function observeChangeContent() {
  let pathNameTmp = "";
  let searchTmp = location.search;
  let searchPathTmp = location.pathname;

  const observer = new MutationObserver(() => {
    if (location.pathname !== pathNameTmp) {
      document.dispatchEvent(
        new CustomEvent<PageChangeEvent>("pixiv-tag-filter-pageChange", {
          detail: { before: pathNameTmp, new: location.pathname },
        }),
      );

      pathNameTmp = location.pathname;
    } else if (location.search !== searchTmp) {
      document.dispatchEvent(
        new CustomEvent<SearchChangeEvent>("pixiv-tag-filter-searchChange", {
          detail: {
            before: { search: searchTmp, path: searchPathTmp },
            new: {
              search: location.search,
              path: location.pathname,
            },
            pageChangeEvent: { before: pathNameTmp, new: location.pathname },
          },
        }),
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
}
