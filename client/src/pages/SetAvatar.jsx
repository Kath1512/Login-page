import { useEffect, useState } from "react"
import '../assets/setAvatar.css'
import axios from "axios";
import { useNavigate } from "react-router";

export default function SetAvatar() {
    const [avatarLink, setAvatarLink] = useState("");
    const [displayPreview, setDisplayPreview] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("current-chat-user")){
            navigate('/register');
        }
        const thisUser = JSON.parse(localStorage.getItem("current-chat-user"));
        if(thisUser?.avatarLink){
            navigate('/');
        } else {
            setCurrentUser(thisUser);
        }
    }, []);
    async function handleSetAvatar(event) {
        event.preventDefault();
        //send avt to server
        try{
            const API_URL = "http://localhost:5000/api/auth/set-avt";
            const res = await axios.post(API_URL, {
                username: currentUser.username,
                avatarLink: avatarLink
            });
            const data = res.data;
            if(data.status){
                localStorage.setItem("current-chat-app", JSON.stringify({
                    ...currentUser,
                    avatarLink: avatarLink
                }))
                navigate('/');
                console.log(data.message);
            }
        } catch(err){
            console.error(err);
        }
    }
    function handleDisplayPreview(event){
        event.preventDefault();
        setDisplayPreview(!displayPreview);
    }
    return (
        <form onSubmit={handleSetAvatar} id="set-avt">
            <label htmlFor="set-avt"><h1>Enter your avatar image address:</h1></label>
            <input type="text" value={avatarLink} name="set-avt" onChange={(event) => setAvatarLink(event.target.value)}/>
            <div className="all-buttons">
                <button onClick={handleDisplayPreview}>{displayPreview ? "Close preview" : "Preview"}</button>
                <button type="Submit">Confirm</button>
            </div>
            {displayPreview && (
                <img src={avatarLink} alt="User's avatar preview" className="avt-preview"/>
            )}
        </form>
    )
}