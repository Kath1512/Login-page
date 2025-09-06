import { useState } from "react";


export default function ChatInput({handleSendMessage}) {

    const [currentMessage, setCurrentMessage] = useState('');

    function handleInputMessage(event) {
        setCurrentMessage(event.target.value);
    }

    function isValidatedMessage(message) {
        if(!message.trim()) return false;
        return true;
    }

    function handleSubmit(event) { 
        event.preventDefault();
        if(!isValidatedMessage(currentMessage)){
            return;
        }
        handleSendMessage(currentMessage);
        setCurrentMessage('');
    }

    return (
        <div className="chat-input">
            <form onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="chatInput" value={currentMessage} onChange={handleInputMessage}
                    id="chatInput" placeholder="Start typing" />
            </form>
        </div>
    )
}