import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useConfig, useSetConfig } from "../ConfigCtx";
import { translate } from "../../src/translate";

export default function TagsList() {
  const [tags, setTags] = useState<string[]>([]);
  const config = useConfig();
  const set = useSetConfig();

  useEffect(() => {
    setTags(config.blocklist);
  }, [config]);

  const deleteFunction = (deleteTag: string) => {
    setTags(tags.filter((tag) => tag !== deleteTag));

    set(
      "blocklist",
      config.blocklist.filter((tag) => tag !== deleteTag),
    );
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;

      if (!tags.includes(value) && value !== "") {
        setTags([...tags, value]);

        set("blocklist", [...config.blocklist, value]);
      }

      e.currentTarget.value = "";

      document.dispatchEvent(new CustomEvent("pixiv-tag-filter-config-update"));
    }
  };

  return (
    <div className="tags-list-container">
      <div className="tags-list">
        {tags.map((tag) => (
          <ListItem tagName={tag} deleteFunction={deleteFunction} />
        ))}
      </div>

      <input
        className="tag-input"
        id="tag-input"
        type="text"
        placeholder={translate("Enter the tags name you want to exclude")}
        onKeyDown={handleSubmit}
      />
    </div>
  );
}
