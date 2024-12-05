import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Custom CSS
import "./assets/index.css";

// Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    //<StrictMode>
    <App />
    //</StrictMode>
);
