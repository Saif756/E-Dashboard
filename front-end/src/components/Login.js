import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [passsword, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        // navigate('/')
        console.log("ufls", auth, "\n")
        if (auth) {
            navigate('/')
        }
    }, [])

    const handleLogin = async () => {
        // console.warn("email,passsword", email, passsword)
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, passsword }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // console.warn(result)
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/')
        } else {
            alert('Please Enter correct Details')
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type='text' className='inputBox' placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type='password' className='inputBox' placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} value={passsword} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}
export default Login;