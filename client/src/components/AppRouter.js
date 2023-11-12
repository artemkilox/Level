import React from 'react';
import {observer} from "mobx-react-lite";
import {Routes, Route} from "react-router-dom";
import {publicRoutes} from "../routes";

const AppRouter = observer(() => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route
                    key={path}
                    path={path}
                    element={<Component />}
                />
            )}
        </Routes>
    );
});

export default AppRouter;