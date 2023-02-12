import language from "../language.json";

/**
 * language.json内に```navigator.language```とmatchする訳文があれば訳文を返します。
 * ない場合は原文を返します。
 * @param text 原文
 * @returns 訳文
 */
export const translate = (text: string) => {
    const lang = navigator.language;

    if (language[text] && language[text][lang]) {
        return language[text][lang];
    } else {
        return text;
    }
};
