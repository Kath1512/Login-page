import axios from "axios";
import { useRef, useEffect, useState, use } from "react"
import { useNavigate } from "react-router"
import "../assets/Chat.css"
import Logout from "../component/Logout";
import { io } from "socket.io-client";
import Loading from "../component/Loading";
import Contact from "../component/Contact";
import ContactHeader from "../component/chat_component/ContactHeader";
import DisplayMessages from "../component/chat_component/DisplayMessages";
import ChatInput from "../component/chat_component/ChatInput";

export default function Chat() {

    const [contacts, setContacts] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState('');
    const navigate = useNavigate();

    const socket = useRef();

    //socket connection
    useEffect(() => {

        if(currentUser){

            const hostURL = "http://localhost:5000";
            socket.current = io(hostURL);
            
            //add socket user to server

            socket.current.emit("add-user", {
                userId: currentUser._id
            });

            socket.current.on("new-msg", (arrivalMessage) => {
                //user are in another chat => not set messages
                // if(arrivalMessage.from != currentChat._id) return;
                setArrivalMessage(arrivalMessage);
            });

        }

        return () => {
            if(socket.current) {
                socket.current.disconnect();
            }
        }

    }, [currentUser]);

    //add arrival message to messages and display
    useEffect(() => {
        if(arrivalMessage && currentChat){
            if(arrivalMessage.from != currentChat._id){
                return;
            }
            delete arrivalMessage.from;
            setMessages(prevMessages => [...prevMessages, arrivalMessage]);
        }
    }, [arrivalMessage]);
    

    //fetch current user and all contacts from local storage

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('current-chat-user'));
        if (!storedData) {
            navigate('/login');
        }
        const thisUser = storedData.user;
        const getAllUsers = async () => {
            const res = await axios.get('http://localhost:5000/api/auth/allUsers');
            const newContacts = res.data.filter(user => {
                if (user._id != thisUser._id) return user;
            });
            setContacts(newContacts);
            setCurrentUser(thisUser);
        }
        getAllUsers();
    }, []);



    //get all previous chat messages
    useEffect(() => {
        const getCurrentChatMessage = async () => {
            if (currentUser && currentChat) {
                const getMessageRoute = "http://localhost:5000/api/message/getMessage";
                const res = await axios.post(getMessageRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });
                const allMessages = res.data.allMessages;
                setMessages(allMessages);
                console.log(allMessages);
            }
        }
        getCurrentChatMessage();
    }, [currentChat]);


    async function handleSendMessage(currentMessage) {
        
        sendCurrentMessageToServer(currentMessage);

        socket.current.emit("add-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: currentMessage
        });

        const newMessage = {
            fromSelf: true,
            message: currentMessage
        }

        setMessages(prevMessages => [
            ...prevMessages, newMessage
        ]);

    }
    //send message to server to update DB
    const sendCurrentMessageToServer = async (message) => {
        const addMessageRoute = "http://localhost:5000/api/message/addMessage";
        const res = await axios.post(addMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: message
        });
        const data = res.data;
        console.log(data);
    }
    //render
    return (
        <>
            <Logout />
            <div className="container">
                {contacts ? <Contact contacts={contacts} setCurrentChat={setCurrentChat} currentChat={currentChat}/> : <Loading />}

                {currentUser && (currentChat ? (
                    <div className='chat-container'>
                        <ContactHeader currentChat={currentChat}/>
                        <DisplayMessages messages={messages}/>
                        <ChatInput handleSendMessage={handleSendMessage}/>
                    </div>
                ) : (
                    <h1>Welcome {currentUser.username}!</h1>
                ))}
            </div>
        </>
    )
}