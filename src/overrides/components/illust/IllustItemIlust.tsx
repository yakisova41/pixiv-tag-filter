import { useEffect } from "react";
import { IllustContext } from "../IllustContext";
import { appendCache } from "../../../cache";
import Ugoira from "./Ugoira";
import PageCount from "./PageCount";
import { Link } from "../Router";
import Sensitive from "./Sensitive";
import IllustItemLike from "./IllustItemLike";

const IllustItemillust = ({}: {}) => {
  const r18type = (tags: string[]) => {
    if (tags !== undefined && tags[0] === "R-18") {
      return "R-18";
    } else if (tags !== undefined && tags[0] === "R-18G") {
      return "R-18G";
    } else {
      return false;
    }
  };

  const handleClick = () => {
    appendCache("scroll", window.scrollY);
  };

  return (
    <IllustContext.Consumer>
      {(illust) => (
        <div className={"illust_item_illust"}>
          <div className={"illust_item_illust_inner"}>
            <Link
              className={"illust_item_link"}
              href={"/artworks/" + illust.id}
              onClick={handleClick}
            >
              <div className={"illust_item_illust_img_outer"}>
                <img className={"illust_item_illust_img"} src={illust.url} />
                {illust.illustType === 2 && <Ugoira />}
              </div>

              <div className={"top_container"}>
                <Sensitive value={r18type(illust.tags)} />

                {illust.pageCount !== 1 && (
                  <PageCount count={illust.pageCount} />
                )}
              </div>
            </Link>

            <IllustItemLike
              liked={illust.bookmarkData !== null}
              illustId={illust.id}
            />
          </div>
        </div>
      )}
    </IllustContext.Consumer>
  );
};

export default IllustItemillust;
