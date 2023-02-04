import React, { createContext, FC } from "react";

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

export type Router = {
    push: (path: string) => void;
};

export type LinkProps = JSX.IntrinsicElements["a"] & {
    className?: string;
};

export const RouterContext = createContext<Router | null>(null);

export const Link: FC<LinkProps> = (props) => {
    const clickHandler = (
        e: React.MouseEvent<HTMLAnchorElement>,
        router: Router
    ) => {
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
