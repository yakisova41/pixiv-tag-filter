import { translate } from "../../src/translate";
import { useConfig, useSetConfig } from "../ConfigCtx";
import { SettingToggle } from "./SettingToggle";
import SettingUsers from "./SettingUsers";

export default function Settings() {
  const { r18gBlock } = useConfig();
  const set = useSetConfig();

  return (
    <div className="settings-container">
      <ul className="settings">
        <SettingToggle
          name={translate("R-18G Block")}
          defaultValue={r18gBlock}
          onToggle={(v) => {
            set("r18gBlock", v);
          }}
        />
        <SettingUsers />
      </ul>
    </div>
  );
}
