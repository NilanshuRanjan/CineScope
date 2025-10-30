import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Search from "../pages/Search";
import Details from "../pages/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: ":explore",
                element: <Explore />
            },
            {
                path: ":explore/:type/:id",
                element: <Details />
            },
            {
                path: "search/:id",
                element: <Search/>
            }
        ]
    }
]);

export default router;
