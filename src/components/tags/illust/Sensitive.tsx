import React from "react";
import style from "../tags.css";

const Sensitive = ({ value }: { value: false | "R-18" | "R-18G" }) => {
    return (
        <>
            {value !== false && (
                <div className={style.sensitive}>
                    <div className={style.sensitive_inner}>
                        <div className={style.sensitive_content}>{value}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sensitive;
