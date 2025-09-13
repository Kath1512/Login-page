import axios from "axios";
import { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { io } from "socket.io-client";
import Loading from "../component/Loading";
import Contact from "../component/Contact";
import ContactHeader from "../component/chat_component/ContactHeader";
import DisplayMessages from "../component/chat_component/DisplayMessages";
import ChatInput from "../component/chat_component/ChatInput";
import Welcome from "../component/chat_component/Welcome";
import userContext from "../component/UserContext";
import { addMessageRoute, getAllUsersRoute, getMessageRoute } from "../utils/APIRoutes";

export default function Chat() {

    const [contacts, setContacts] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [sentMessage, setSentMessage] = useState(null);
    const navigate = useNavigate();

    const socket = useRef();

    //socket connection
    useEffect(() => {

        if (currentUser) {

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
            if (socket.current) {
                socket.current.disconnect();
            }
        }

    }, [currentUser]);

    //add arrival message to messages and display
    useEffect(() => {
        if (arrivalMessage && currentChat) {
            if (arrivalMessage.from != currentChat._id) {
                return;
            }
            setMessages(prevMessages => [...prevMessages, arrivalMessage]);
        }
    }, [arrivalMessage]);


    //fetch current user and all contacts from local storage

    function getSortedContacts(contacts) {
        return contacts.sort((a, b) => {
            const aTime = new Date(a?.lastMessage ? a.lastMessage.createdAt : 0);
            const bTime = new Date(b?.lastMessage ? b.lastMessage.createdAt : 0);
            return bTime.getTime() - aTime.getTime();
        });
    }

    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('current-chat-user'));
        if (!thisUser) {
            navigate('/login');
        }
        const getAllUsers = async () => {
            const res = await axios.get(`${getAllUsersRoute}?userId=${thisUser._id}`);
            setContacts(getSortedContacts(res.data));
            setCurrentUser(thisUser);
        }
        getAllUsers();
    }, []);

    //sort contact when received or sent message
    useEffect(() => {
        if (!contacts || !arrivalMessage) return;
        const newContacts = contacts.map((el => {
            if (el._id == arrivalMessage.from) {
                console.log(arrivalMessage);
                return {
                    ...el,
                    lastMessage: arrivalMessage
                };
            } else return el;
        }));
        setContacts(getSortedContacts(newContacts));

    }, [arrivalMessage]);

    useEffect(() => {
        if (!contacts || !sentMessage) return;
        const newContacts = contacts.map((el => {
            if (el._id == currentChat._id) {
                return {
                    ...el,
                    lastMessage: sentMessage
                };
            } else return el;
        }));
        setContacts(getSortedContacts(newContacts));

    }, [sentMessage]);



    //get all previous chat messages
    useEffect(() => {
        const getCurrentChatMessage = async () => {
            if (currentUser && currentChat) {
                const res = await axios.post(getMessageRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });
                const allMessages = res.data.allMessages;
                setMessages(allMessages);
                // console.log(allMessages);
            }
        }
        getCurrentChatMessage();
    }, [currentChat]);



    async function handleSendMessage(currentMessage) {

        sendCurrentMessageToServer(currentMessage);

        const newSentMessage = {
            from: currentUser._id,
            to: currentChat._id,
            message: currentMessage,
            createdAt: Date.now()
        }

        socket.current.emit("add-msg", newSentMessage);

        setSentMessage(newSentMessage);

        const newMessage = {
            fromSelf: true,
            message: currentMessage
        }

        console.log(newMessage);

        setMessages(prevMessages => [
            ...prevMessages, newMessage
        ]);

    }
    //send message to server to update DB
    const sendCurrentMessageToServer = async (message) => {
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
        <userContext.Provider value={currentUser}>
            <div className="container">
                {contacts ? <Contact allContacts={contacts} setCurrentChat={setCurrentChat} currentChat={currentChat} /> : <Loading />}

                {currentUser && (currentChat ? (
                    <div className='chat-container'>
                        <ContactHeader currentChat={currentChat} />
                        <DisplayMessages messages={messages} />
                        <ChatInput handleSendMessage={handleSendMessage} />
                    </div>
                ) : <Welcome />)}
            </div>
        </userContext.Provider>
    )
}