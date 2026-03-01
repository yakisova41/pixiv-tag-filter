import IllustItemillust from "./illust/IllustItemIlust";
import IllustAuthor from "./IllustAuthor";
import IllustTitle from "./IllustTitle";

const illustItem = ({}: {}) => {
  return (
    <li className={"illust_item_il"}>
      <div className={"illust_item_content"}>
        <IllustItemillust />
        <IllustTitle />
        <IllustAuthor />
      </div>
    </li>
  );
};

export default illustItem;
