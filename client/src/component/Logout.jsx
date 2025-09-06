import { useNavigate } from "react-router";

export default function Logout(){
    const navigate = useNavigate();


    function handleLogOut() {
        localStorage.clear('current-chat-user');
        navigate('/login');
    }


    return(
        <div className="btn-logout">
            <button onClick={handleLogOut}>
                Logout
            </button>
        </div>
    )
}