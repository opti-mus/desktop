import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/api/useAuth'
import { useConfig } from '../../hooks/api/useConfig'
import { routes } from '../../router/routes'

const LoginPage = () => {
    const navigate = useNavigate()
    const { loginUser } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: data => {
            if (data?.token) {
                localStorage.setItem('token', data?.token)
                navigate(routes.desktop)
            }
        }
    })

    const submitHandler = async () => {
        const body = { email, password }

        mutate(body)
    }
    return (
        <section>
            <div>
                <h5>Login</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <button type="submit" onClick={submitHandler}>
                    Login
                </button>
            </div>
        </section>
    )
}
export default LoginPage
