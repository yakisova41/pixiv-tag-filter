/**
 * queryを取得
 * @returns query
 */
export function getSearchQuery() {
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
