import { useContext } from "react";
import userContext from "../UserContext";
import Logout from "../Logout";
import { useNavigate } from "react-router";

export default function MyProfile() {
    const currentUser = useContext(userContext);
    const navigate = useNavigate();
    console.log(currentUser);
    return (
        <>
            {currentUser && (<div className="my-profile">
                <div className="main">
                    <img src={currentUser.avatar.link} alt="User avatar" />
                    <div className="current-user-details">
                        <div><h3>{currentUser.username}</h3></div>
                    </div>
                </div>
                <button onClick={() => navigate("/set-avt")}>Set avatar</button>
                <Logout />
            </div>)}
        </>
    );
}