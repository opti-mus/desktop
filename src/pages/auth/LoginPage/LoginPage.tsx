import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/api/useAuth'
import { routes } from '../../../router/routes'
import { LoginPageButton, LoginPageInput, LoginPageWrapperStyles, LoginWrapper } from './LoginPage.styles'

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
        <LoginWrapper>
            <LoginPageWrapperStyles>
                <div>
                    <h5>Login</h5>
                    <LoginPageInput type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <h5>Password</h5>
                    <LoginPageInput type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <LoginPageButton type="submit" onClick={submitHandler}>
                        Login
                    </LoginPageButton>
                </div>
            </LoginPageWrapperStyles>
            <Link to={routes.auth.signUp}>sign up</Link>
        </LoginWrapper>
    )
}
export default LoginPage
