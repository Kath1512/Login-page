import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Redirect() { 
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('current-chat-user')){
            navigate('/login');
        }
        else navigate('/');
    }, []);
}