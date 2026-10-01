import axios from "axios"
import { BASE_API } from "../../utils/constants"

export type UserAuth = {
    name: string
    email: string
    password: string

}
export type LoginUserAuth = Omit<UserAuth, 'name'>

export const useAuth = () => {
    const signUpUser = async (data: UserAuth) => {
        try {
            const response = await axios.post(`${BASE_API}/auth/register`, data)
            return response.data
        } catch (error) {
            console.error(error);

        }
    }
    const loginUser = async (data: LoginUserAuth) => {
        try {
            const response = await axios.post(`${BASE_API}/auth/login`, data)
            return response.data
        } catch (error) {
            console.error(error);

        }
    }


    return { signUpUser, loginUser }
}