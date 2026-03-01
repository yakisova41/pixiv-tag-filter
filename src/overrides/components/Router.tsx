import React, {
  ComponentProps,
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const RouterContext = createContext<Router | null>(null);

export const useRouter = (): Router => {
  const ctx = useContext(RouterContext);
  if (ctx === null) {
    throw new Error("Use it in provider");
  }

  return ctx;
};

export function RouterProvider({ children }: { children: ReactNode }) {
  const [r, setR] = useState<null | Router>(null);

  useEffect(() => {
    const elem = document.querySelector("next-route-announcer > p");
    Object.keys(elem).forEach((k) => {
      if (k.match("__reactFiber")) {
        const router = elem[k].return.dependencies.firstContext.memoizedValue;

        if (router !== undefined) {
          setR(router);
        }
      }
    });
  }, []);

  return (
    <RouterContext.Provider value={r}>
      {r !== null && children}
    </RouterContext.Provider>
  );
}

export const Link: FC<LinkProps> = (props) => {
  const clickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    router: Router,
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

export type LinkProps = ComponentProps<"a"> & {
  className?: string;
};
