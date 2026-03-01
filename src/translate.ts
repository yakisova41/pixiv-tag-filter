const language = {
  '"users" Filter': {
    ja: "usersタグで絞り込み",
    zh: '按"users"标签筛选',
  },

  "Enter the tags name you want to exclude": {
    ja: "絞り込むタグをEnterで追加",
    zh: "输入你想排除的标签名称",
  },
  "There are no Illusts": {
    ja: "作品がありません",
    zh: "没有插图",
  },
  "All illustrations on this page have been filtered": {
    ja: "このページのイラストがすべてフィルタリングされました。",
    zh: "本页所有插图均经过过滤",
  },
  "Please try moving pages or changing your search criteria": {
    ja: "ページの移動か、絞り込み条件の変更をお試しください。",
    zh: "请尝试移动页面或改变您的搜索标准",
  },
  "R-18G Block": {
    ja: "R-18G除外",
    zh: "过滤R-18G",
  },
  "Pixiv tag filter": {
    ja: "Pixiv 自動で除外検索",
    zh: "Pixiv 自动排除搜索",
  },
  "Please open the settings popup while viewing a Pixiv page.": {
    ja: "Pixivのページを開いた状態で設定ポップアップを開いてください",
    zh: "请在打开Pixiv页面时调出设置弹窗",
  },
};

export const translate = (text: string) => {
  const lang = navigator.language;

  if (language[text] && language[text][lang]) {
    return language[text][lang];
  } else {
    return text;
  }
};
