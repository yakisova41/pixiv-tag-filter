import addingOptionScreen from "./addingOptionScreen";
import tags from "./pages/tags/tags";
import pageChangeObserver, {
    PageChangeEvent,
} from "./utils/pageChangeObserver";
import compatibleConfig from "./utils/compatibleConfig";

function main(): void {
    compatibleConfig();
    addingOptionScreen();
    pageChangeObserver();

    document.addEventListener(
        "pixiv-tag-filter-pageChange",
        (e: CustomEvent<PageChangeEvent>) => {
            const split = e.detail.split("/");

            switch (split[1]) {
                case "tags":
                    tags(split[2]);
                    break;
                default:
                    break;
            }
        }
    );
}

main();
