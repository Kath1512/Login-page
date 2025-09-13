import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import '../assets/form.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { registerRoute } from "../utils/APIRoutes";
function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const toastOptions = {
        position: "bottom-right",
        autoclose: 8000,
        draggable: true,
    }

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

    function validateInformation(username, password, confirmPassword, email){
        if(!username) return {message: "Username is missing. Please enter username", ok: false};
        if(!email) return {message: "Email is missing. Please enter email", ok: false};
        if(!password) return {message: "Password is missing. Please enter password", ok: false};
        if(!confirmPassword) return {message: "ConfirmPassword is missing. Please enter confirmPassword", ok: false};
        if(password != confirmPassword){
            return {message: "Passwords do not match. Try again", ok: false};
        }
        if(!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)){
            return {message: "This does not seem like a valid email. Please enter a new email", ok: false};
        }
        return {message: "Register successfully", ok: true};
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword} = values;
        const validationResponse = validateInformation(username, password, confirmPassword, email);
        if(!validationResponse.ok){
            toast.error(validationResponse.message, toastOptions);
            return;
        }
        try {
            const res = await axios.post(registerRoute, {
                password: password,
                email: email,
                username: username
            });
            const data = res.data;
            if (data.status === false) {
                toast.error(data.message, toastOptions);
            }
            else {
                localStorage.setItem('current-chat-user', JSON.stringify(data.user));
                navigate("/set-avt");
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div className="auth-form-container">
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
            <ToastContainer />
        </>
    )
}

export default Register