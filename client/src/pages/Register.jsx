import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import '../assets/form.css'
import axios from 'axios'
import userContext from "../UserContext";
function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('current-chat-user'));
        if (data?.username) {
            navigate("/");
        }
    }, []);


    function handleInput(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = values;
        const API_URL = "http://localhost:5000/api/auth/register";
        try {
            const res = await axios.post(API_URL, {
                password: password,
                email: email,
                username: username
            });
            const data = res.data;
            if (data.status === false) {
                alert(data.message);
            }
            else {
                alert(data.message);
                localStorage.setItem('current-chat-user', JSON.stringify(data));
                navigate("/");
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInput}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    onChange={handleInput}
                />
                <button type="submit">
                    Sign Up
                </button>
                <p>Have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    )
}

export default Register