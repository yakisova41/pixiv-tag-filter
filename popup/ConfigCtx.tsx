import {
  GetConfigResponse,
  TagFilterConfig,
  Users,
} from "../src/configOperator";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

async function get(): Promise<TagFilterConfig> {
  const message: GetConfigMessage = { type: "get-config" };

  if (typeof chrome === "undefined" || typeof chrome.tabs === "undefined") {
    // Userjs
    window.parent.postMessage(message, "*");
    return new Promise((resolve) => {
      window.addEventListener("message", (e) => {
        const { data } = e;

        if (data.type === "get-config-response") {
          const res = data as GetConfigResponse;

          resolve(res.data.config);
        }
      });
    });
  } else {
    // Chrome
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab) {
      console.error("Could not found any active tab.");
      return;
    }

    await chrome.tabs.sendMessage(tab.id, message);

    return new Promise((resolve) => {
      const listener = (message, sender, sendResponse) => {
        if (message.type === "get-config-response") {
          const data = message as GetConfigResponse;
          resolve(data.data.config);
        }
      };
      chrome.runtime.onMessage.addListener(listener);
    });
  }
}

async function set(
  key: keyof TagFilterConfig,
  value: boolean | string[] | Users,
) {
  const message: SetConfigMessage = {
    type: "set-config",
    content: {
      key,
      value,
    },
  };

  if (typeof chrome === "undefined" || typeof chrome.tabs === "undefined") {
    // Userjs
    window.parent.postMessage(message, "*");
  } else {
    // Chrome

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab) {
      console.error("Could not found any active tab.");
      return;
    }

    await chrome.tabs.sendMessage(tab.id, message);
    chrome.runtime.sendMessage(message);
  }
}

export interface GetConfigMessage {
  type: "get-config";
}

export interface SetConfigMessage {
  type: "set-config";
  content: {
    key: keyof TagFilterConfig;
    value: boolean | string[] | Users;
  };
}

type ConfigContext = {
  state: [
    TagFilterConfig,
    React.Dispatch<React.SetStateAction<TagFilterConfig>>,
  ];
};

const ctx = createContext<ConfigContext | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [confState, setConf] = useState<null | TagFilterConfig>(null);

  useEffect(() => {
    get().then((conf) => {
      setConf(conf);
    });
  }, []);

  return (
    <ctx.Provider value={{ state: [confState, setConf] }}>
      <>{confState !== null && children}</>
    </ctx.Provider>
  );
}

export function useConfig() {
  if (ctx === null) {
    throw new Error("Please use it in provider");
  }

  return useContext(ctx).state[0];
}

export function useSyncConfig() {
  if (ctx === null) {
    throw new Error("Please use it in provider");
  }

  const [confState, setConf] = useContext(ctx).state;
  return async () => {
    const conf = await get();
    setConf(conf);
    return confState;
  };
}

export function useSetConfig() {
  if (ctx === null) {
    throw new Error("Please use it in provider");
  }

  const [confState, setConf] = useContext(ctx).state;
  const sync = useSyncConfig();

  return async (
    key: keyof TagFilterConfig,
    value: boolean | string[] | Users,
  ) => {
    await set(key, value);
    await sync();
  };
}
