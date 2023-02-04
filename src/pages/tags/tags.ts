import { search } from "../../pixivApi";
import { get, Users } from "../../configOperator";
import { PixivFilter } from "../../filter/PixivFilter";
import tagFilter from "../../filter/tagFilter";
import undefinedFilter from "../../filter/undefinedFilter";
import renderingTagsRoot from "./renderingTagsRoot";

/**
 * queryを取得
 * @returns query
 */
function getQuery() {
    let query = {};
    location.search
        .split("?")[1]
        ?.split("&")
        .map((search) => {
            const splited = search.split("=");
            query[splited[0]] = splited[1];
        });
    const pageNumber = query.hasOwnProperty("p") ? query["p"] : 1;
    const mode = query.hasOwnProperty("mode") ? query["mode"] : "all";
    const order = query.hasOwnProperty("order") ? query["order"] : "date_d";

    return { pageNumber, mode, order };
}

/**
 * usersがfalse出ない時はusers + "users"を返します
 * falseであるときは""を返します
 * @param users usersのモード
 * @returns usersText
 */
function getUsersText(users: false | Users) {
    let text = "";

    if (users !== false) {
        text = users + "users";
    }

    return text;
}

/**
 * 検索をした後、絞り込みを行います
 * @param searchKeyword 検索ワード
 * @returns 絞り込みのresult
 */
async function searchSort(searchKeyword: string) {
    const { pageNumber, mode, order } = getQuery();
    const { users } = get();

    const usersText = getUsersText(users);
    const searchResponse = await search(
        searchKeyword + " " + usersText,
        pageNumber,
        mode,
        order
    );

    const pixivfilter = new PixivFilter();
    pixivfilter.addFilter(tagFilter);
    pixivfilter.addFilter(undefinedFilter);

    const sortResult = pixivfilter.run(searchResponse.body.illustManga.data);
    return sortResult;
}

function tags(searchKeyword: string) {
    if (get().block) {
        /**
         * 絞り込みの結果をreactのレンダリングイベントに発火します。
         * @param searchKeyword
         */
        const renderingWithSearchData = (searchKeyword: string) => {
            searchSort(searchKeyword).then((sortResult) => {
                document.dispatchEvent(
                    new CustomEvent("pixiv-tag-filter-rendering-tags", {
                        detail: sortResult,
                    })
                );
            });
        };

        /**
         * ページ読み込み時
         */
        setTimeout(() => {
            renderingTagsRoot();
            renderingWithSearchData(searchKeyword);
        }, 100);

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
