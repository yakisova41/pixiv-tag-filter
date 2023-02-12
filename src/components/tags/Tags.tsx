import React from "react";
import { useRouter } from "../Router";
import { RouterContext } from "../Router";
import Illusts from "./Illusts";

const Tags = () => {
    const router = useRouter();

    return (
        <RouterContext.Provider value={router}>
            <Illusts />
        </RouterContext.Provider>
    );
};

export default Tags;
