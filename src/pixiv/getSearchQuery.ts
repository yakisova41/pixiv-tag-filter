import { SMode, Type } from "./pixivApi";

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
  const pageNumber = query.hasOwnProperty("p") ? Number(query["p"]) : 1;
  const mode: "all" | "r18" | "safe" = query.hasOwnProperty("mode")
    ? query["mode"]
    : "all";
  const order: "date" | "date_d" = query.hasOwnProperty("order")
    ? query["order"]
    : "date_d";
  const type: Type = query.hasOwnProperty("type") ? query["type"] : null;
  const q: string | null = query.hasOwnProperty("q") ? query["q"] : null;
  const s_mode: null | SMode = query.hasOwnProperty("s_mode")
    ? query["s_mode"]
    : null;

  return { pageNumber, mode, order, type, q, s_mode };
}
