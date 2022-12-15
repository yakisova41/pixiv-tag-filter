import { sort } from "./pages/tags";
import createController from "./createController";
import styles from "./styles/controller.css";

/**
 * dom変更の監視
 */
const body = document.querySelector("body");
let bodyTmp = body.innerHTML;
setInterval(() => {
  if (body.innerHTML !== bodyTmp) {
    const domChangeEvent = new CustomEvent("pixiv-domChange");
    document.dispatchEvent(domChangeEvent);
  }
  bodyTmp = document.querySelector("body").innerHTML;
});

/**
 * ページ変更の監視
 */
let pathTmp = "";
let searchTmp = "";

setInterval(() => {
  const path = location.pathname;
  const search = location.search;

  if (pathTmp !== path || search !== searchTmp) {
    const pageChangeEvent = new CustomEvent("pixiv-pageChange", {
      detail: {
        new: path,
        before: pathTmp,
        newSearch: search,
        beforeSearch: searchTmp,
        ispath: pathTmp !== path,
      },
    });
    document.dispatchEvent(pageChangeEvent);
  }

  pathTmp = path;
  searchTmp = search;
});

/**
 * ページ変更イベント```pixiv-pagechange```があった際、```location.pathname```に適切な関数を実行
 */
const pageChangeHandler = (e: CustomEvent) => {
  const pathnameSplit = e.detail.new.split("/");

  switch (pathnameSplit[1]) {
    case "artworks":
      //イラストページ

      break;

    case "tags":
      //検索画面
      let lazy = true;

      const renderOvserve = setInterval(() => {
        const imgs = document.querySelectorAll("img");
        if (imgs?.length > 50) {
          sort(pathnameSplit[2]);
          lazy = false;
          console.log("rendering after image load completed");
          clearInterval(renderOvserve);
        }
      });

      setTimeout(() => {
        if (lazy) {
          sort(pathnameSplit[2]);
          console.log("lazy rendering completed");
          clearInterval(renderOvserve);
        }
      }, 1000);

      document.addEventListener("pixiv-storageChange", () => {
        setTimeout(() => {
          sort(location.pathname.split("/")[2]);
          console.log("rerendering completed");
        }, 1);
      });

      break;

    case "":
      //トップページ
      break;

    case "cate_r18.php":
      //r18トップページ
      break;

    default:
      break;
  }
};
document.addEventListener(
  "pixiv-pageChange",
  pageChangeHandler as EventListenerOrEventListenerObject
);

/**
 * コントローラーを描画
 */

document.addEventListener("pixiv-domChange", () => {
  if (document.querySelector(`.${styles.controllerContainer}`) === null) {
    createController();
  }
});
