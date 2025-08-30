import { useContext, useState, useEffect } from "react";
import userContext from "../UserContext";
import { useNavigate } from "react-router";
import axios from "axios";


function Welcome() {

    const {currentUser, setCurrentUser} = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser === null){
            navigate('/login');
        }
    }, [currentUser])

    console.log(currentUser);

    async function handleLogOut() {
        setCurrentUser(null);
    }

    return(
        <div>
            <h1>Welcome {currentUser?._doc?.username}</h1>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default Welcome;