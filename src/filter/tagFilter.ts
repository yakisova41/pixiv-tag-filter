import { illust } from "../utils/pixivApi";
import { Filter } from "./PixivFilter";
import { get } from "../utils/configOperator";

export default <Filter>{
  filter: (illust: illust) => {
    const { blocklist, r18gBlock } = get();

    if (r18gBlock) {
      blocklist.push("R-18G");
    }

    let block = false;

    illust.tags?.forEach((tag) => {
      if (blocklist.includes(tag)) {
        block = true;
      }
    });

    return block;
  },
};
