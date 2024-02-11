import React from "react";
import style from "./tags.css";
import IllustItem from "./IllustItem";
import { illust } from "../../utils/pixivApi";
import { IllustContext } from "./IllustContext";

const IllustElements = ({ illusts }: { illusts: illust[] }) => {
  let key = 0;
  return (
    <ul className={style.tags_container_ul}>
      {illusts.map((illustdata) => {
        key++;
        return (
          illustdata.id !== undefined && (
            <IllustContext.Provider key={key} value={illustdata}>
              <IllustItem />
            </IllustContext.Provider>
          )
        );
      })}
    </ul>
  );
};

export default IllustElements;
