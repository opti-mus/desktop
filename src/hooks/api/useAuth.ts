import axios from "axios"
import { BASE_API } from "../../utils/constants"


export const useAuth = () => {
    const signUpUser = async (data) => {
        try {
            const response = await axios.post(`${BASE_API}/auth/register`, data)
            return response.data
        } catch (error) {
            console.error(error);

        }
    }
    const loginUser = async (data) => {
        try {
            const response = await axios.post(`${BASE_API}/auth/login`, data)
            return response.data
        } catch (error) {
            console.error(error);

        }
    }


    return { signUpUser, loginUser }
}