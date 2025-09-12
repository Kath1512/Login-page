import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import '../assets/form.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const toastOptions = {
        position: "bottom-right",
        autoclose: 8000,
        draggable: true,
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('current-chat-user'));
        if(data?.username){
           navigate("/"); 
        }
    }, []);

    function handleInput(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const API_URL = "http://localhost:5000/api/auth/login";
        try{
            const res = await axios.post(API_URL, {...values});
            const data = res.data;
            if(data.status === false){
                toast.error(data.message, toastOptions);
            }
            else{
                localStorage.setItem('current-chat-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <>
            <div className="auth-form-container">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input 
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleInput}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                    />
                    <button type="Submit">
                        Sign in
                    </button>
                    <p>Dont have an account? <Link to="/register">Register here</Link></p>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login