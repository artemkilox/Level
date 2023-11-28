import {
    MAIN_PAGE_ROUTE,
    APARTMENTS_ROUTE,
    PARKING_ROUTE,
    STORE_ROOMS_ROUTE,
    STORAGE_FACILITIES_ROUTE,
    GALLERY_ROUTE,
} from "./utils/consts";
import MainPage from "./components/MainPage";
import Apartments from "./components/Apartments";
import Parking from "./components/Parking";
import StoreRooms from "./components/StoreRooms";
import StorageFacilities from "./components/StorageFacilities";
import Gallery from "./components/Gallery";

export const publicRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage
    },
    {
        path: APARTMENTS_ROUTE,
        Component: Apartments
    },
    {
        path: PARKING_ROUTE,
        Component: Parking
    },
    {
        path: STORE_ROOMS_ROUTE,
        Component: StoreRooms
    },
    {
        path: STORAGE_FACILITIES_ROUTE,
        Component: StorageFacilities
    },
    {
        path: GALLERY_ROUTE,
        Component: Gallery
    },
]