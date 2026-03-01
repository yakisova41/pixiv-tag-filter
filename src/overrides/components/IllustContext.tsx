import { createContext } from "react";
import { illust } from "../../pixiv/pixivApi";

export const IllustContext = createContext<illust | null>(null);
