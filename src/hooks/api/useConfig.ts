import axios from "axios";
import { clearAccessToken, getAccessToken } from "../../helpers/token";
import { BASE_API } from "../../utils/constants";


const createApiInstance = (withAuth: boolean = false) => {
    const apiInstance = axios.create({
        baseURL: BASE_API,
    })

    if (withAuth) {
        apiInstance.interceptors.request.use(config => {
            const accessToken = getAccessToken()

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        })
        apiInstance.interceptors.response.use(
            (config) => config,
            async error => {
                const originRequest = error.config

                if (
                    originRequest &&
                    error.response &&
                    error.response.status === 401
                ) {

                    clearAccessToken() // w8ing 4 backend refresh token DONE
                    window.location.reload()
                }

            }
        )
    }

    return apiInstance
}
const client = createApiInstance(true)

export const useConfig = () => {

    const createConfig = async (data) => {
        try {
            const response = await client.post(`/config/create`, data)
            return response.data
        } catch (error) {
            console.error(error);

        }
    }
    const updateConfig = async (data) => {
        try {
            const response = await client.put(`/config/update`, data)
            return response.data
        } catch (error) {
            console.error(error);

        }
    }
    const getConfig = async (id: string) => {
        try {
            const response = await client.get(`/config/${id}`)
            return response.data
        } catch (error) {
            throw new Error

        }
    }

    return { createConfig, updateConfig, getConfig }
}