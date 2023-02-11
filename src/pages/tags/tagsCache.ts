import { illust } from "../../utils/pixivApi";

/**
 * キャッシュを設定します
 * @param data キャッシュされたデータ
 */
export const setCache = (data: illust[]) => {
    localStorage.setItem(
        "pixiv-tag-filter-cache",
        JSON.stringify({
            data,
            time: Date.now(),
            path: location.href,
        })
    );
};

/**
 * キャッシュに値を挿入します
 * @param key key
 * @param value 値
 */
export const appendCache = (key: string, value: any) => {
    const cache = JSON.parse(localStorage.getItem("pixiv-tag-filter-cache"));
    localStorage.setItem(
        "pixiv-tag-filter-cache",
        JSON.stringify({
            ...cache,
            [key]: value,
        })
    );
};

/**
 * キャッシュされたデータを返します。
 * 返すキャッシュがない場合、もしくはキャッシュから10秒立っている場合はundefinedを返します。
 * @returns キャッシュ
 */
export const getCache = () => {
    const data = JSON.parse(localStorage.getItem("pixiv-tag-filter-cache"));

    if (data === undefined) {
        return undefined;
    }

    const { time, path } = data;

    if (location.href !== path) {
        return undefined;
    }

    const now = Date.now();
    const diff = now - time;

    if (diff < 10000) {
        return data;
    }

    return undefined;
};
