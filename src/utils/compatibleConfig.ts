import { get, set, configExist } from "./configOperator";

/**
 * 0.1xバージョンで使用されていたblockリストを
 * configに挿入します
 */
export default () => {
    configExist();

    const config = get();

    const blocklist = localStorage.getItem("pixiv-filter-blocklist");
    if (blocklist !== null) {
        set("blocklist", [...config.blocklist, ...blocklist.split(",")]);
        localStorage.removeItem("pixiv-filter-blocklist");
    }

    const users = localStorage.getItem("pixiv-filter-usersonly");
    if (users !== null) {
        if (users === "0") {
            set("users", false);
        } else {
            set("users", users);
        }
        localStorage.removeItem("pixiv-filter-usersonly");
    }
};
