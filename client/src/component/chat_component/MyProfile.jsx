import { useContext } from "react";
import userContext from "../UserContext";
import Logout from "../Logout";

export default function MyProfile() {
    const currentUser = useContext(userContext);
    console.log(currentUser);
    return (
        <>
            {currentUser && (<div className="my-profile">
                <img src={currentUser.avatar.link} alt="User avatar" />
                <div className="current-user-details">
                    <div><h2>{currentUser.username}</h2></div>
                </div>
                <Logout />
            </div>)}
        </>
    );
}