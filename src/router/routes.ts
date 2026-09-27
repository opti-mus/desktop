import { lazy, type JSX, type LazyExoticComponent } from "react"

const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const SignUpPage = lazy(() => import('../pages/auth/SignUpPage'))
const DesktopPage = lazy(() => import('../App'))

export interface PageMeta {
    title: string
    description: string
}

export interface RouteType {
    Element: LazyExoticComponent<() => JSX.Element>
    path: string
    namespace?: string
    meta?: PageMeta
}

export const routes = {
    desktop: '/desktop',
    auth: {
        forgotPassword: '/forgot-password',
        login: '/login',
        setPassword: '/set-password',
        signUp: '/sign-up',
        signUpEmailVerification: '/sign-up-email-verification'
    },

}

const allRoutes = {
    // Public routes

    login: {
        Element: LoginPage,
        path: routes.auth.login,
        namespace: 'login',
        meta: {
            title: 'Log In | Desktop',
            description: 'Sign in to your Desktop admin dashboard'
        }
    },
    signUp: {
        Element: SignUpPage,
        path: routes.auth.signUp,
        namespace: 'sign-up',
        meta: {
            title: 'Sign Up | Desktop',
            description: 'Create your Desktop account and start building 3D product experiences'
        }
    },
    // Private routes
    desktop: {
        Element: DesktopPage,
        path: routes.desktop,
        namespace: 'Desktop',
        meta: {
            title: 'Log In | Desktop',
            description: 'Sign in to your Desktop admin dashboard'
        }
    },

} as const


export const publicRoutes: Record<string, RouteType> = {
    login: allRoutes.login,
    signUp: allRoutes.signUp
}

export const privateRoutes: Record<string, RouteType> = {
    desktop: allRoutes.desktop
}