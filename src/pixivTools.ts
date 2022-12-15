import axios from "axios";

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
  order: "date" | "date_d" = "date_d"
): Promise<pixivResponse> => {
  return new Promise((resolve) => {
    axios
      .get(
        `https://www.pixiv.net/ajax/search/artworks/${word}?word=${word}&order=${order}&mode=${mode}&p=${String(
          pageNumber
        )}&s_mode=s_tag&type=all&lang=ja`
      )
      .then((res) => res.data)
      .then((data) => {
        resolve(data);
      });
  });
};

/**
 * csrftokenを取得します
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
 * @returns
 */
export const getBookmark = (offset: number): Promise<pixivResponse> => {
  return new Promise((resolve) => {
    const myuserid = getMyUserId();

    axios
      .get(
        `https://www.pixiv.net/ajax/user/${myuserid}/illusts/bookmarks?tag=%E6%9C%AA%E5%88%86%E9%A1%9E&offset=${String(
          offset
        )}&limit=100&rest=show&lang=ja`
      )
      .then((res) => {
        resolve(res.data);
      });
  });
};

/**
 * イラストのidからブックマークidを取得します
 * @param illustId イラストid
 * @returns
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
