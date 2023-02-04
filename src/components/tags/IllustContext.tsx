import React, { createContext } from "react";
import { illust } from "../../pixivApi";

export const IllustContext = createContext<illust | null>(null);
