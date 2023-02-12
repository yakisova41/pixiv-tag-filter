import { search } from "../../utils/pixivApi";
import { get } from "../../utils/configOperator";
import { PixivFilter } from "../../filter/PixivFilter";
import tagFilter from "../../filter/tagFilter";
import undefinedFilter from "../../filter/undefinedFilter";
import renderingTagsRoot from "./renderingTagsRoot";
import { getSearchQuery } from "../../utils/getSearchQuery";
import { setCache, getCache } from "./tagsCache";
import {
    PageChangeEvent,
    SearchChangeEvent,
} from "../../utils/pageChangeObserver";

function tags(searchKeyword: string, pathdata: PageChangeEvent) {
    if (get().block) {
        const filter = new PixivFilter();
        filter.addFilter(tagFilter);
        filter.addFilter(undefinedFilter);

        /**
         * 絞り込みの結果をreactのレンダリングイベントに発火します。
         * @param searchKeyword
         */
        const renderingWithSearchData = async (searchKeyword: string) => {
            const { pageNumber, mode, order } = getSearchQuery();
            const { users } = get();

            const usersText = users === false ? "" : users + "users";
            const searchResponse = await search(
                searchKeyword + " " + usersText,
                pageNumber,
                mode,
                order
            );

            const sortResult = filter.run(searchResponse.body.illustManga.data);

            setCache(sortResult);

            document.dispatchEvent(
                new CustomEvent("pixiv-tag-filter-fetch", {
                    detail: sortResult,
                })
            );
        };

        /**
         * ページ読み込み時
         */
        setTimeout(async () => {
            await renderingTagsRoot(pathdata);
            /**
             * tags->artworks->tags時のキャッシュ処理
             */
            if (pathdata.before.split("/")[1] === "artworks") {
                let isScroll = false;
                const cache = getCache();

                if (cache !== undefined) {
                    const renderListener = () => {
                        isScroll = true;
                        setTimeout(() => {
                            window.scroll({
                                top: cache.scroll,
                            });
                        }, 1);
                        document.removeEventListener(
                            "pixiv-tag-filter-render-success",
                            renderListener
                        );
                    };
                    document.addEventListener(
                        "pixiv-tag-filter-render-success",
                        renderListener
                    );

                    if (cache.status === "OK") {
                        setTimeout(() => {
                            document.dispatchEvent(
                                new CustomEvent("pixiv-tag-filter-fetch", {
                                    detail: cache.data,
                                })
                            );
                            setCache(cache.data);

                            const interval = setInterval(() => {
                                if (isScroll) {
                                    window.scroll({
                                        top: cache.scroll,
                                    });
                                    clearInterval(interval);
                                }
                            });
                        });
                    }

                    if (cache.status === "TIMEOUT") {
                        await renderingWithSearchData(searchKeyword);

                        const interval = setInterval(() => {
                            if (isScroll) {
                                window.scroll({
                                    top: cache.scroll,
                                });
                                clearInterval(interval);
                            }
                        });
                    }
                } else {
                    renderingWithSearchData(searchKeyword);
                }
            } else {
                renderingWithSearchData(searchKeyword);
            }
        });

        /**
         * queryが変更された時
         */
        const searchChangeListener = ({
            detail,
        }: CustomEvent<SearchChangeEvent>) => {
            if (detail.before.path.split("/")[1] !== "artworks") {
                console.log("search change");
                renderingWithSearchData(searchKeyword);
            }
        };
        document.addEventListener(
            "pixiv-tag-filter-searchChange",
            searchChangeListener
        );

        /**
         * configが変更された時
         */
        const configUpdateListener = () => {
            console.log("config update");
            renderingWithSearchData(searchKeyword);
        };
        document.addEventListener(
            "pixiv-tag-filter-config-update",
            configUpdateListener
        );

        /**
         * pageChangeのイベント時、すべてのイベントリスナーを放棄
         */
        const pageChangeListener = () => {
            document.removeEventListener(
                "pixiv-tag-filter-searchChange",
                searchChangeListener
            );
            document.removeEventListener(
                "pixiv-tag-filter-config-update",
                configUpdateListener
            );
            document.removeEventListener(
                "pixiv-tag-filter-pageChange",
                pageChangeListener
            );
        };
        document.addEventListener(
            "pixiv-tag-filter-pageChange",
            pageChangeListener
        );
    }
}

export default tags;
