import tagsAppendIllust from "./tagsAppendIllust";
import styles from "../styles/tagsBoxstyle.css";
import { search, illust, getBookmarkId, getCsrf } from "../pixivTools";

/**
 * searchで得たデータをソートし指定タグを除外します
 * @param searchKeyword 検索ワード
 * @returns 指定タグを除外したデータ
 */
const sortingData = async (searchKeyword: string) => {
  /**
   * queryを取得
   */
  let query = {};
  location.search
    .split("?")[1]
    ?.split("&")
    .map((search) => {
      const splited = search.split("=");
      query[splited[0]] = splited[1];
    });

  const pageNumber = query.hasOwnProperty("p") ? query["p"] : 1;
  const mode = query.hasOwnProperty("mode") ? query["mode"] : "all";
  const order = query.hasOwnProperty("order") ? query["order"] : "date_d";

  /**
   * users検索
   */
  let users = "";

  const usersonlymode = localStorage.getItem("pixiv-filter-usersonly");
  if (usersonlymode !== null && usersonlymode !== "0") {
    users = "%20" + usersonlymode + "users";
  }

  /**
   * AI除外
   */
  let aiblock = false;
  if (localStorage.getItem("pixiv-filter-excludeAImode") === "1") {
    aiblock = true;
  }

  let blocklist = [];
  const blocklistString = localStorage.getItem("pixiv-filter-blocklist");
  if (blocklistString !== null) {
    blocklist = blocklistString.split(",");
  }

  let sortcount = 0;

  const searchResponse = await search(
    searchKeyword + users,
    pageNumber,
    mode,
    order
  );

  const illusts = searchResponse["body"]["illustManga"]["data"];
  const result = [];
  const length = illusts.length;

  illusts.forEach((illustdata: illust) => {
    let push = true;

    //blocklist内のタグがillustdataのタグ達に含まれる場合
    illustdata.tags?.forEach((tag) => {
      if (blocklist.includes(tag)) {
        push = false;
        sortcount++;
      }
    });

    //aiType 2=AI 1=NotAI
    if (illustdata.aiType === 2 && aiblock) {
      push = false;
      sortcount++;
    }

    if (push) {
      result.push(illustdata);
    }
  });

  console.log(`${sortcount}/${length} sorted!`);

  return result;
};

/**
 * sortingDataの結果をdomに落とし込みます。
 * @param searchKeyword 検索ワード
 */
export const sort = async (searchKeyword: string) => {
  const sortdata = await sortingData(searchKeyword);

  /**
   * domchange時に2つめのul要素があったら、それをremove()
   */
  document.addEventListener("pixiv-domChange", () => {
    const illustsUlElem = document.querySelector(
      "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(2)"
    );

    if (illustsUlElem !== null) {
      illustsUlElem.remove();
    }
  });

  /**
   * div:nth-child(6)内のul要素を取得、nullならdiv:nth-child(5)内を取得
   */
  let illustsUlElem = document.querySelector(
    "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(6) > div > section:nth-child(3) > div:nth-child(2) > ul:nth-child(1)"
  );

  if (illustsUlElem === null) {
    illustsUlElem = document.querySelector(
      "#root > div.charcoal-token > div > div:nth-child(2) > div > div:nth-child(5) > div > section:nth-child(2) > div:nth-child(2) > ul:nth-child(1)"
    );
  }

  /**
   * ul要素が存在した場合にそのulを削除後、新しいulelementを作成
   * そのul要素内にlielementをappend
   */
  if (illustsUlElem !== null) {
    const newUl = document.createElement("ul");
    newUl.className = illustsUlElem.className;
    illustsUlElem.parentElement.insertBefore(
      newUl,
      illustsUlElem.parentElement.firstChild
    );
    illustsUlElem.remove();

    sortdata.forEach((data: illust) => {
      if (data.title !== undefined) {
        //lielementをappend
        const illustElem = tagsAppendIllust({
          parent: newUl,
          src: data.url,
          title: data.title,
          href: `https://www.pixiv.net/artworks/${data.id}`,
          createricon: data.profileImageUrl,
          creatername: data.userName,
          createrpage: `https://www.pixiv.net/users/${data.userId}`,
          r18: data.tags[0] === "R-18",
          r18g: data.tags[0] === "R-18G",
          pageCount: data.pageCount,
        });

        /**
         * ブックマークボタンを追加
         */
        const bookmarkbtn = illustElem.querySelector("#bookmarkBtn");
        const svg = bookmarkbtn.querySelector("#bookmarkSvg");

        if (data.bookmarkData !== null) {
          svg.classList.add(styles.bookmarked);
        }

        bookmarkbtn.addEventListener("click", async () => {
          const csrftoken = await getCsrf();

          if (svg.classList.contains(styles.bookmarked)) {
            /**
             * ブックマーク解除時
             */
            const id = await getBookmarkId(data.id);

            fetch("https://www.pixiv.net/ajax/illusts/bookmarks/delete", {
              method: "POST",
              body: `bookmark_id=${id}`,
              headers: {
                accept: "application/json",

                "Content-Type":
                  "application/x-www-form-urlencoded; charset=utf-8",
                "x-csrf-token": csrftoken,
              },
            }).then(() => {
              svg.classList.remove(styles.bookmarked);
            });
          } else {
            /**
             * ブックマーク登録時
             */
            fetch("https://www.pixiv.net/ajax/illusts/bookmarks/add", {
              method: "POST",
              body: JSON.stringify({
                comment: "",
                illust_id: data.id,
                restrict: 0,
                tags: [],
              }),
              headers: {
                accept: "application/json",
                "content-type": "application/json; charset=utf-8",
                "x-csrf-token": csrftoken,
              },
            }).then(() => {
              svg.classList.add(styles.bookmarked);
            });
          }
        });
      }
    });
  }
};
