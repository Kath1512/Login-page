
export default function ContactHeader({currentChat}) {
    return (
        <div className="current-chat-header-container">
            <img src={currentChat.avatar.link} alt="user avatar"/>
            <div className="current-chat-details">
                <h2>{currentChat.username}</h2>
                <p>Offline</p>
            </div>
        </div>
    );
}   