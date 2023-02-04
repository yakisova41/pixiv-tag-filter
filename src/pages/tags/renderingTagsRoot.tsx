import ReactDOM from "react-dom/client";
import React from "react";
import Tags from "../../components/tags/Tags";

function elementFind(selector: string): Promise<Element> {
    return new Promise((resolve, reject) => {
        const i = setInterval(() => {
            const elem = document.querySelector(selector);

            if (elem !== null) {
                clearInterval(i);
                resolve(elem);
            }
        });
    });
}

async function renderingTagsRoot() {
    const illustsElement = await elementFind(
        "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)"
    );

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

    const pageChangeLisnter = () => {
        reactRoot.unmount();
        document.removeEventListener(
            "pixiv-tag-filter-pageChange",
            pageChangeLisnter
        );
    };
    document.addEventListener("pixiv-tag-filter-pageChange", pageChangeLisnter);
}

export default renderingTagsRoot;
