import { ToggleSlider } from "react-toggle-slider";

export function SettingToggle({
  defaultValue,
  onToggle,
  name,
}: {
  name: string;
  defaultValue: boolean;
  onToggle: (active: boolean) => void;
}) {
  return (
    <li className="setting-item setting-toggle">
      <span>{name}</span>
      <ToggleSlider
        barBackgroundColorActive={"#0096fa"}
        barWidth={36}
        barHeight={18}
        handleSize={12}
        draggable={false}
        active={defaultValue}
        onToggle={onToggle}
      />
    </li>
  );
}
