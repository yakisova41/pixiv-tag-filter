import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "./Router";
import { illust } from "../../pixiv/pixivApi";
import NotFound from "./NotFound";
import IllustElements from "./IllustElements";

export default function App() {
  const [illusts, setIllusts] = useState<illust[] | null>(null);
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    document.addEventListener("pixiv-tag-filter-fetch", (e: CustomEvent) => {
      setShow(false);
      setIllusts(e.detail);
    });

    setShow(true);

    document.dispatchEvent(new CustomEvent("pixiv-tag-filter-render-success"));
  });

  useEffect(() => {}, []);
  return (
    <>
      {illusts !== null && (
        <>
          {illusts.length === 0 ? (
            <NotFound />
          ) : (
            show && <IllustElements illusts={illusts} />
          )}
        </>
      )}
    </>
  );
}
