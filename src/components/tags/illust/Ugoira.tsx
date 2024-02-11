import React from "react";
import style from "../tags.css";

export default function Ugoira() {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: 48, height: 48 }}
      className={style.ugoira_svg}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        style={{
          fill: "rgba(0, 0, 0, 0.32)",
        }}
        className={style.ugoira_inner}
      ></circle>
      <path
        d="M9,8.74841664 L9,15.2515834 C9,15.8038681 9.44771525,16.2515834 10,16.2515834
C10.1782928,16.2515834 10.3533435,16.2039156 10.5070201,16.1135176 L16.0347118,12.8619342
C16.510745,12.5819147 16.6696454,11.969013 16.3896259,11.4929799
C16.3034179,11.3464262 16.1812655,11.2242738 16.0347118,11.1380658 L10.5070201,7.88648243
C10.030987,7.60646294 9.41808527,7.76536339 9.13806578,8.24139652
C9.04766776,8.39507316 9,8.57012386 9,8.74841664 Z"
        style={{
          fill: "rgb(245, 245, 245)",
        }}
        className={style.ugoira_inner}
      ></path>
    </svg>
  );
}
