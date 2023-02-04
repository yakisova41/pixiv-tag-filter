export type Users =
    | "00"
    | "50"
    | "100"
    | "300"
    | "500"
    | "1000"
    | "5000"
    | "10000"
    | "20000"
    | "30000";

export type TagFilterConfig = {
    blocklist?: string[];
    block?: boolean;
    users?: false | Users;
};

export const configExist = () => {
    const config = localStorage.getItem("pixiv-tag-filter-config");

    if (config === null) {
        localStorage.setItem(
            "pixiv-tag-filter-config",
            JSON.stringify({
                blocklist: [],
                block: true,
                users: false,
            })
        );
    }
};

export const get = (): TagFilterConfig => {
    configExist();
    return JSON.parse(localStorage.getItem("pixiv-tag-filter-config"));
};

export const set = (key: keyof TagFilterConfig, value: any) => {
    configExist();

    const config = get();
    config[key] = value;

    localStorage.setItem("pixiv-tag-filter-config", JSON.stringify(config));
};
