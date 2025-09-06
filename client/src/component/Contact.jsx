

export default function Contact({ contacts, setCurrentChat, currentChat }) {
    return (
        <div className="contacts-container">
            {contacts.map(contact => {
                let thisClass = "contacts";
                if (currentChat && contact._id === currentChat._id) thisClass += " selected";
                return (
                    <div className={thisClass} onClick={() => setCurrentChat(contact)}
                        key={contact._id}>
                        <h3>{contact.username}</h3>
                    </div>
                );
            })}
        </div>
    )
}