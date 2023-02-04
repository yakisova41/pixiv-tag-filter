import ReactDOM from "react-dom/client";
import React from "react";
import Tags from "../../components/tags/Tags";

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
        const div6pattern = elementFind(
            "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)"
        );
        div6pattern.promise.then((elem: HTMLUListElement) => {
            div5pattern.stop();
            resolve(elem);
        });

        const div5pattern = elementFind(
            "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(5) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)"
        );

        div5pattern.promise.then((elem: HTMLUListElement) => {
            div6pattern.stop();
            resolve(elem);
        });
    });
}

/**
 * tagsページのreactrootを作成します。
 */
async function renderingTagsRoot() {
    const illustsElement = await findIllustElement();

    const reactRootElem = document.createElement("div");
    reactRootElem.id = "pixiv_tag_filter_tags_root";

    illustsElement.before(reactRootElem);

    illustsElement.remove();

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
    const pageChangeLisnter = (e: CustomEvent<string>) => {
        /**
         * ページ推移先もtagsページだった場合はunmountしない
         */
        if (e.detail.split("/")[1] !== "tags") {
            reactRoot.unmount();
        }

        document.removeEventListener(
            "pixiv-tag-filter-pageChange",
            pageChangeLisnter
        );
    };
    document.addEventListener("pixiv-tag-filter-pageChange", pageChangeLisnter);
}

export default renderingTagsRoot;
