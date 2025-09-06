
export default function ContactHeader({currentChat}) {
    return (
        <div className="contact-detail">
            <h2>{currentChat.username}</h2>
        </div>
    );
}