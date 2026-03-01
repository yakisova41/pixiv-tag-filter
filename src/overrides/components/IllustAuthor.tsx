import { IllustContext } from "./IllustContext";
import { Link } from "./Router";

const IllustAuthor = ({}: {}) => {
  return (
    <IllustContext.Consumer>
      {(illust) => (
        <div className={"illust_about"}>
          <div className={"illust_author_icon_outer"}>
            <Link href={"/users/" + illust.userId}>
              <div className={"illust_author_icon"}>
                <img src={illust.profileImageUrl} width="24" height="24" />
              </div>
            </Link>
          </div>

          <Link
            href={"/users/" + illust.userId}
            className={"illust_author_link"}
          >
            {illust.userName}
          </Link>
        </div>
      )}
    </IllustContext.Consumer>
  );
};

export default IllustAuthor;
