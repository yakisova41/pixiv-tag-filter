import ReactDOM from "react-dom/client";
import React from "react";
import Tags from "../../components/tags/Tags";
import originalTagsHide from "./originalTagsHide";
import { PageChangeEvent } from "../../utils/pageChangeObserver";

/**
 * 要素が見つかるまで探し続けます。
 * @param selector selector
 * @returns
 */
function elementFind(selector: string): {
  promise: Promise<Element>;
  stop: () => void;
} {
  let i: NodeJS.Timer;
  return {
    promise: new Promise((resolve, reject) => {
      i = setInterval(() => {
        const elem = document.querySelector(selector);

        if (elem !== null) {
          clearInterval(i);
          resolve(elem);
        }
      });
    }),
    stop: () => {
      clearInterval(i);
    },
  };
}

/**
 * 二種類あるulエレメントを探し続けます。
 * どちらかが見つかるとelementを返し終了します
 * @returns ulのelement
 */
function findIllustElement(): Promise<HTMLUListElement> {
  return new Promise((resolve) => {
    const selectors = [
      "#root > div.charcoal-token > div > div:nth-child(3) > div > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)",
      "#root > div.charcoal-token > div > div:nth-child(3) > div > div > div:nth-child(6) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)",
      "#root > div.charcoal-token > div > div:nth-child(3) > div > div > div:nth-child(5) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)",
      "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)",
      "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)",
      "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(5) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)",
    ];

    const finders = [];

    selectors.forEach((selector, index) => {
      const find = elementFind(selector);

      find.promise.then((elem: HTMLUListElement) => {
        finders.forEach((finder, finderIndex) => {
          if (index !== finderIndex) {
            finder.stop();
          }
        });

        resolve(elem);
      });

      finders.push(find);
    });
  });
}

/**
 * tagsページのreactrootを作成します。
 */
async function renderingTagsRoot(pathdata: PageChangeEvent) {
  if (pathdata.before.split("/")[1] !== "tags") {
    const illustsElement = await findIllustElement();

    const reactRootElem = document.createElement("div");
    reactRootElem.id = "pixiv_tag_filter_tags_root";

    illustsElement.before(reactRootElem);

    originalTagsHide();

    const reactRoot = ReactDOM.createRoot(reactRootElem);

    reactRoot.render(
      <React.StrictMode>
        <Tags />
      </React.StrictMode>
    );

    /**
     * ページ変更時にreactrootをunmount
     * @param e
     */
    const pageChangeLisnter = (e: CustomEvent<PageChangeEvent>) => {
      /**
       * ページ推移先もtagsページだった場合はunmountしない
       */
      if (e.detail.new.split("/")[1] !== "tags") {
        reactRoot.unmount();
        document.removeEventListener(
          "pixiv-tag-filter-pageChange",
          pageChangeLisnter
        );
      }
    };
    document.addEventListener("pixiv-tag-filter-pageChange", pageChangeLisnter);
  }
}

export default renderingTagsRoot;
