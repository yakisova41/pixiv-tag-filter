import { illust } from "../pixivApi";
import { Filter } from "./PixivFilter";
import { get } from "../configOperator";

export default <Filter>{
    filter: (illust: illust) => {
        const blocktags = get().blocklist;
        let block = false;

        illust.tags?.forEach((tag) => {
            if (blocktags.includes(tag)) {
                block = true;
            }
        });

        return block;
    },
};
