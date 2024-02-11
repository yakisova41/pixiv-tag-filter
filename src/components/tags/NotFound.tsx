import React from "react";
import style from "./tags.css";
import { translate } from "../../utils/translate";

const NotFound = () => {
  return (
    <div className={style.not_found_container}>
      <div className={style.not_found_icon}>
        <svg
          viewBox="0 0 16 16"
          width={72}
          height={72}
          className={style.not_found_icon_svg}
        >
          <path
            d="M8.25739 9.1716C7.46696 9.69512 6.51908 10 5.5 10C2.73858 10 0.5 7.76142 0.5 5C0.5
 2.23858 2.73858 0 5.5 0C8.26142 0 10.5 2.23858 10.5 5C10.5 6.01908 10.1951 6.96696 9.67161
 7.75739L11.7071 9.79288C12.0976 10.1834 12.0976 10.8166 11.7071 11.2071C11.3166 11.5976 10.6834
 11.5976 10.2929 11.2071L8.25739 9.1716ZM8.5 5C8.5 6.65685 7.15685 8 5.5 8C3.84315 8 2.5 6.65685
 2.5 5C2.5 3.34315 3.84315 2 5.5 2C7.15685 2 8.5 3.34315 8.5 5Z"
            transform="translate(2.25 2.25)"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <span className={style.not_found_text}>
        {translate("There are no Illusts")}
      </span>
      <span className={style.not_found_text_mini}>
        {translate("All illustrations on this page have been filtered")}
      </span>
      <span className={style.not_found_text_mini}>
        {translate("Please try moving pages or changing your search criteria")}
      </span>

      <span className={style.not_found_text_mini}>
        {translate("by Pixiv tag filter")}
      </span>
    </div>
  );
};

export default NotFound;
