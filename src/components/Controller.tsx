import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../styles/controller.css";
import packagejson from "../../package.json";
import { translate } from "../translate";
import { Setting } from "./Setting";
import setLocalstorage from "../setLocalstorage";

const Controller = () => {
  const [darkmode, setDarkmode] = useState(true);
  const [blocklist, setBlocklist] = useState([]);

  /**
   * タグリスト
   */
  let tagskey = 0;

  const addTagHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value !== "") {
        const list: string[] = [...blocklist, e.currentTarget.value];
        setLocalstorage("pixiv-filter-blocklist", list.join(","));
        setBlocklist(list);

        e.currentTarget.value = "";
      }
    }
  };

  const tagremove = (key: number) => {
    blocklist.splice(key, 1);
    const list = [...blocklist];
    setLocalstorage("pixiv-filter-blocklist", list.join(","));
    setBlocklist([...blocklist]);
  };

  useEffect(() => {
    const list = localStorage.getItem("pixiv-filter-blocklist");
    if (list !== null && list !== "") {
      const listarray = list.split(",");
      listarray.filter(Boolean);
      setBlocklist(listarray);
    }
  }, []);

  /**
   * sダークモード
   */
  document.addEventListener("pixiv-domChange", () => {
    const body = document.querySelector("body");
    const color = window.getComputedStyle(body, "").color;

    if (color !== "rgb(245, 245, 245)") {
      setDarkmode(false);
    } else {
      setDarkmode(true);
    }
  });

  /**
   * users検索の切り替え
   */
  let usersonlymode = "0";

  if (localStorage.getItem("pixiv-filter-usersonly") !== null) {
    usersonlymode = localStorage.getItem("pixiv-filter-usersonly");
  } else {
    setLocalstorage("pixiv-filter-usersonly", "0");
  }

  const handleChangeUsers = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalstorage("pixiv-filter-usersonly", e.target.value);
  };

  /**
   * AI除外の切り替え
   */
  let excludeAImode = "0";

  if (localStorage.getItem("pixiv-filter-excludeAImode") !== null) {
    excludeAImode = localStorage.getItem("pixiv-filter-excludeAImode");
  } else {
    setLocalstorage("pixiv-filter-excludeAImode", "0");
  }

  const handleChangeExcludeAI = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalstorage("pixiv-filter-excludeAImode", e.target.value);
  };

  return (
    <div
      className={`${styles.controllerContainer} ${
        darkmode ? styles.containerDark : styles.containerLight
      }`}
    >
      <h1 className={styles.toptitle}>Pixiv tag filter</h1>
      <span className={styles.version}>
        version {packagejson.userScript["@version"]}
      </span>

      <ul className={styles.settings}>
        <Setting
          text={translate("Search only works bookmarked ilust by many users")}
        >
          <select onChange={handleChangeUsers} defaultValue={usersonlymode}>
            <option value="0">OFF</option>
            <option value="50">50users</option>
            <option value="100">100users</option>
            <option value="300">300users</option>
            <option value="500">500users</option>
            <option value="1000">1000users</option>
            <option value="5000">5000users</option>
            <option value="10000">10000users</option>
            <option value="20000">20000users</option>
            <option value="30000">30000users</option>
            <option value="00">100~users</option>
          </select>
        </Setting>

        <Setting text={translate("Exclude AI works")}>
          <select onChange={handleChangeExcludeAI} defaultValue={excludeAImode}>
            <option value="0">OFF</option>
            <option value="1">ON</option>
          </select>
        </Setting>
      </ul>

      <div className={styles.blocklistOuter}>
        <h2 className={styles.blocklistTitle}>
          {translate("List of tags to exclude")}
        </h2>

        <ul className={styles.blocklist}>
          {blocklist.map((blocktag) => {
            const key: number = tagskey;
            tagskey++;

            return (
              <li className={styles.blocktag} key={key}>
                #{blocktag}
                <button
                  className={styles.removetag}
                  onClick={() => {
                    tagremove(key);
                  }}
                >
                  {translate("Remove")}
                </button>
              </li>
            );
          })}
        </ul>

        <input
          type="text"
          className={styles.addTagInput}
          onKeyDown={addTagHandler}
          placeholder={translate("Enter the tags name you want to exclude")}
        />
      </div>
    </div>
  );
};

export default Controller;
