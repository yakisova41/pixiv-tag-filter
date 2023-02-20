import React from "react";
import style from "../tags.css";

const PageCount = ({ count }: { count: number }) => {
    return (
        <div className={style.pageCount}>
            <div className={style.pageCountContainer}>
                <span className={style.bookiconOuter}>
                    <span className={style.bookiconInner}>
                        <svg
                            viewBox="0 0 9 10"
                            width={9}
                            height={9}
                            className={style.bookicon}
                        >
                            <path
                                d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10
    C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1
    C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8
    0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z"
                                transform=""
                            ></path>
                        </svg>
                    </span>
                </span>
                <span>{String(count)}</span>
            </div>
        </div>
    );
};

export default PageCount;
