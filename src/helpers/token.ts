export const getAccessToken = () => {
    return localStorage.getItem('token')
}
export const clearAccessToken = () => {
    return localStorage.removeItem('token')
}