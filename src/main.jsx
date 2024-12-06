import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap CSS
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// Custom CSS
import "./assets/index.css";

// Bootstrap JS
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    //<StrictMode>
    <App />
    //</StrictMode>
);
