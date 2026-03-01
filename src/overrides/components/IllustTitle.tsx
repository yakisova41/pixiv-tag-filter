import { IllustContext } from "./IllustContext";
import { appendCache } from "../../cache";
import { Link } from "./Router";

const handleClick = () => {
  appendCache("scroll", window.scrollY);
};

const IllustTitle = ({}: {}) => {
  return (
    <IllustContext.Consumer>
      {(illust) => (
        <div className={"illust_about"}>
          <Link
            href={"/artworks/" + illust.id}
            className={"illust_title_link"}
            onClick={handleClick}
          >
            {illust.title}
          </Link>
        </div>
      )}
    </IllustContext.Consumer>
  );
};

export default IllustTitle;
