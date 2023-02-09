import { search } from "../../utils/pixivApi";
import { get } from "../../utils/configOperator";
import { PixivFilter } from "../../filter/PixivFilter";
import tagFilter from "../../filter/tagFilter";
import undefinedFilter from "../../filter/undefinedFilter";
import renderingTagsRoot from "./renderingTagsRoot";
import { getSearchQuery } from "../../utils/getSearchQuery";

function tags(searchKeyword: string) {
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
            await renderingTagsRoot();
            renderingWithSearchData(searchKeyword);
        });

        /**
         * queryが変更された時
         */
        const searchChangeListener = () => {
            console.log("search change");
            renderingWithSearchData(searchKeyword);
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
