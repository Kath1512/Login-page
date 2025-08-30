import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import '../assets/form.css'
import axios from "axios";
import userContext from "../UserContext";

function Login() {
    
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(userContext);
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

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
                alert(data.message);
            }
            else{
                setCurrentUser(data);
                alert(data.message);
                navigate("/");
            }
        }
        catch(err){
            console.error(err);
        }
    }

    return(
        <div className="form-container">
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
    )
}

export default Login