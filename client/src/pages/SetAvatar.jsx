import { useEffect, useState } from "react"
import '../assets/setAvatar.css'
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { SetAvatarRoute } from "../utils/APIRoutes";

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
            const res = await axios.post(SetAvatarRoute, {
                username: currentUser.username,
                avatarLink: avatarLink
            });
            const data = res.data;
            if(data.status){
                localStorage.setItem("current-chat-user", JSON.stringify({
                    ...currentUser,
                    avatar: {
                        link: avatarLink
                    }
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
    function handleSetDefaultAvatar(event){
        event.preventDefault();
        setAvatarLink("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");
    }
    function handleCancelSetAvatar(event){
        event.preventDefault();
        navigate("/");
    }
    return (
        <form onSubmit={handleSetAvatar} id="set-avt">
            <label htmlFor="set-avt"><h1>Enter your avatar image address:</h1></label>
            <input type="text" value={avatarLink} name="set-avt" onChange={(event) => setAvatarLink(event.target.value)}/>
            <div className="all-buttons">
                <button onClick={handleSetDefaultAvatar}>Set as default</button>
                <button onClick={handleDisplayPreview}>{displayPreview ? "Close preview" : "Preview"}</button>
                <button type="Submit">Confirm</button>
                <button onClick={handleCancelSetAvatar}>Cancel</button>
            </div>
            {displayPreview && (
                <img src={avatarLink} alt="User's avatar preview" className="avt-preview"/>
            )}
        </form>
    )
}