import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../router/router";

const AppRouter = () => {
    const isAuth = true
    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(r =>
                    <Route
                        path={r.path}
                        element={r.element}
                        key={r.path}
                    />
                )}
                <Route path={"*"} element={<Navigate to="/posts"/>}/>
            </Routes>
            : <Routes>
                {publicRoutes.map(r =>
                    <Route
                        path={r.path}
                        element={r.element}
                        key={r.path}
                    />
                )}
                <Route path={"*"} element={<Navigate to="/login"/>}/>
            </Routes>
    );
};

export default AppRouter;