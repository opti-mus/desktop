import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider
} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { privateRoutes, publicRoutes, routes } from './routes'

const NavigateRoute = () => {
    const isAuth = useAuth()

    return isAuth ? <Outlet /> : <Navigate to={routes.auth.login} replace />
}
const PublicRoute = () => {
    const isAuth = useAuth()

    return !isAuth ? <Outlet /> : <Navigate to={routes.desktop} replace />
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<NavigateRoute />}>
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
