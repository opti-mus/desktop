import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider
} from 'react-router-dom'
import { getAccessToken } from '../helpers/token'
import { privateRoutes, publicRoutes, routes } from './routes'

const NavigateRoute = () => {
    const isAuth = getAccessToken()

    return isAuth ? <Navigate to={routes.desktop} replace /> : <Navigate to={routes.auth.login} replace />
}
const PublicRoute = () => {
    const isAuth = getAccessToken()

    return !isAuth ? <Outlet /> : <Navigate to={routes.desktop} replace />
}

const ProtectedRoute = () => {
    const isAuth = getAccessToken()
    return isAuth ? <Outlet /> : <Navigate to={routes.auth.login} replace />
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ProtectedRoute />}>
                {Object.values(privateRoutes).map(({ Element, path }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))}
            </Route>
            <Route element={<PublicRoute />}>
                {Object.values(publicRoutes).map(({ Element, path }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))}
            </Route>

            <Route path="*" element={<NavigateRoute />} />
        </>
    )
)

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
