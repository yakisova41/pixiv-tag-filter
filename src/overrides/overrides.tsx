import { StrictMode } from "react";
import { PageChangeEvent } from "../pageChangeObserver";
import TagsMain from "./components/main";
import { createRoot } from "react-dom/client";

let reactRootElem: null | Element = null;

/**
 * Replace original ilusts.
 */
export async function renderOverride(pathdata: PageChangeEvent) {
  const splitPath = pathdata.new.split("/");

  /**
   * 小説またはtagsページのトップの場合はreactをレンダリングしません
   */
  if (
    !(splitPath[1] === "tags" && splitPath[3] === undefined) &&
    splitPath[3] !== "novels"
  ) {
    const contentContainer = await findContentContainer();

    if (reactRootElem !== null && reactRootElem.isConnected) {
      return;
    }

    reactRootElem = document.createElement("div");
    reactRootElem.id = "pixiv_tag_filter_tags_root";

    contentContainer.before(reactRootElem);

    originalTagsHide();

    const reactRoot = createRoot(reactRootElem);

    reactRoot.render(
      <StrictMode>
        <TagsMain />
      </StrictMode>,
    );

    /**
     * ページ変更時にreactrootをunmount
     * @param e
     */
    const pageChangeLisnter = (e: CustomEvent<PageChangeEvent>) => {
      reactRoot.unmount();
      reactRootElem.remove();
      document.removeEventListener(
        "pixiv-tag-filter-pageChange",
        pageChangeLisnter,
      );
    };
    document.addEventListener("pixiv-tag-filter-pageChange", pageChangeLisnter);
  }
}

/**
 * 要素が見つかるまで探し続けます。
 * @param selector selector
 * @returns
 */
function elementFind(selector: string): {
  promise: Promise<Element>;
  stop: () => void;
} {
  let i: number;
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

function findContentContainer(): Promise<HTMLUListElement> {
  return new Promise((resolve) => {
    const selectors = ['div[data-ga4-label="works_content"]'];

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

let overRideStyle: null | Element = null;

/**
 * originalのulを非表示にするcssを挿入
 */
function originalTagsHide() {
  if (overRideStyle !== null && overRideStyle.isConnected) {
    return;
  }

  overRideStyle = document.createElement("style");
  overRideStyle.innerHTML = `
    div[data-ga4-label="works_content"] {
        display: none !important;
    }
    `;
  document.querySelector("head").appendChild(overRideStyle);
}

export function disableOverride() {
  overRideStyle.remove();
  reactRootElem.remove();
}
