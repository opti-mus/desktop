import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../router/routes'
import { BASE_API } from '../../utils/constants'

const SignUpPage = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async () => {
        const body = { name, email, password }
        try {
            const res = await fetch(`${BASE_API}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await res.json()

            if (data?.token) {
                localStorage.setItem('token', data?.token)
                navigate(routes.desktop)
            }
        } catch (error) {
            console.log('@errr', error)
        }
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
