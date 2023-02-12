import React, { createContext } from "react";
import { illust } from "../../utils/pixivApi";

export const IllustContext = createContext<illust | null>(null);
