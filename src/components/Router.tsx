import React, { createContext, FC } from "react";

/**
 * 元サイトのreact-routerのpropsを返します
 * @returns react-routerのprops
 */
export const useRouter = (): Router => {
    const elem = document.querySelector("#root");
    let router;

    Object.keys(elem).forEach((k) => {
        if (k.match("__reactContainer")) {
            const routerElem =
                elem[k].child.child.child.child.child.child.child.child.child
                    .child.child.child.child.child.child;
            router = routerElem.pendingProps.value;
        }
    });

    return router;
};

export const RouterContext = createContext<Router | null>(null);

export const Link: FC<LinkProps> = (props) => {
    const clickHandler = (
        e: React.MouseEvent<HTMLAnchorElement>,
        router: Router
    ) => {
        props.onClick && props.onClick(e);

        router.push(props.href);
        window.scroll({
            top: 0,
        });
        e.preventDefault();
    };

    return (
        <RouterContext.Consumer>
            {(router) => (
                <a
                    {...props}
                    onClick={(e) => {
                        clickHandler(e, router);
                    }}
                >
                    {props.children}
                </a>
            )}
        </RouterContext.Consumer>
    );
};

export type Router = {
    push: (path: string) => void;
};

export type LinkProps = JSX.IntrinsicElements["a"] & {
    className?: string;
};
