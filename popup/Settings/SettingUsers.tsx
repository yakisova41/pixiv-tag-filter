import { Users } from "../../src/configOperator";
import { translate } from "../../src/translate";
import { useConfig, useSetConfig } from "../ConfigCtx";

export default function SettingUsers() {
  const set = useSetConfig();
  const { users } = useConfig();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value: string | false = e.currentTarget.value;

    if (value === "0") {
      value = false;
      set("users", value);
    } else if (isUsersTypeGuard(value)) {
      set("users", value);
    }
  };

  return (
    <li className="setting-item">
      <span>{translate('"users" Filter')}</span>
      <select
        className={"setting-select"}
        onChange={handleChange}
        defaultValue={!users ? "0" : users}
      >
        <option value="0">OFF</option>
        <option value="00">100~users</option>
        <option value="000">1000~users</option>
        <option value="0000">10000~users</option>
        <option value="50">50users</option>
        <option value="100">100users</option>
        <option value="300">300users</option>
        <option value="500">500users</option>
        <option value="1000">1000users</option>
        <option value="5000">5000users</option>
        <option value="10000">10000users</option>
        <option value="20000">20000users</option>
        <option value="30000">30000users</option>
        <option value="40000">40000users</option>
        <option value="50000">50000users</option>
      </select>
    </li>
  );
}

function isUsersTypeGuard(value: any): value is Users {
  switch (value) {
    case "00":
    case "000":
    case "0000":
    case "50":
    case "100":
    case "300":
    case "500":
    case "1000":
    case "5000":
    case "10000":
    case "20000":
    case "30000":
    case "40000":
    case "50000":
      return true;

    default:
      return false;
  }
}
