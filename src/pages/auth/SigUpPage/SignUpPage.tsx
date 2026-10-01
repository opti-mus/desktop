import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/api/useAuth'
import { routes } from '../../../router/routes'
import { LoginPageButton, LoginPageInput, LoginPageWrapperStyles, LoginWrapper } from '../LoginPage/LoginPage.styles'

const SignUpPage = () => {
    const navigate = useNavigate()
    const { signUpUser } = useAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate } = useMutation({
        mutationFn: signUpUser,
        onSuccess: res => {
            if (res?.token) {
                localStorage.setItem('token', res?.token)
                navigate(routes.desktop)
            }
        }
    })

    const submitHandler = async () => {
        const body = { name, email, password }
        mutate(body)
    }
    return (
        <LoginWrapper>
            <LoginPageWrapperStyles>
                <div>
                    <h5>name</h5>
                    <LoginPageInput type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <h5>Login</h5>
                    <LoginPageInput type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <h5>Password</h5>
                    <LoginPageInput type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <LoginPageButton onClick={submitHandler}>Login</LoginPageButton>
                </div>
            </LoginPageWrapperStyles>
            <Link to={routes.auth.login}>login</Link>
        </LoginWrapper>
    )
}
export default SignUpPage
