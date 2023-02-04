import { search } from "../../pixivApi";
import { get, Users } from "../../configOperator";
import { PixivFilter } from "../../filter/PixivFilter";
import tagFilter from "../../filter/tagFilter";
import renderingTagsRoot from "./renderingTagsRoot";

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

function getUsersText(users: false | Users) {
    let text = "";

    if (users !== false) {
        text = users + "users";
    }

    return text;
}

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
    const sortResult = pixivfilter.run(searchResponse.body.illustManga.data);

    return sortResult;
}

function tags(searchKeyword: string) {
    if (get().block) {
        const renderingWithSearchData = (searchKeyword: string) => {
            searchSort(searchKeyword).then((sortResult) => {
                document.dispatchEvent(
                    new CustomEvent("pixiv-tag-filter-rendering-tags", {
                        detail: sortResult,
                    })
                );
            });
        };

        setTimeout(() => {
            renderingTagsRoot();
            renderingWithSearchData(searchKeyword);
        });

        document.addEventListener("pixiv-tag-filter-searchChange", () => {
            renderingWithSearchData(searchKeyword);
        });
        document.addEventListener("pixiv-tag-filter-config-update", () => {
            renderingWithSearchData(searchKeyword);
        });
    }
}

export default tags;
