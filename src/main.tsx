import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure the correct path and default import

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
