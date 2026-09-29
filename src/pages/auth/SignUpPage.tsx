import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/api/useAuth'
import { routes } from '../../router/routes'

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
        <section>
            <div>
                <h5>name</h5>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <h5>Login</h5>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={submitHandler}>Login</button>
            </div>
        </section>
    )
}
export default SignUpPage
