import { getCache, setCache } from "./cache";
import { get } from "./configOperator";
import { PixivFilter } from "./filter/PixivFilter";
import tagFilter from "./filter/tagFilter";
import ugoiraFilter from "./filter/ugoiraFilter";
import undefinedFilter from "./filter/undefinedFilter";
import { disableOverride, renderOverride } from "./overrides/overrides";
import { PageChangeEvent, SearchChangeEvent } from "./pageChangeObserver";
import { getSearchQuery } from "./pixiv/getSearchQuery";
import { illust, search, SMode, Type } from "./pixiv/pixivApi";

let overrideRendered = false;

export default function handleSearchPage(pathdata: PageChangeEvent) {
  const split = pathdata.new.split("/");

  let searchKeyword: string | null = split[2];
  if (typeof split[2] === "undefined") {
    searchKeyword = null;
  }

  let category = null;
  if (typeof split[3] !== "undefined") {
    category = split[3];
  }

  // Request api and filtering response.
  const sendSearchAndFilter = async () => {
    const { block, users } = get();

    // Tag filter disabled
    if (!block) {
      return;
    }

    // Define filter
    const filter = new PixivFilter();
    filter.addFilter(tagFilter);
    filter.addFilter(undefinedFilter);
    filter.addFilter(ugoiraFilter);

    const { pageNumber, mode, order, type, q, s_mode } = getSearchQuery();

    // 1. keyword: searchKeywordがnullの場合はqにフォールバック。
    // 最終的に両方nullであれば、search関数でパラメータから除外される。
    const keyword = searchKeyword !== null ? searchKeyword : q;

    // 2. smode: nullの場合はデフォルト値。それ以外はマッピングによる正規化。
    let smode = s_mode === null ? "s_tag_full" : s_mode;
    const sModeMap: Record<string, SMode> = {
      tag: "s_tag",
      tc: "s_tc",
      tag_tc: "s_tag_tc",
    };
    smode = sModeMap[smode as SMode] ?? smode;

    // 3. _type: APIへ渡すタイプの決定。
    // search関数でパラメータを除外させるための「意図的なnull」を厳密に扱う。
    let _type: Type = type;

    if (category === "manga" || category === "novels") {
      _type = category;
    }
    if (
      category === "illustrations" &&
      _type !== "ugoira" &&
      _type !== "illust"
    ) {
      _type = "illust_and_ugoira";
    }
    if (_type === "illust_ugoira") {
      _type = "illust_and_ugoira";
    }
    if (_type === "artwork" && category === null) {
      // categoryが未指定(null)のartworkは、APIリクエストからtypeを除外するためnullをセット
      _type = null;
    }

    const usersText = users === false ? "" : users + "users";

    if (users !== false) {
      // Users絞り込みはタグ完全一致では使用できない（00usersのキーワードを含めた検索ができない）ため
      if (smode === "s_tag_full") {
        smode = "s_tag";
      }
    }

    // 4. APIリクエスト（nullが含まれるプロパティは内部で除外される）
    const response = await search({
      keyword: keyword + " " + usersText,

      type: _type,
      ai_type: "0",
      s_mode: smode,
      mode,
      order,
      pageNumber,
    });

    // 5. データの抽出（冗長なswitchの排除）
    let data: illust[];
    if (
      category === "manga" ||
      (category !== "artworks" && _type === "manga")
    ) {
      data = response.body.manga.data;
    } else if (category === "artworks" || _type === null) {
      data = response.body.illustManga.data;
    } else {
      data = response.body.illust.data;
    }

    // Filtering
    const sortResult = filter.run(data);
    setCache(sortResult);

    document.dispatchEvent(
      new CustomEvent("pixiv-tag-filter-fetch", {
        detail: sortResult,
      }),
    );
  };

  // When page loaded
  setTimeout(async () => {
    const { block } = get();

    if (block) {
      overrideRendered = true;

      await renderOverride(pathdata);
    }

    const isFromArtworks = pathdata.before.split("/")[1] === "artworks";
    const cache = getCache();

    // 1. キャッシュが存在しない、または artworks からの遷移でない場合は通常レンダリング
    if (!isFromArtworks || !cache) {
      sendSearchAndFilter();
      return;
    }

    const renderPromise = new Promise<void>((resolve) => {
      const renderListener = async () => {
        document.removeEventListener(
          "pixiv-tag-filter-render-success",
          renderListener,
        );

        if (cache.status === "OK") {
          document.dispatchEvent(
            new CustomEvent("pixiv-tag-filter-fetch", { detail: cache.data }),
          );
          setCache(cache.data);
        } else if (cache.status === "TIMEOUT") {
          await sendSearchAndFilter();
        }

        setTimeout(() => {
          window.scroll({ top: cache.scroll });
          resolve();
        }, 1);
      };
      document.addEventListener(
        "pixiv-tag-filter-render-success",
        renderListener,
      );
    });

    // 4. レンダリング完了とスクロール復元を待つ
    await renderPromise;
  });

  // When query updated
  const searchChangeListener = async ({
    detail,
  }: CustomEvent<SearchChangeEvent>) => {
    if (detail.before.path.split("/")[1] !== "artworks") {
      console.log("search change");
      await renderOverride(detail.pageChangeEvent);

      sendSearchAndFilter();
    }
  };

  // When config updated
  const configUpdateListener = async () => {
    console.log("config update");
    const { block } = get();

    if (block && !overrideRendered) {
      // Override has not been rendered yet.
      overrideRendered = true;
      await renderOverride(pathdata);
    }

    if (!block && overrideRendered) {
      disableOverride();
      overrideRendered = false;
    }

    sendSearchAndFilter();
  };

  // When page changed, remove all listeners.
  const cleanupListeners = () => {
    document.removeEventListener(
      "pixiv-tag-filter-searchChange",
      searchChangeListener,
    );
    document.removeEventListener(
      "pixiv-tag-filter-config-update",
      configUpdateListener,
    );
    document.removeEventListener(
      "pixiv-tag-filter-pageChange",
      cleanupListeners,
    );
  };

  // Listen all listener
  document.addEventListener(
    "pixiv-tag-filter-searchChange",
    searchChangeListener,
  );
  document.addEventListener(
    "pixiv-tag-filter-config-update",
    configUpdateListener,
  );
  document.addEventListener("pixiv-tag-filter-pageChange", cleanupListeners);
}
