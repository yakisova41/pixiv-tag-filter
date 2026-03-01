import { illust } from "../../pixiv/pixivApi";
import { IllustContext } from "./IllustContext";
import IllustItem from "./IllustItem";

const IllustElements = ({ illusts }: { illusts: illust[] }) => {
  let key = 0;
  return (
    <ul className={"tags_container_ul"}>
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
