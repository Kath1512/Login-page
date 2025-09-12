import { useEffect, useState } from "react";
import FindChat from "./FindChat";
import MyProfile from "./chat_component/MyProfile";


export default function Contact({ allContacts, setCurrentChat, currentChat }) {

    const [contacts, setContacts] = useState(allContacts);

    useEffect(() => {
        setContacts(allContacts);
    }, [allContacts])

    console.log(contacts);

    return (
        <div className="left-bar-container">
            <MyProfile/>
            <div className="chat-list">
                <FindChat setContacts={setContacts} contacts={allContacts} />
                {contacts.map(contact => {
                    // console.log(contact);
                    let thisClass = "chat-item";
                    if (currentChat && contact._id === currentChat._id) thisClass += " selected";
                    const currentTime = new Date(new Date(contact?.lastMessage?.createdAt).getTime() + 7 * 3600 * 1000);
                    return (
                        <div className={thisClass} onClick={() => setCurrentChat(contact)} key={contact._id}>
                            <img src={contact.avatar.link} alt="User avatar" className="user-avt" />
                            <div className="chat-info">
                                <h3>{contact.username}</h3>
                                <div className="content-preview">{contact?.lastMessage?.message}</div>
                            </div>
                            <div className="chat-meta-data">
                                {contact.lastMessage && (<div className="last-message-time">
                                    <div>{currentTime.toISOString().split('T')[0]}</div>
                                    <div>{`${currentTime.getUTCHours()}:${currentTime.getUTCMinutes()}`}</div>
                                </div>)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}