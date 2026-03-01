import { get } from "../configOperator";
import { illust } from "../pixiv/pixivApi";
import { Filter } from "./PixivFilter";

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
