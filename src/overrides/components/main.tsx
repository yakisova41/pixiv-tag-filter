import { useEffect } from "react";
import App from "./App";
import { RouterProvider } from "./Router";
import "./main.css";

export default function TagsMain() {
  useEffect(() => {
    console.log("render tags");
  }, []);

  return (
    <RouterProvider>
      <App />
    </RouterProvider>
  );
}
