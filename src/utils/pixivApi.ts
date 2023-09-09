/**
 * pixivで検索をします
 * @param word 検索ワード
 * @param pageNumber ページ数
 * @returns 検索結果
 */
export const search = (
  word: string,
  pageNumber: number,
  mode: "all" | "r18",
  order: "date" | "date_d" = "date_d",
  type: "artworks" | "manga" | "illustrations" = "artworks"
): Promise<pixivResponse> => {
  return new Promise((resolve) => {
    fetch(
      `https://www.pixiv.net/ajax/search/${type}/${word}?word=${word}&order=${order}&mode=${mode}&p=${String(
        pageNumber
      )}&s_mode=s_tag&type=all&lang=ja`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        resolve(JSON.parse(data));
      });
  });
};

/**
 * csrftokenを取得します
 * @returns csrftoken
 */
export const getCsrf = (): Promise<string> => {
  return new Promise((resolve) => {
    fetch(
      "https://www.pixiv.net/bookmark_add.php?type=illust&illust_id=95087894"
    )
      .then((res) => res.text())
      .then((text) => {
        resolve(text.match(/token = "([a-zA-Z0-9]{32})"/)[1]);
      });
  });
};

/**
 * 自分のuseridを取得します
 * @returns 自分のuserid
 */
export const getMyUserId = (): string => {
  const cookie = document.cookie;
  let cookies = {};
  cookie.split(";").forEach((val) => {
    const split = val.split("=");
    cookies[split[0].slice(1)] = split
      .map((val, index) => {
        if (index !== 0) {
          return val;
        }
      })
      .join("");
  });

  const id = cookies["__utmv"].split("user_id")[1].split("^")[0].slice(0, -1);
  return id;
};

/**
 * ブックマーク一覧を100づつ取得します
 * @param offset offset 0 ~
 * @returns ブックマーク一覧
 */
export const getBookmark = (offset: number): Promise<pixivResponse> => {
  return new Promise((resolve) => {
    const myuserid = getMyUserId();

    fetch(
      `https://www.pixiv.net/ajax/user/${myuserid}/illusts/bookmarks?tag=%E6%9C%AA%E5%88%86%E9%A1%9E&offset=${String(
        offset
      )}&limit=100&rest=show&lang=ja`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        resolve(JSON.parse(data));
      });
  });
};

/**
 * イラストのidからブックマークidを取得します
 * @param illustId イラストid
 * @returns ブックマークid
 */
export const getBookmarkId = async (illustId: string) => {
  let i = 0;
  let id = "";
  let loop = true;

  while (loop) {
    const bookmark = await getBookmark(100 * i);

    bookmark.body.works.forEach((illust: illust) => {
      if (illust.id === illustId) {
        id = illust.bookmarkData.id;
        loop = false;
      }
    });

    if (i === 100) {
      loop = false;
    }
    i++;
  }

  return id;
};

/**
 * ブックマークを追加
 * @param illust_id イラストid
 * @param csrfToken csrftoken
 */
export const bookmark_add = async (illust_id: string, csrfToken: string) => {
  await fetch("https://www.pixiv.net/ajax/illusts/bookmarks/add", {
    method: "POST",
    body: JSON.stringify({
      comment: "",
      illust_id: illust_id,
      restrict: 0,
      tags: [],
    }),
    headers: {
      accept: "application/json",
      "content-type": "application/json; charset=utf-8",
      "x-csrf-token": csrfToken,
    },
  });
};

/**
 * ブックマークを解除
 * @param illust_id イラストid
 * @param csrfToken csrftoken
 */
export const bookmark_remove = async (illust_id: string, csrfToken: string) => {
  const id = await getBookmarkId(illust_id);

  await fetch("https://www.pixiv.net/ajax/illusts/bookmarks/delete", {
    method: "POST",
    body: `bookmark_id=${id}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "x-csrf-token": csrfToken,
    },
  });
};

export interface illust {
  aiType: number;
  alt: string;
  bookmarkData: null | {
    id: string;
    private: boolean;
  };
  createDate: string;
  description: string;
  height: number;
  id: string;
  illustType: number;
  isBookmarkable: boolean;
  isMasked: boolean;
  isUnlisted: boolean;
  pageCount: number;
  profileImageUrl: string;
  restrict: number;
  sl: number;
  tags: string[];
  title: string | undefined;
  titleCaptionTranslation: {
    workTitle: null | string;
    workCaption: null | string;
  };
  updateDate: string;
  url: string;
  userId: string;
  userName: string;
  width: number;
  xRestrict: number;
}

export interface pixivResponse {
  error: boolean;
  body: {
    illustManga?: {
      data: illust[];
      total: number;
      bookmarkRanges: { min: null | number; max: null | number }[];
    };
    manga?: {
      data: illust[];
      total: number;
      bookmarkRanges: { min: null | number; max: null | number }[];
    };
    illust?: {
      data: illust[];
      total: number;
      bookmarkRanges: { min: null | number; max: null | number }[];
    };
    works?: illust[];
    total?: number;
    bookmarkTags?: string[];
    extraData: {
      meta: {
        alternateLanguages: {
          en: string;
          ja: string;
        };
        canonical: string;
        description: string;
        descriptionHeader: string;
        title: string;
      };
    };
    popular: {
      permanent: illust[];
      recent: illust[];
    };
    relatedTags: string[];
    tagTranslation: string[];
    zoneConfig: {
      footer: { url: string };
      header: { url: string };
      infeed: { url: string };
    };
  };
}
