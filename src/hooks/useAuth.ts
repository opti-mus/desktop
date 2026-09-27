import { useState } from "react"

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('token'))

    // useEffect(() => {
    //     if (localStorage.getItem('token')) return
    //     // fetch('https://desktop-backend-production-10e3.up.railway.app/api/auth/me').then(async (res) => {
    //     //     const data = await res.json()
    //     //     console.log('@data', data);

    //     // })
    // }, [])

    return localStorage.getItem('token')
}