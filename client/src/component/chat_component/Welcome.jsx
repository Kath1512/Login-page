import { useContext } from "react"
import userContext from "../UserContext"
import greetGif from "../../assets/greet.gif"

export default function Welcome() {
    const currentUser = useContext(userContext);
    return (
        <div className="user-greet">
            <h1>Welcome {currentUser.username}</h1>
            <img src={greetGif} alt="greet user" />
        </div>
    )
}