import "./main.css";
import TagsList from "./TagsList/TagsList";
import { ToggleSlider } from "react-toggle-slider";
import pkg from "../package.json";
import { useConfig, useSetConfig } from "./ConfigCtx";
import Settings from "./Settings/Settings";
import { translate } from "../src/translate";

export default function App() {
  const config = useConfig();
  const setConf = useSetConfig();

  const handleToggle = (active: boolean) => {
    setConf("block", active);
  };

  return (
    <div className="container">
      <div className="top">
        <div className="brand">
          <h1>{translate("Pixiv tag filter")}</h1>
          <span className="version">v {pkg.version}</span>
        </div>

        <ToggleSlider
          barBackgroundColorActive={"#0096fa"}
          barWidth={36}
          barHeight={18}
          handleSize={12}
          draggable={false}
          active={config.block}
          onToggle={handleToggle}
        />
      </div>

      <div className="flex-container">
        <Settings />
        <TagsList />
      </div>
    </div>
  );
}
