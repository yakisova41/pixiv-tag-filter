import { illust } from "../utils/pixivApi";
import { Filter } from "./PixivFilter";
import { get } from "../utils/configOperator";

export default <Filter>{
  filter: (illust: illust) => {
    const { ugoiraBlock } = get();
    let block = false;

    if (ugoiraBlock && illust.illustType === 2) {
      block = true;
    }

    return block;
  },
};
