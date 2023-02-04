import { illust } from "../pixivApi";
import { Filter } from "./PixivFilter";

export default <Filter>{
    filter: (illust: illust) => {
        let block = false;

        if (illust.url === undefined) {
            block = true;
        }

        return block;
    },
};
