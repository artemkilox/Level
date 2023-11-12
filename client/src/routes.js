import {
    MAIN_PAGE_ROUTE,
    // STRUCTION_ROUTE,
    // MODULE_ROUTE, ABOUT_ROUTE
} from "./utils/consts";
import MainPage from "./components/MainPage";
// import Struction from "./components/Struction";
// import Module from "./components/Module";
// import About from "./components/About";

export const publicRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    // {
    //     path: STRUCTION_ROUTE + "/:id",
    //     Component: Struction
    // },
    // {
    //     path: MODULE_ROUTE + "/:structId/:id",
    //     Component: Module
    // },
    // {
    //     path: ABOUT_ROUTE,
    //     Component: About
    // },
]