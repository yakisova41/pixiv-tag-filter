import React, { useEffect, useState } from "react";
import style from "./optionScreen.css";
import { set, get } from "../../utils/configOperator";
import { translate } from "../../utils/translate";

const BlockTags = () => {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const config = get();
        setTags(config.blocklist);
    }, []);

    const handleDelete = (deleteTag: string) => {
        setTags(tags.filter((tag) => tag !== deleteTag));

        const config = get();
        set(
            "blocklist",
            config.blocklist.filter((tag) => tag !== deleteTag)
        );

        document.dispatchEvent(
            new CustomEvent("pixiv-tag-filter-config-update")
        );
    };

    const Tag = ({ text }: { text: string }) => {
        return (
            <div className={style.block_tag}>
                <button
                    className={style.block_tag_delete}
                    onClick={() => {
                        handleDelete(text);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                    >
                        <path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z" />
                    </svg>
                </button>

                {text}
            </div>
        );
    };
    let key = 0;

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const value = e.currentTarget.value;

            if (!tags.includes(value) && value !== "") {
                setTags([...tags, value]);

                const config = get();
                set("blocklist", [...config.blocklist, value]);
            }

            e.currentTarget.value = "";

            document.dispatchEvent(
                new CustomEvent("pixiv-tag-filter-config-update")
            );
        }
    };

    return (
        <>
            <div className={style.blocktags_base}>
                {tags.map((tag) => {
                    key++;
                    return <Tag text={tag} key={key} />;
                })}
            </div>
            <input
                className={style.blocktags_input}
                type="text"
                placeholder={translate(
                    "Enter the tags name you want to exclude"
                )}
                onKeyDown={handleSubmit}
            />
        </>
    );
};

export default BlockTags;
