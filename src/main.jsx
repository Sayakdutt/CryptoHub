import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home"
import Crypto from "./pages/Crypto";

import Trending from "./pages/Trending";
import Saved from "./pages/Saved";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Crypto />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
